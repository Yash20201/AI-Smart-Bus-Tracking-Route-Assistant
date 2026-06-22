const socket = io();

const startBtn =
document.getElementById("startBtn");

const status =
document.getElementById("status");

startBtn.addEventListener("click", () => {

    navigator.geolocation.watchPosition(

        (position) => {

            const data = {

                busId: "BUS101",

                latitude:
                position.coords.latitude,

                longitude:
                position.coords.longitude

            };

            socket.emit(
                "locationUpdate",
                data
            );

            status.innerText =
            "Location Sharing Started";

            console.log(data);

        },

        (error) => {
            console.log(error);
        },

        {
            enableHighAccuracy: true
        }
    );

});