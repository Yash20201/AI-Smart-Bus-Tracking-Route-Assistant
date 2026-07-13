async function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const btn = document.getElementById("registerBtn");

    if (!name || !email || !password) {
        showNotification("Please fill in all fields", "error");
        return;
    }

    const restore = setButtonLoading(btn, "Creating account…");

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });

        const result = await response.json();

        if (!response.ok) {
            showNotification(result.message || "Registration failed", "error");
            restore();
            return;
        }

        showNotification("Registration successful! Please log in.", "success");

        setTimeout(() => { window.location.href = "/login.html"; }, 900);
    } catch (error) {
        showNotification("Something went wrong. Please try again.", "error");
        console.error(error);
        restore();
    }
}
