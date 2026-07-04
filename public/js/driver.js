
if (!localStorage.getItem("token")) {
    window.location.href = "/login.html";
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.href = "/login.html";
}

const socket = io();

const startBtn =
document.getElementById("startBtn");

const status =
document.getElementById("status");

startBtn.addEventListener("click", () => {

    const busId = document.getElementById("busId").value.trim();

    if (!busId) {
        alert("Please enter a bus number first");
        return;
    }

    navigator.geolocation.watchPosition(

        (position) => {

            const data = {

                busId,

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

            status.classList.add("active");

            console.log(data);

        },

        (error) => {
            console.log(error);
            status.innerText = "Unable to get location: " + error.message;
        },

        {
            enableHighAccuracy: true
        }
    );

});
