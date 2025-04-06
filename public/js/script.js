const socket = io();

// console.log("hey");
if(navigator.geolocation){
    // console.log("geolocation is supported");
    navigator.geolocation.watchPosition((position)=>{
        const{latitude, longitude} = position.coords;
        socket.emit("send-location",{latitude,longitude});
    },(error)=>{
        console.log(error);
    },
{
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout:5000,
})
}
//leaflet current location
const map = L.map("map").setView([0,0], 16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Meetme"
}).addTo(map);

//markeks object
const markers={};

socket.on("receive-location",(data)=>{
    const{id,latitude,longitude} = data;
    // console.log(data);
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
        map.setView([latitude, longitude]);
    }
})

socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id]; //delete the marker object
    }
})