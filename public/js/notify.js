// Shared toast-notification system for public pages (login, register, driver).
// Replaces native alert() with a non-blocking, styled toast — same look
// and feel as the admin panel's notifications, styles live in /css/style.css.

function escapeHtmlBasic(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function showNotification(message, type = "success") {
    let wrap = document.getElementById("notify-wrap");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.id = "notify-wrap";
        document.body.appendChild(wrap);
    }

    const icons = { success: "✓", error: "✕", info: "ℹ" };
    const el = document.createElement("div");
    el.className = `notify-toast notify-${type}`;
    el.innerHTML = `<span class="notify-icon">${icons[type] || icons.info}</span><span>${escapeHtmlBasic(message)}</span>`;
    wrap.appendChild(el);

    setTimeout(() => {
        el.classList.add("notify-hide");
        setTimeout(() => el.remove(), 300);
    }, 3200);
}
