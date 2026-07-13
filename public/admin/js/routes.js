let allRoutes = [];

async function loadRoutes() {
    try {
        allRoutes = await apiFetch("/routes");
        renderRouteTable(allRoutes);
    } catch (e) { showToast(e.message, "error"); }
}

function renderRouteTable(routes) {
    const tbody = document.getElementById("routeTableBody");
    const count = document.getElementById("routeCount");
    if (count) count.textContent = routes.length;

    if (!routes.length) {
        tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">🗺️</div><p>No routes yet. Add one above.</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = routes.map(r => {
        const stopNames = r.stops.map(s => s.type || s).join(", ") || "—";
        return `
        <tr>
            <td><strong>${escapeHtml(r.routeNumber)}</strong></td>
            <td>${escapeHtml(r.startPoint)}</td>
            <td>${escapeHtml(r.endPoint)}</td>
            <td>${escapeHtml(stopNames)}</td>
            <td>
                <button class="btn btn-danger btn-sm" data-delete="route" data-id="${r._id}" data-label="${escapeHtml('Route ' + r.routeNumber)}">🗑 Delete</button>
            </td>
        </tr>`;
    }).join("");
}

function filterRoutes(query) {
    const q = query.trim().toLowerCase();
    if (!q) return renderRouteTable(allRoutes);

    const filtered = allRoutes.filter(r =>
        r.routeNumber.toLowerCase().includes(q) ||
        r.startPoint.toLowerCase().includes(q) ||
        r.endPoint.toLowerCase().includes(q) ||
        r.stops.some(s => (s.type || s).toLowerCase().includes(q))
    );
    renderRouteTable(filtered);
}

async function createRoute() {
    const routeNumber = document.getElementById("routeNumber").value.trim();
    const startPoint  = document.getElementById("startPoint").value.trim();
    const endPoint    = document.getElementById("endPoint").value.trim();
    const stopsRaw    = document.getElementById("stops").value.trim();

    if (!routeNumber || !startPoint || !endPoint) return showToast("Fill in route number, start and end point", "error");

    const stops = stopsRaw
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(name => ({ type: name }));

    try {
        await apiFetch("/routes", { method: "POST", body: JSON.stringify({ routeNumber, startPoint, endPoint, stops }) });
        ["routeNumber", "startPoint", "endPoint", "stops"].forEach(id => document.getElementById(id).value = "");
        showToast("Route created");
        loadRoutes();
    } catch (e) { showToast(e.message, "error"); }
}

document.addEventListener("DOMContentLoaded", loadRoutes);
