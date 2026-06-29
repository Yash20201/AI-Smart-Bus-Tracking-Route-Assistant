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
}

document.addEventListener("DOMContentLoaded", () => {
    loadBuses();
    loadDriversForAssign();
});
