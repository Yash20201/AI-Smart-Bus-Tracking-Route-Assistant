async function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, role })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Registration failed");
            return;
        }

        alert("Registration successful! Please log in.");

        window.location.href = "/login.html";
    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }
}
