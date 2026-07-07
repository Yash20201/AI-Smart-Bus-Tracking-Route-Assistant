async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showNotification("Please enter both email and password", "error");
        return;
    }

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            showNotification(data.message || "Login failed", "error");
            return;
        }

        localStorage.setItem("token", data.token);

        if (data.user) {
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("name", data.user.name);
        }

        const redirects = {
            admin: "/admin/dashboard.html",
            driver: "/driver/driver.html",
            passenger: "/passenger/passenger.html"
        };

        showNotification("Login successful", "success");

        setTimeout(() => {
            window.location.href = redirects[data.user && data.user.role] || "/login.html";
        }, 400);
    } catch (error) {
        showNotification("Something went wrong. Please try again.", "error");
        console.error(error);
    }
}
