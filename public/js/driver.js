<<<<<<< HEAD
// Auth guard: only logged-in users can access the driver panel
=======
<<<<<<< HEAD
// Auth guard: only logged-in users can access the driver panel
=======

>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
const startBtn = document.getElementById("startBtn");
const status = document.getElementById("status");

startBtn.addEventListener("click", () => {
    const busId = document.getElementById("busId").value.trim();

    if (!busId) {
        showNotification("Please enter a bus number first", "error");
        return;
    }

    if (!navigator.geolocation) {
        showNotification("Location isn't supported on this device", "error");
        return;
    }

    startBtn.disabled = true;
    startBtn.textContent = "Starting…";

    navigator.geolocation.watchPosition(
        (position) => {
            const data = {
                busId,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            socket.emit("locationUpdate", data);

            status.innerText = `Sharing live location for Bus ${busId}`;
            status.classList.add("active");

            startBtn.textContent = "Tracking Active";
        },
        (error) => {
            console.log(error);
            status.innerText = "Unable to get location: " + error.message;
            showNotification("Couldn't get your location. Please allow location access.", "error");
            startBtn.disabled = false;
            startBtn.textContent = "Start Tracking";
        },
        { enableHighAccuracy: true }
    );
<<<<<<< HEAD
=======
=======
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

>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
});
