async function loadTrips() {
    try {
        const trips = await apiFetch("/trips");
        const tbody = document.getElementById("tripTableBody");

        tbody.innerHTML = trips.map((trip) => `
            <tr>
                <td>${trip.bus ? trip.bus.busNumber : "-"}</td>
                <td>${trip.route ? trip.route.routeNumber : "-"}</td>
                <td>${trip.driver ? trip.driver.name : "-"}</td>
                <td>${trip.status}</td>
                <td>
                    <button onclick="updateStatus('${trip._id}', 'ongoing')">Start</button>
                    <button onclick="updateStatus('${trip._id}', 'completed')">Complete</button>
                    <button onclick="updateStatus('${trip._id}', 'cancelled')">Cancel</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        alert(error.message);
    }
}

async function populateTripSelects() {
    try {
        const [buses, routes, drivers] = await Promise.all([
            apiFetch("/buses"),
            apiFetch("/routes"),
            apiFetch("/admin/users?role=driver")
        ]);

        document.getElementById("tripBusId").innerHTML = buses.map(
            (bus) => `<option value="${bus._id}">${bus.busNumber}</option>`
        ).join("");

        document.getElementById("tripRouteId").innerHTML = routes.map(
            (route) => `<option value="${route._id}">${route.routeNumber}</option>`
        ).join("");

        document.getElementById("tripDriverId").innerHTML = drivers.map(
            (driver) => `<option value="${driver._id}">${driver.name}</option>`
        ).join("");
    } catch (error) {
        console.log(error);
    }
}

async function createTrip() {
    try {
        const bus = document.getElementById("tripBusId").value;
        const route = document.getElementById("tripRouteId").value;
        const driver = document.getElementById("tripDriverId").value;

        if (!bus || !route) {
            alert("Please select a bus and a route");
            return;
        }

        await apiFetch("/trips", {
            method: "POST",
            body: JSON.stringify({ bus, route, driver })
        });

        loadTrips();
    } catch (error) {
        alert(error.message);
    }
}

async function updateStatus(tripId, status) {
    try {
        await apiFetch(`/trips/${tripId}/status`, {
            method: "PUT",
            body: JSON.stringify({ status })
        });

        loadTrips();
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTrips();
    populateTripSelects();
});
