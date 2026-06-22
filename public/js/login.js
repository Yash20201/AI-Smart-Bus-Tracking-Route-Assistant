async function login() {

    const response = await fetch(
        "/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        }
    );

    const data = await response.json();

    localStorage.setItem(
        "token",
        data.token
    );

    alert("Login Successful");

    window.location.href =
    "/driver.html";
}