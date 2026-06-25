const socket = io();

const map = L.map("map")
.setView([21.1702,72.8311],13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

const markers = {};

socket.on("busLocation", (data) => {

    const {
        busId,
        latitude,
        longitude
    } = data;

    if(markers[busId]) {

        markers[busId].setLatLng([
            latitude,
            longitude
        ]);

    } else {

        markers[busId] = L.marker([
            latitude,
            longitude
        ])
        .addTo(map)
        .bindPopup(busId);

    }

});

const busList =
document.getElementById("busList");

function updateBusList() {

    busList.innerHTML = "";

    Object.keys(markers)
    .forEach((busId) => {

        busList.innerHTML +=
        `<p>${busId}</p>`;

    });

}