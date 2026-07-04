async function loadTrips() {
    try {
        const trips = await apiFetch("/trips");
        const tbody = document.getElementById("tripTableBody");
        const count = document.getElementById("tripCount");
        if (count) count.textContent = trips.length;

        if (!trips.length) {
            tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">📍</div><p>No trips scheduled yet.</p></div></td></tr>`;
            return;
        }

        tbody.innerHTML = trips.map(t => {
            const badgeClass = t.status === "ongoing" ? "active" : t.status === "completed" ? "passenger" : "inactive";
            return `
            <tr>
                <td><strong>${t.bus ? escapeHtml(t.bus.busNumber) : "—"}</strong></td>
                <td>${t.route ? escapeHtml(t.route.routeNumber) : "—"}</td>
                <td>${t.driver ? escapeHtml(t.driver.name) : "—"}</td>
                <td><span class="badge badge-${badgeClass}">${escapeHtml(t.status)}</span></td>
                <td style="display:flex;gap:6px;flex-wrap:wrap">
                    <button class="btn btn-primary btn-sm" onclick="updateStatus('${t._id}','ongoing')">▶ Start</button>
                    <button class="btn btn-primary btn-sm" style="background:linear-gradient(135deg,#059669,#34d399)" onclick="updateStatus('${t._id}','completed')">✓ Done</button>
                    <button class="btn btn-danger btn-sm" onclick="updateStatus('${t._id}','cancelled')">✕ Cancel</button>
                </td>
            </tr>`;
        }).join("");
    } catch (e) { showToast(e.message, "error"); }
}

async function populateTripSelects() {
    try {
        const [buses, routes, drivers] = await Promise.all([
            apiFetch("/buses"),
            apiFetch("/routes"),
            apiFetch("/admin/users?role=driver")
        ]);
        document.getElementById("tripBusId").innerHTML    = buses.map(b   => `<option value="${b._id}">${escapeHtml(b.busNumber)} – ${escapeHtml(b.busName)}</option>`).join("");
        document.getElementById("tripRouteId").innerHTML  = routes.map(r  => `<option value="${r._id}">${escapeHtml(r.routeNumber)}</option>`).join("");
        document.getElementById("tripDriverId").innerHTML = drivers.map(d => `<option value="${d._id}">${escapeHtml(d.name)}</option>`).join("");
    } catch (e) { console.error(e); }
}

async function createTrip() {
    const bus    = document.getElementById("tripBusId").value;
    const route  = document.getElementById("tripRouteId").value;
    const driver = document.getElementById("tripDriverId").value;
    if (!bus || !route) return showToast("Select a bus and route", "error");
    try {
        await apiFetch("/trips", { method: "POST", body: JSON.stringify({ bus, route, driver }) });
        showToast("Trip scheduled");
        loadTrips();
    } catch (e) { showToast(e.message, "error"); }
}

async function updateStatus(tripId, status) {
    try {
        await apiFetch(`/trips/${tripId}/status`, { method: "PUT", body: JSON.stringify({ status }) });
        showToast(`Trip marked as ${status}`);
        loadTrips();
    } catch (e) { showToast(e.message, "error"); }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTrips();
    populateTripSelects();
});
