async function loadRoutes() {
    try {
        const routes = await apiFetch("/routes");
        const tbody = document.getElementById("routeTableBody");

        tbody.innerHTML = routes.map((route) => `
            <tr>
                <td>${route.routeNumber}</td>
                <td>${route.startPoint}</td>
                <td>${route.endPoint}</td>
                <td>${route.stops.length}</td>
            </tr>
        `).join("");
    } catch (error) {
        alert(error.message);
    }
}

async function createRoute() {
    try {
        const routeNumber = document.getElementById("routeNumber").value;
        const startPoint = document.getElementById("startPoint").value;
        const endPoint = document.getElementById("endPoint").value;
        const stopsInput = document.getElementById("stops").value;

        if (!routeNumber || !startPoint || !endPoint) {
            alert("Please fill in route number, start point, and end point");
            return;
        }

        const stops = stopsInput
            .split(",")
            .map((stop) => stop.trim())
            .filter(Boolean)
            .map((name) => ({ type: name }));

        await apiFetch("/routes", {
            method: "POST",
            body: JSON.stringify({ routeNumber, startPoint, endPoint, stops })
        });

        document.getElementById("routeNumber").value = "";
        document.getElementById("startPoint").value = "";
        document.getElementById("endPoint").value = "";
        document.getElementById("stops").value = "";

        loadRoutes();
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadRoutes);
