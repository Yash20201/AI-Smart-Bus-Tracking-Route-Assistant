<<<<<<< HEAD
let allBuses = [];

async function loadBuses() {
    try {
        allBuses = await apiFetch("/buses");
        renderBusTable(allBuses);
        populateBusSelects(allBuses);
        loadRoutesForSelect();
    } catch (e) { showToast(e.message, "error"); }
}

function renderBusTable(buses) {
    const tbody = document.getElementById("busTableBody");
    const count = document.getElementById("busCount");
    if (count) count.textContent = buses.length;

    if (!buses.length) {
        tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">🚌</div><p>No buses added yet. Add one above.</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = buses.map(bus => {
        const label = escapeHtml(`${bus.busNumber} – ${bus.busName}`);
        return `
        <tr>
            <td><strong>${escapeHtml(bus.busNumber)}</strong></td>
            <td>${escapeHtml(bus.busName)}</td>
            <td>${bus.driver ? escapeHtml(bus.driver.name) : '<span class="badge badge-inactive">Unassigned</span>'}</td>
            <td>${bus.route ? escapeHtml(bus.route.routeNumber) : '<span style="color:var(--muted)">—</span>'}</td>
            <td><span class="badge badge-${bus.status || "active"}">${escapeHtml(bus.status || "active")}</span></td>
            <td>
                <button class="btn btn-danger btn-sm" data-delete="bus" data-id="${bus._id}" data-label="${label}">🗑 Delete</button>
            </td>
        </tr>`;
    }).join("");
}

async function createBus() {
    const busNumber = document.getElementById("busNumber").value.trim();
    const busName   = document.getElementById("busName").value.trim();
    if (!busNumber || !busName) return showToast("Fill in bus number and name", "error");
    try {
        await apiFetch("/buses", { method: "POST", body: JSON.stringify({ busNumber, busName }) });
        document.getElementById("busNumber").value = "";
        document.getElementById("busName").value   = "";
        showToast("Bus added successfully");
        loadBuses();
    } catch (e) { showToast(e.message, "error"); }
}

function populateBusSelects(buses) {
    const opts = buses.map(b => `<option value="${b._id}">${escapeHtml(b.busNumber)} – ${escapeHtml(b.busName)}</option>`).join("");
    ["assignBusId", "routeBusId"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = opts;
    });
}

async function loadDriversForSelect() {
    try {
        const drivers = await apiFetch("/admin/users?role=driver");
        document.getElementById("assignDriverId").innerHTML =
            drivers.map(d => `<option value="${d._id}">${escapeHtml(d.name)}</option>`).join("") ||
            '<option disabled>No drivers registered</option>';
    } catch (e) { console.error(e); }
}

async function loadRoutesForSelect() {
    try {
        const routes = await apiFetch("/routes");
        document.getElementById("routeSelectId").innerHTML =
            routes.map(r => `<option value="${r._id}">${escapeHtml(r.routeNumber)} (${escapeHtml(r.startPoint)} → ${escapeHtml(r.endPoint)})</option>`).join("") ||
            '<option disabled>No routes yet</option>';
    } catch (e) { console.error(e); }
}

async function assignDriver() {
    const busId    = document.getElementById("assignBusId").value;
    const driverId = document.getElementById("assignDriverId").value;
    if (!busId || !driverId) return showToast("Select a bus and driver", "error");
    try {
        await apiFetch("/buses/assign-driver", { method: "PUT", body: JSON.stringify({ busId, driverId }) });
        showToast("Driver assigned");
        loadBuses();
    } catch (e) { showToast(e.message, "error"); }
}

async function assignRoute() {
    const busId   = document.getElementById("routeBusId").value;
    const routeId = document.getElementById("routeSelectId").value;
    if (!busId || !routeId) return showToast("Select a bus and route", "error");
    try {
        await apiFetch("/buses/assign-route", { method: "PUT", body: JSON.stringify({ busId, routeId }) });
        showToast("Route assigned");
        loadBuses();
    } catch (e) { showToast(e.message, "error"); }
=======
async function loadBuses() {
    try {
        const buses = await apiFetch("/buses");
        const tbody = document.getElementById("busTableBody");

        tbody.innerHTML = buses.map((bus) => `
            <tr>
                <td>${bus.busNumber}</td>
                <td>${bus.busName}</td>
                <td>${bus.driver ? bus.driver.name : "Unassigned"}</td>
                <td>${bus.route ? bus.route.routeNumber : "-"}</td>
                <td>${bus.status}</td>
            </tr>
        `).join("");

        populateBusSelect(buses);
        loadDataForRouteAssign(buses);
    } catch (error) {
        alert(error.message);
    }
}

function populateBusSelect(buses) {
    const select = document.getElementById("assignBusId");

    select.innerHTML = buses.map((bus) => `
        <option value="${bus._id}">${bus.busNumber} - ${bus.busName}</option>
    `).join("");
}

async function loadDriversForAssign() {
    try {
        const drivers = await apiFetch("/admin/users?role=driver");
        const select = document.getElementById("assignDriverId");

        select.innerHTML = drivers.map((driver) => `
            <option value="${driver._id}">${driver.name} (${driver.email})</option>
        `).join("");
    } catch (error) {
        console.log(error);
    }
}

async function loadDataForRouteAssign(buses) {
    try {
        const select = document.getElementById("routeBusId");

        select.innerHTML = buses.map((bus) => `
            <option value="${bus._id}">${bus.busNumber} - ${bus.busName}</option>
        `).join("");

        const routes = await apiFetch("/routes");
        const routeSelect = document.getElementById("routeSelectId");

        routeSelect.innerHTML = routes.map((route) => `
            <option value="${route._id}">${route.routeNumber} (${route.startPoint} → ${route.endPoint})</option>
        `).join("");
    } catch (error) {
        console.log(error);
    }
}

async function assignRoute() {
    try {
        const busId = document.getElementById("routeBusId").value;
        const routeId = document.getElementById("routeSelectId").value;

        if (!busId || !routeId) {
            alert("Please select both a bus and a route");
            return;
        }

        await apiFetch("/buses/assign-route", {
            method: "PUT",
            body: JSON.stringify({ busId, routeId })
        });

        alert("Route assigned successfully");
        loadBuses();
    } catch (error) {
        alert(error.message);
    }
}

async function createBus() {
    try {
        const busNumber = document.getElementById("busNumber").value;
        const busName = document.getElementById("busName").value;

        if (!busNumber || !busName) {
            alert("Please fill in both bus number and bus name");
            return;
        }

        await apiFetch("/buses", {
            method: "POST",
            body: JSON.stringify({ busNumber, busName })
        });

        document.getElementById("busNumber").value = "";
        document.getElementById("busName").value = "";

        loadBuses();
    } catch (error) {
        alert(error.message);
    }
}

async function assignDriver() {
    try {
        const busId = document.getElementById("assignBusId").value;
        const driverId = document.getElementById("assignDriverId").value;

        if (!busId || !driverId) {
            alert("Please select both a bus and a driver");
            return;
        }

        await apiFetch("/buses/assign-driver", {
            method: "PUT",
            body: JSON.stringify({ busId, driverId })
        });

        alert("Driver assigned successfully");
        loadBuses();
    } catch (error) {
        alert(error.message);
    }
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
}

document.addEventListener("DOMContentLoaded", () => {
    loadBuses();
<<<<<<< HEAD
    loadDriversForSelect();
=======
    loadDriversForAssign();
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
});
