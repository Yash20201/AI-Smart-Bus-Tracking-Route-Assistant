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

function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
function cssSafe(id) {
    return String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
}

<<<<<<< HEAD
=======
=======
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
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
}

const socket = io();

const map = L.map("map")
.setView([21.1702, 72.8311], 13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

const markers = {};
const liveBuses = {};
const openEta = {};

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
/* ── CUSTOM MARKER ICONS ── */
function busIcon(busId, isTracked) {
    return L.divIcon({
        className: "bus-marker-wrap",
        html: `<div class="bus-pin${isTracked ? " is-tracked" : ""}"><span class="bus-pin-emoji">🚌</span>${escapeHtml(busId)}</div>`,
        iconSize: [70, 30],
        iconAnchor: [20, 28]
    });
}

const pickupIcon = L.divIcon({
    className: "pickup-marker-wrap",
    html: `<div class="pickup-pin">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

function refreshBusIcon(busId) {
    if (markers[busId]) {
        markers[busId].setIcon(busIcon(busId, busId === trackedBusId));
    }
}

/* ── LIVE BUS LIST ── */
function renderLiveBusList() {
    const container = document.getElementById("liveBusList");
    const ids = Object.keys(liveBuses);
    const countEl = document.getElementById("liveCount");

    if (countEl) countEl.textContent = ids.length > 0 ? ids.length : "";

    if (ids.length === 0) {
        container.innerHTML = `<p class="empty-hint">No buses are currently sharing their location. Ask your driver to start tracking from their panel, or tap <strong>Try Demo</strong> above.</p>`;
<<<<<<< HEAD
=======
=======
function renderLiveBusList() {
    const container = document.getElementById("liveBusList");
    const ids = Object.keys(liveBuses);

    if (ids.length === 0) {
        container.innerHTML = `<p class="empty-hint">No buses are currently sharing their location. Ask your driver to start tracking from their panel.</p>`;
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        return;
    }

    container.innerHTML = ids.map((busId) => `
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        <div class="live-bus-item${busId === trackedBusId ? " tracked" : ""}">
            <span class="live-dot"></span>
            <strong>${escapeHtml(busId)}</strong>
            <div class="live-bus-actions">
                <button class="eta-btn" data-action="eta" data-bus="${escapeHtml(busId)}">⏱ ETA</button>
                <button class="track-btn${busId === trackedBusId ? " active" : ""}" data-action="track" data-bus="${escapeHtml(busId)}">
                    ${busId === trackedBusId ? "🎯 Tracking" : "🎯 Track"}
                </button>
            </div>
<<<<<<< HEAD
=======
=======
        <div class="live-bus-item">
            <span class="live-dot"></span>
            <strong>${escapeHtml(busId)}</strong>
            <button class="eta-btn" onclick="toggleEta('${busId}')">⏱ ETA</button>
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        </div>
        <div class="eta-result" id="eta-${cssSafe(busId)}" style="display:none"></div>
    `).join("");

    // Re-open any ETA panels that were showing before this re-render
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
    Object.keys(openEta).forEach((id) => {
        if (openEta[id]) showEta(id, openEta[id]);
    });
}

// Delegated click handling for the ETA / Track buttons rendered above.
// Using data-attributes (rather than building onclick="..." strings from
// busId, which drivers type freely) means a bus number containing a quote
// or special character can never break the page.
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const busId = btn.dataset.bus;
    if (btn.dataset.action === "eta") toggleEta(busId);
    if (btn.dataset.action === "track") trackBus(busId);
});

/* ── ETA (time to next route stop) ── */
<<<<<<< HEAD
=======
=======
    Object.keys(openEta).forEach((busId) => {
        if (openEta[busId]) showEta(busId, openEta[busId]);
    });
}

function cssSafe(id) {
    return String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
}

>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
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
}

<<<<<<< HEAD
/* ── LIVE TRACKING: distance + route line from a bus to your pickup point ──
   This is separate from ETA above: ETA estimates time to the route's
   next stop; Track shows the live distance/route between a moving bus
   and where YOU are standing, updating as the bus moves. The line
   follows real roads (via a free routing service) when reachable, and
   falls back to a straight "as the crow flies" dashed line otherwise —
   so this never fully breaks even on a restricted network. */
let trackedBusId = null;
let myLocation = null;
let myMarker = null;
let trackLine = null;       // straight-line fallback (always kept ready)
let roadRouteLine = null;   // real road-following line, once fetched

let lastRoadFetchLatLng = null;
let lastRoadFetchTime = 0;
const ROAD_FETCH_MIN_INTERVAL_MS = 8000;
const ROAD_FETCH_MIN_DISTANCE_KM = 0.1;
=======
<<<<<<< HEAD
/* ── LIVE TRACKING: distance + line from a bus to your pickup point ──
   This is separate from ETA above: ETA estimates time to the route's
   next stop; Track shows the live straight-line distance between a
   moving bus and where YOU are standing, updating as the bus moves. */
let trackedBusId = null;
let myLocation = null;
let myMarker = null;
let trackLine = null;
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3

function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function requestMyLocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            showNotification("Location isn't supported on this device", "error");
            resolve(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                myLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };

                if (myMarker) {
                    myMarker.setLatLng([myLocation.lat, myLocation.lng]);
                } else {
                    myMarker = L.marker([myLocation.lat, myLocation.lng], { icon: pickupIcon })
                        .addTo(map)
                        .bindPopup("📍 Your pickup point");
                }
                resolve(true);
            },
            () => {
                showNotification("Couldn't get your location. Please allow location access and try again.", "error");
                resolve(false);
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    });
}

async function trackBus(busId) {
    if (!liveBuses[busId]) {
        showNotification("This bus isn't sharing its location right now", "error");
        return;
    }

    if (!myLocation) {
        const got = await requestMyLocation();
        if (!got) return;
    }

    const previous = trackedBusId;
    trackedBusId = busId;

<<<<<<< HEAD
    // Starting fresh (possibly with a different bus) - clear any old road route
    if (roadRouteLine) { map.removeLayer(roadRouteLine); roadRouteLine = null; }
    lastRoadFetchLatLng = null;
    lastRoadFetchTime = 0;

=======
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
    if (previous) refreshBusIcon(previous);
    refreshBusIcon(busId);

    document.getElementById("trackingCard").style.display = "block";
    document.getElementById("trackingBusLabel").textContent = `🚌 Bus ${busId}`;

    updateTrackingLine();
    renderLiveBusList();
    showNotification(`Now tracking Bus ${busId}`, "success");
}

function stopTracking() {
    const previous = trackedBusId;
    trackedBusId = null;

    if (trackLine) { map.removeLayer(trackLine); trackLine = null; }
<<<<<<< HEAD
    if (roadRouteLine) { map.removeLayer(roadRouteLine); roadRouteLine = null; }
    lastRoadFetchLatLng = null;
    lastRoadFetchTime = 0;

=======
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
    document.getElementById("trackingCard").style.display = "none";

    if (previous) refreshBusIcon(previous);
    renderLiveBusList();
}

function updateTrackingLine(overrideBusLatLng) {
    if (!trackedBusId || !myLocation) return;

    const bus = liveBuses[trackedBusId];
    if (!bus && !overrideBusLatLng) return;

    const busLatLng = overrideBusLatLng || [bus.latitude, bus.longitude];
    const myLatLng = [myLocation.lat, myLocation.lng];

<<<<<<< HEAD
    // Instant straight-line fallback — always kept up to date so there's
    // never a moment with no line at all, even before the road route
    // (or if it fails) loads. Hidden once a real road route is showing.
=======
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
    if (trackLine) {
        trackLine.setLatLngs([busLatLng, myLatLng]);
    } else {
        trackLine = L.polyline([busLatLng, myLatLng], {
            color: "#4f46e5",
            weight: 3,
            dashArray: "8,7",
<<<<<<< HEAD
            opacity: roadRouteLine ? 0 : 0.85
        }).addTo(map);
    }

    if (!roadRouteLine) {
        const distanceKm = haversineKm(busLatLng[0], busLatLng[1], myLatLng[0], myLatLng[1]);
        document.getElementById("trackingDistance").innerHTML =
            `<strong>${distanceKm.toFixed(2)} km</strong> straight-line to your pickup point`;
    }

    maybeFetchRoadRoute(busLatLng, myLatLng);
}

function shouldFetchRoadRoute(busLatLng) {
    const now = Date.now();
    if (!lastRoadFetchLatLng) return true;
    if (now - lastRoadFetchTime < ROAD_FETCH_MIN_INTERVAL_MS) return false;
    return haversineKm(busLatLng[0], busLatLng[1], lastRoadFetchLatLng[0], lastRoadFetchLatLng[1]) >= ROAD_FETCH_MIN_DISTANCE_KM;
}

// Fetches an actual road-following path from a free public routing service
// (no API key needed). Throttled by time + distance so it doesn't fire on
// every animation frame. If the service can't be reached — blocked network,
// offline, timeout — this silently leaves the straight dashed line in place
// rather than breaking anything.
async function maybeFetchRoadRoute(busLatLng, myLatLng) {
    if (!shouldFetchRoadRoute(busLatLng)) return;

    lastRoadFetchLatLng = busLatLng;
    lastRoadFetchTime = Date.now();
    const requestedFor = trackedBusId;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${busLatLng[1]},${busLatLng[0]};${myLatLng[1]},${myLatLng[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) return;

        const data = await res.json();
        if (data.code !== "Ok" || !data.routes || !data.routes[0]) return;

        // If tracking was stopped or switched to another bus while this was
        // in flight, discard the now-stale result.
        if (trackedBusId !== requestedFor) return;

        const path = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        const distanceKm = data.routes[0].distance / 1000;
        const durationMin = Math.max(1, Math.round(data.routes[0].duration / 60));

        if (roadRouteLine) {
            roadRouteLine.setLatLngs(path);
        } else {
            roadRouteLine = L.polyline(path, { color: "#4f46e5", weight: 4, opacity: 0.9 }).addTo(map);
        }

        if (trackLine) trackLine.setStyle({ opacity: 0 });

        document.getElementById("trackingDistance").innerHTML =
            `<strong>${distanceKm.toFixed(1)} km</strong> by road · ~${durationMin} min drive`;
    } catch (error) {
        clearTimeout(timeoutId);
        console.log("Road route unavailable, using straight-line fallback:", error.message);
    }
=======
            opacity: 0.85
        }).addTo(map);
    }

    const distanceKm = haversineKm(busLatLng[0], busLatLng[1], myLatLng[0], myLatLng[1]);
    document.getElementById("trackingDistance").innerHTML =
        `<strong>${distanceKm.toFixed(2)} km</strong> from your pickup point`;
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
}

/* ── SMOOTH MARKER MOVEMENT ──
   Instead of jumping the bus marker instantly to each new GPS point,
   glide it there over ~900ms so movement is visible on the map — and
   keep the tracking line glued to it throughout the animation. */
function animateMarkerTo(busId, marker, toLatLng, duration = 900) {
    const from = marker.getLatLng();
    const start = performance.now();

    function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const lat = from.lat + (toLatLng[0] - from.lat) * t;
        const lng = from.lng + (toLatLng[1] - from.lng) * t;

        marker.setLatLng([lat, lng]);

        if (busId === trackedBusId) {
            updateTrackingLine([lat, lng]);
        }

        if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

<<<<<<< HEAD
=======
=======
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
socket.on("busLocation", (data) => {
    const { busId, latitude, longitude } = data;

    liveBuses[busId] = data;
    renderLiveBusList();

    if (markers[busId]) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        animateMarkerTo(busId, markers[busId], [latitude, longitude]);
    } else {
        markers[busId] = L.marker([latitude, longitude], { icon: busIcon(busId, busId === trackedBusId) })
            .addTo(map)
            .bindPopup(`🚌 Bus ${escapeHtml(busId)}`);
        markers[busId].on("click", () => trackBus(busId));

        if (busId === trackedBusId) updateTrackingLine();
<<<<<<< HEAD
=======
=======
        markers[busId].setLatLng([latitude, longitude]);
    } else {
        markers[busId] = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(escapeHtml(busId));
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
    }
});

function focusBus(busId) {
    const bus = liveBuses[busId];

    if (!bus) {
        showTopBar("This bus isn't sharing its location right now.");
        return;
    }

    map.setView([bus.latitude, bus.longitude], 16);
    markers[busId].openPopup();
}

function showTopBar(text) {
    document.getElementById("topBarText").innerText = text;
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
/* ── DEMO BUS ──
   Lets a passenger see the live-tracking feature (marker, moving bus,
   line + distance to their pickup point) immediately, without needing a
   second browser tab logged in as a driver actively sharing GPS. It feeds
   fake positions through the exact same liveBuses/markers/animateMarkerTo
   pipeline a real bus uses, so "Track" behaves identically either way. */
const DEMO_BUS_ID = "DEMO-01";
const demoPath = [
    [21.1959, 72.7933],
    [21.1900, 72.8010],
    [21.1850, 72.8090],
    [21.1795, 72.8160],
    [21.1750, 72.8230],
    [21.1702, 72.8311],
    [21.1750, 72.8230],
    [21.1795, 72.8160],
    [21.1850, 72.8090],
    [21.1900, 72.8010]
];
let demoTimer = null;
let demoStep = 0;

function toggleDemoBus() {
    if (demoTimer) {
        stopDemoBus();
    } else {
        startDemoBus();
    }
}

function startDemoBus() {
    demoStep = 0;
    const [lat, lng] = demoPath[0];

    liveBuses[DEMO_BUS_ID] = { busId: DEMO_BUS_ID, latitude: lat, longitude: lng };
    renderLiveBusList();

    markers[DEMO_BUS_ID] = L.marker([lat, lng], { icon: busIcon(DEMO_BUS_ID, DEMO_BUS_ID === trackedBusId) })
        .addTo(map)
        .bindPopup(`🚌 Bus ${DEMO_BUS_ID} (demo)`);
    markers[DEMO_BUS_ID].on("click", () => trackBus(DEMO_BUS_ID));

    map.setView([lat, lng], 14);

    demoTimer = setInterval(() => {
        demoStep = (demoStep + 1) % demoPath.length;
        const [nLat, nLng] = demoPath[demoStep];

        liveBuses[DEMO_BUS_ID] = { busId: DEMO_BUS_ID, latitude: nLat, longitude: nLng };
        renderLiveBusList();
        animateMarkerTo(DEMO_BUS_ID, markers[DEMO_BUS_ID], [nLat, nLng], 1300);
    }, 1800);

    const btn = document.getElementById("demoBtn");
    btn.textContent = "⏹ Stop Demo";
    btn.classList.add("running");

    showNotification("Demo bus is live — tap Track to see it in action", "success");
}

function stopDemoBus() {
    clearInterval(demoTimer);
    demoTimer = null;

    if (markers[DEMO_BUS_ID]) { map.removeLayer(markers[DEMO_BUS_ID]); delete markers[DEMO_BUS_ID]; }
    delete liveBuses[DEMO_BUS_ID];

    if (trackedBusId === DEMO_BUS_ID) stopTracking();
    renderLiveBusList();

    const btn = document.getElementById("demoBtn");
    btn.textContent = "▶ Try Demo";
    btn.classList.remove("running");
}

/* ── ROUTES ── */
<<<<<<< HEAD
=======
=======
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
async function loadRoutes() {
    const container = document.getElementById("routeList");

    try {
        const routes = await apiGet("/passenger/routes");

        if (routes.length === 0) {
            container.innerHTML = `<p class="empty-hint">No routes have been added yet.</p>`;
            return;
        }

        container.innerHTML = routes.map((route) => `
            <div class="route-item" data-route-id="${route._id}" onclick="selectRoute('${route._id}', '${escapeHtml(route.routeNumber)}')">
                <strong>${escapeHtml(route.routeNumber)}</strong><br>
                ${escapeHtml(route.startPoint)} → ${escapeHtml(route.endPoint)}
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

    showTopBar(`Route ${routeNumber} - looking for active buses...`);

    try {
        const buses = await apiGet(`/passenger/routes/${routeId}/buses`);

        if (buses.length === 0) {
            showTopBar(`Route ${routeNumber} - no active buses right now`);
            return;
        }

        showTopBar(`Route ${routeNumber} - ${buses.length} bus(es) assigned`);

        const firstWithLiveLocation = buses
            .map((bus) => bus.busNumber)
            .find((busNumber) => liveBuses[busNumber]);

        if (firstWithLiveLocation) {
            focusBus(firstWithLiveLocation);
        }
    } catch (error) {
        showTopBar(`Couldn't load buses for route ${routeNumber}`);
        console.error(error);
    }
}

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

document.addEventListener("DOMContentLoaded", loadRoutes);
