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

<<<<<<< HEAD
function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function apiGet(path) {
    const response = await fetch(`/api${path}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
}

async function apiPost(path, body) {
    const response = await fetch(`/api${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
=======
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
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
}

const socket = io();

const map = L.map("map")
.setView([21.1702, 72.8311], 13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

const markers = {};
const liveBuses = {};
<<<<<<< HEAD
const openEta = {};
=======
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676

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
<<<<<<< HEAD
            <strong>${escapeHtml(busId)}</strong>
            <button class="eta-btn" onclick="toggleEta('${busId}')">⏱ ETA</button>
        </div>
        <div class="eta-result" id="eta-${cssSafe(busId)}" style="display:none"></div>
    `).join("");

    // Re-open any ETA panels that were showing before this re-render
    Object.keys(openEta).forEach((busId) => {
        if (openEta[busId]) showEta(busId, openEta[busId]);
    });
}

function cssSafe(id) {
    return String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
}

async function toggleEta(busId) {
    const el = document.getElementById(`eta-${cssSafe(busId)}`);
    if (!el) return;

    if (el.style.display !== "none" && el.dataset.loaded === "1") {
        el.style.display = "none";
        delete openEta[busId];
        return;
    }

    el.style.display = "block";
    el.textContent = "Calculating ETA…";

    try {
        const eta = await apiGet(`/ai/eta/${encodeURIComponent(busId)}`);
        showEta(busId, eta);
    } catch (error) {
        el.textContent = "Couldn't calculate ETA right now.";
        console.error(error);
    }
}

function showEta(busId, eta) {
    const el = document.getElementById(`eta-${cssSafe(busId)}`);
    if (!el) return;

    el.style.display = "block";
    el.dataset.loaded = "1";
    openEta[busId] = eta;

    if (eta.etaMinutes !== undefined) {
        el.innerHTML = `🤖 <strong>~${eta.etaMinutes} min</strong> to next stop (${escapeHtml(eta.nextStop)}) · ${eta.distanceKm} km away`;
    } else {
        el.textContent = "🤖 " + (eta.message || "ETA not available for this bus yet.");
    }
=======
            <span>${busId}</span>
        </div>
    `).join("");
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
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
<<<<<<< HEAD
            .bindPopup(escapeHtml(busId));
=======
            .bindPopup(busId);
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
    }
});

function focusBus(busId) {
    const bus = liveBuses[busId];

    if (!bus) {
<<<<<<< HEAD
        showTopBar("This bus isn't sharing its location right now.");
=======
        alert("This bus isn't sharing its location right now.");
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
        return;
    }

    map.setView([bus.latitude, bus.longitude], 16);
    markers[busId].openPopup();
}

<<<<<<< HEAD
function showTopBar(text) {
    document.getElementById("topBarText").innerText = text;
}

=======
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
async function loadRoutes() {
    const container = document.getElementById("routeList");

    try {
        const routes = await apiGet("/passenger/routes");

        if (routes.length === 0) {
            container.innerHTML = `<p class="empty-hint">No routes have been added yet.</p>`;
            return;
        }

        container.innerHTML = routes.map((route) => `
<<<<<<< HEAD
            <div class="route-item" data-route-id="${route._id}" onclick="selectRoute('${route._id}', '${escapeHtml(route.routeNumber)}')">
                <strong>${escapeHtml(route.routeNumber)}</strong><br>
                ${escapeHtml(route.startPoint)} → ${escapeHtml(route.endPoint)}
=======
            <div class="route-item" data-route-id="${route._id}" onclick="selectRoute('${route._id}', '${route.routeNumber}')">
                <strong>${route.routeNumber}</strong><br>
                ${route.startPoint} → ${route.endPoint}
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
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

<<<<<<< HEAD
    showTopBar(`Route ${routeNumber} - looking for active buses...`);
=======
    document.getElementById("topBarText").innerText = `Route ${routeNumber} - looking for active buses...`;
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676

    try {
        const buses = await apiGet(`/passenger/routes/${routeId}/buses`);

        if (buses.length === 0) {
<<<<<<< HEAD
            showTopBar(`Route ${routeNumber} - no active buses right now`);
            return;
        }

        showTopBar(`Route ${routeNumber} - ${buses.length} bus(es) assigned`);
=======
            document.getElementById("topBarText").innerText = `Route ${routeNumber} - no active buses right now`;
            return;
        }

        document.getElementById("topBarText").innerText = `Route ${routeNumber} - ${buses.length} bus(es) assigned`;
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676

        const firstWithLiveLocation = buses
            .map((bus) => bus.busNumber)
            .find((busNumber) => liveBuses[busNumber]);

        if (firstWithLiveLocation) {
            focusBus(firstWithLiveLocation);
        }
    } catch (error) {
<<<<<<< HEAD
        showTopBar(`Couldn't load buses for route ${routeNumber}`);
=======
        document.getElementById("topBarText").innerText = `Couldn't load buses for route ${routeNumber}`;
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
        console.error(error);
    }
}

<<<<<<< HEAD
/* ── AI ROUTE ASSISTANT ── */
async function findBestRoute() {
    const from = document.getElementById("aiFrom").value.trim();
    const to = document.getElementById("aiTo").value.trim();
    const resultBox = document.getElementById("aiResult");
    const btn = document.getElementById("aiFindBtn");

    if (!from || !to) {
        resultBox.innerHTML = `<div class="ai-result">Please enter both a starting point and a destination.</div>`;
        return;
    }

    btn.disabled = true;
    btn.textContent = "Thinking…";
    resultBox.innerHTML = `<div class="ai-result">🤖 Searching available routes…</div>`;

    try {
        const result = await apiPost("/ai/suggest-route", { startPoint: from, endPoint: to });

        if (!result.bestRoute) {
            resultBox.innerHTML = `<div class="ai-result">${escapeHtml(result.message || "No direct route found between these points.")}</div>`;
            return;
        }

        const best = result.bestRoute;
        const altCount = (result.alternatives || []).length;

        resultBox.innerHTML = `
            <div class="ai-result">
                <div class="best">🎯 Route ${escapeHtml(best.routeNumber)}</div>
                ${escapeHtml(best.startPoint)} → ${escapeHtml(best.endPoint)}<br>
                <span style="color:#6b7280">${best.stops.length} stop(s) · fewest stops on this path</span>
                ${altCount > 0 ? `<br><span style="color:#6b7280">+${altCount} alternative route(s) also available</span>` : ""}
            </div>`;

        // Jump straight to this route on the map too
        selectRoute(best._id, best.routeNumber);
    } catch (error) {
        resultBox.innerHTML = `<div class="ai-result">Couldn't reach the route assistant. Please try again.</div>`;
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.textContent = "✨ Find Best Route";
    }
}

=======
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
document.addEventListener("DOMContentLoaded", loadRoutes);
