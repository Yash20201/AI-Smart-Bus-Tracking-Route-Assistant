// Auth guard: only logged-in users can access the driver panel
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
    startBtn.innerHTML = `<span class="spinner"></span> Starting…`;

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

            startBtn.innerHTML = "✅ Tracking Active";
        },
        (error) => {
            console.log(error);
            status.innerText = "Unable to get location: " + error.message;
            showNotification("Couldn't get your location. Please allow location access.", "error");
            startBtn.disabled = false;
            startBtn.innerHTML = "📡 Start Tracking";
        },
        { enableHighAccuracy: true }
    );
});
