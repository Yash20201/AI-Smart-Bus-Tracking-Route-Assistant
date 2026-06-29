const API_BASE = "/api";

function getToken() {
    return localStorage.getItem("token");
}

function requireAuth() {
    const token = getToken();
    const role = localStorage.getItem("role");

    if (!token) {
        window.location.href = "/login.html";
        return null;
    }

    if (role && role !== "admin") {
        alert("Admin access only");
        window.location.href = "/login.html";
        return null;
    }

    return token;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.href = "/login.html";
}

async function apiFetch(path, options = {}) {
    const token = getToken();

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}

function renderNav(active) {
    const links = [
        { href: "dashboard.html", label: "Dashboard" },
        { href: "buses.html", label: "Buses" },
        { href: "drivers.html", label: "Drivers" },
        { href: "routes.html", label: "Routes" },
        { href: "trips.html", label: "Trips" },
        { href: "users.html", label: "Users" },
        { href: "settings.html", label: "Settings" }
    ];

    const nav = document.getElementById("nav");

    if (!nav) {
        return;
    }

    nav.innerHTML = `
        <div class="nav-brand">🚌 Bus Tracker Admin</div>
        <div class="nav-links">
            ${links.map((link) => `
                <a href="${link.href}" class="${active === link.href ? "active" : ""}">${link.label}</a>
            `).join("")}
        </div>
        <button class="logout-btn" onclick="logout()">Logout</button>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
});
