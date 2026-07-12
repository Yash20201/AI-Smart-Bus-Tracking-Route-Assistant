async function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!name || !email || !password) {
<<<<<<< HEAD
        showNotification("Please fill in all fields", "error");
=======
<<<<<<< HEAD
        showNotification("Please fill in all fields", "error");
=======
        alert("Please fill in all fields");
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        return;
    }

    try {
        const response = await fetch("/api/auth/register", {
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
            body: JSON.stringify({ name, email, password, role })
        });

        const result = await response.json();

        if (!response.ok) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
            showNotification(result.message || "Registration failed", "error");
            return;
        }

        showNotification("Registration successful! Please log in.", "success");

        setTimeout(() => { window.location.href = "/login.html"; }, 900);
    } catch (error) {
        showNotification("Something went wrong. Please try again.", "error");
<<<<<<< HEAD
=======
=======
            alert(result.message || "Registration failed");
            return;
        }

        alert("Registration successful! Please log in.");

        window.location.href = "/login.html";
    } catch (error) {
        alert("Something went wrong. Please try again.");
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
        console.error(error);
    }
}
