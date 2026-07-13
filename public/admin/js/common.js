const API_BASE = "/api";

function getToken() { return localStorage.getItem("token"); }

function requireAuth() {
    const token = getToken();
    const role  = localStorage.getItem("role");
    if (!token) { window.location.href = "/login.html"; return null; }
    if (role && role !== "admin") {
        window.location.href = "/login.html";
        return null;
    }
    return token;
}

function logout() {
    localStorage.clear();
    window.location.href = "/login.html";
}

async function apiFetch(path, options = {}) {
    const token = getToken();
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
    return data;
}

/* ── SAFE HTML ESCAPING ── */
/* Used any time user-entered text (names, bus numbers, etc.) is inserted
   into innerHTML, so a name containing <, >, &, or quotes can't break
   the page or an attribute. */
function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/* ── TOAST ── */
function showToast(msg, type = "success") {
    let wrap = document.getElementById("toast");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.id = "toast";
        document.body.appendChild(wrap);
    }
    const icon = type === "success" ? "✓" : "✕";
    const el = document.createElement("div");
    el.className = `toast-msg toast-${type}`;
    el.innerHTML = `<div class="toast-icon">${icon}</div><span>${escapeHtml(msg)}</span>`;
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity 0.3s"; setTimeout(() => el.remove(), 300); }, 3200);
}

/* ── CONFIRM DELETE MODAL ── */
let _pendingDelete = null;

function confirmDelete(label, callback) {
    _pendingDelete = callback;
    document.getElementById("confirmName").textContent = label;
    document.getElementById("deleteModal").classList.add("open");
}

function closeModal() {
    document.getElementById("deleteModal").classList.remove("open");
    _pendingDelete = null;
}

// BUGFIX: previously called closeModal() (which nulls _pendingDelete)
// BEFORE invoking the callback, so the delete request never actually fired.
// Now we grab a local reference first, then close, then run it.
function doDelete() {
    const run = _pendingDelete;
    closeModal();
    if (run) run();
}

function injectModal() {
    if (document.getElementById("deleteModal")) return;
    const el = document.createElement("div");
    el.id = "deleteModal";
    el.className = "modal-overlay";
    el.innerHTML = `
        <div class="modal">
            <span class="modal-icon">🗑️</span>
            <h3>Delete this item?</h3>
            <p>You're about to delete <strong id="confirmName"></strong>. This is permanent and cannot be undone.</p>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal()">Cancel</button>
                <button class="btn-delete-confirm" onclick="doDelete()">Yes, delete</button>
            </div>
        </div>`;
    document.body.appendChild(el);
    el.addEventListener("click", e => { if (e.target === el) closeModal(); });
}

/* ── UNIFIED DELETE SYSTEM ──
   Tables render buttons like:
     <button data-delete="bus" data-id="${id}" data-label="Bus 101">🗑</button>
   instead of onclick="deleteBus('${id}','${name}')" strings — this avoids
   any chance of a name containing a quote character breaking the HTML,
   and keeps every table's delete wiring identical and centralized here. */
const DELETE_CONFIG = {
    bus:    { endpoint: id => `/buses/${id}`,       reload: () => typeof loadBuses   === "function" && loadBuses()   },
    route:  { endpoint: id => `/routes/${id}`,      reload: () => typeof loadRoutes  === "function" && loadRoutes()  },
    driver: { endpoint: id => `/admin/users/${id}`, reload: () => typeof loadDrivers === "function" && loadDrivers() },
    user:   { endpoint: id => `/admin/users/${id}`, reload: () => typeof loadUsers   === "function" && loadUsers()   }
};

document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete]");
    if (!btn) return;

    const type   = btn.dataset.delete;
    const id     = btn.dataset.id;
    const label  = btn.dataset.label || "this item";
    const config = DELETE_CONFIG[type];
    if (!config) return;

    confirmDelete(label, async () => {
        try {
            await apiFetch(config.endpoint(id), { method: "DELETE" });
            showToast(`${label} deleted`);
            config.reload();
        } catch (err) {
            showToast(err.message, "error");
        }
    });
});

/* ── SIDEBAR NAV ── */
function renderNav(active) {
    const links = [
        { href: "dashboard.html", label: "Dashboard", icon: "📊" },
        { href: "buses.html",     label: "Buses",     icon: "🚌" },
        { href: "drivers.html",   label: "Drivers",   icon: "🧑" },
        { href: "routes.html",    label: "Routes",    icon: "🗺️" },
        { href: "trips.html",     label: "Trips",     icon: "📍" },
        { href: "users.html",     label: "Users",     icon: "👥" },
        { href: "settings.html",  label: "Settings",  icon: "⚙️" }
    ];
    const nav = document.getElementById("nav");
    if (!nav) return;
    nav.innerHTML = `
        <div class="nav-brand">🚌 <span>Bus Tracker</span></div>
        <div class="nav-links">
            ${links.map(l => `
                <a href="${l.href}" class="${active === l.href ? "active" : ""}">
                    <span class="nav-icon">${l.icon}</span>${l.label}
                </a>`).join("")}
        </div>
        <button class="logout-btn" onclick="logout()">🚪 Sign out</button>`;
}

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
    injectModal();
});
