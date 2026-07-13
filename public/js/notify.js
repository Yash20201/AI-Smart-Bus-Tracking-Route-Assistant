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

// Toggles a password field between hidden and visible text, used by the
// eye-icon button next to password inputs on login/register.
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
    } else {
        input.type = "password";
        btn.textContent = "👁️";
    }
}

// Puts a submit button into a spinning "loading" state and disables it,
// so a slow network can't be double-clicked into firing a request twice.
// Returns a function that restores the button's original state.
function setButtonLoading(btn, loadingText) {
    if (!btn) return () => {};
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> ${loadingText}`;
    return () => {
        btn.disabled = false;
        btn.innerHTML = original;
    };
}
