async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
<<<<<<< HEAD
        showNotification("Please enter both email and password", "error");
=======
<<<<<<< HEAD
        showNotification("Please enter both email and password", "error");
=======
        alert("Please enter both email and password");
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        return;
    }

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
<<<<<<< HEAD
            headers: { "Content-Type": "application/json" },
=======
<<<<<<< HEAD
            headers: { "Content-Type": "application/json" },
=======
            headers: {
                "Content-Type": "application/json"
            },
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
<<<<<<< HEAD
            showNotification(data.message || "Login failed", "error");
=======
<<<<<<< HEAD
            showNotification(data.message || "Login failed", "error");
=======
            alert(data.message || "Login failed");
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        showNotification("Login successful", "success");

        setTimeout(() => {
            window.location.href = redirects[data.user && data.user.role] || "/login.html";
        }, 400);
    } catch (error) {
        showNotification("Something went wrong. Please try again.", "error");
<<<<<<< HEAD
=======
=======
        const destination = redirects[data.user && data.user.role] || "/login.html";

        window.location.href = destination;
    } catch (error) {
        alert("Something went wrong. Please try again.");
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        console.error(error);
    }
}
