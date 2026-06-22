const socket = io();

const map = L.map("map")
.setView([21.1702,72.8311],13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

let marker;

socket.on("busLocation",(data)=>{

    if(marker){

        marker.setLatLng([
            data.latitude,
            data.longitude
        ]);

    }else{

        marker = L.marker([
            data.latitude,
            data.longitude
        ]).addTo(map);

    }

});