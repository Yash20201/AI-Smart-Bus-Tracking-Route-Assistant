// Auth guard: only logged-in users can view the live tracking map
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.href = "/login.html";
}

async function apiGet(path) {
    const response = await fetch(`/api${path}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Request failed: " + path);
    }

    return response.json();
}

const socket = io();

const map = L.map("map")
.setView([21.1702, 72.8311], 13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

const markers = {};
const liveBuses = {};

function renderLiveBusList() {
    const container = document.getElementById("liveBusList");
    const ids = Object.keys(liveBuses);

    if (ids.length === 0) {
        container.innerHTML = `<p class="empty-hint">No buses are currently sharing their location. Ask your driver to start tracking from their panel.</p>`;
        return;
    }

    container.innerHTML = ids.map((busId) => `
        <div class="live-bus-item">
            <span class="live-dot"></span>
            <span>${busId}</span>
        </div>
    `).join("");
}

socket.on("busLocation", (data) => {
    const { busId, latitude, longitude } = data;

    liveBuses[busId] = data;
    renderLiveBusList();

    if (markers[busId]) {
        markers[busId].setLatLng([latitude, longitude]);
    } else {
        markers[busId] = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(busId);
    }
});

function focusBus(busId) {
    const bus = liveBuses[busId];

    if (!bus) {
        alert("This bus isn't sharing its location right now.");
        return;
    }

    map.setView([bus.latitude, bus.longitude], 16);
    markers[busId].openPopup();
}

async function loadRoutes() {
    const container = document.getElementById("routeList");

    try {
        const routes = await apiGet("/passenger/routes");

        if (routes.length === 0) {
            container.innerHTML = `<p class="empty-hint">No routes have been added yet.</p>`;
            return;
        }

        container.innerHTML = routes.map((route) => `
            <div class="route-item" data-route-id="${route._id}" onclick="selectRoute('${route._id}', '${route.routeNumber}')">
                <strong>${route.routeNumber}</strong><br>
                ${route.startPoint} → ${route.endPoint}
            </div>
        `).join("");
    } catch (error) {
        container.innerHTML = `<p class="empty-hint">Couldn't load routes. Try refreshing.</p>`;
        console.error(error);
    }
}

async function selectRoute(routeId, routeNumber) {
    document.querySelectorAll(".route-item").forEach((el) => el.classList.remove("active"));

    const clicked = document.querySelector(`.route-item[data-route-id="${routeId}"]`);
    if (clicked) clicked.classList.add("active");

    document.getElementById("topBarText").innerText = `Route ${routeNumber} - looking for active buses...`;

    try {
        const buses = await apiGet(`/passenger/routes/${routeId}/buses`);

        if (buses.length === 0) {
            document.getElementById("topBarText").innerText = `Route ${routeNumber} - no active buses right now`;
            return;
        }

        document.getElementById("topBarText").innerText = `Route ${routeNumber} - ${buses.length} bus(es) assigned`;

        const firstWithLiveLocation = buses
            .map((bus) => bus.busNumber)
            .find((busNumber) => liveBuses[busNumber]);

        if (firstWithLiveLocation) {
            focusBus(firstWithLiveLocation);
        }
    } catch (error) {
        document.getElementById("topBarText").innerText = `Couldn't load buses for route ${routeNumber}`;
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", loadRoutes);
