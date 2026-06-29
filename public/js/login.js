async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password");
        return;
    }

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed");
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

        const destination = redirects[data.user && data.user.role] || "/login.html";

        window.location.href = destination;
    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }
}
