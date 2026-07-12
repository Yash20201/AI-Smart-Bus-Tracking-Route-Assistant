<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
// Wires up the static buttons on /admin/admin.html to the dedicated
// admin pages. admin.html does not currently include a <script> tag for
// this file, so it's inert unless linked - included here in case it's
// hooked up later.
<<<<<<< HEAD
=======
=======

>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        const label = button.innerText.trim().toLowerCase();

        if (label === "create bus") {
            button.addEventListener("click", () => {
                window.location.href = "/admin/buses.html";
            });
        }

        if (label === "create route") {
            button.addEventListener("click", () => {
                window.location.href = "/admin/routes.html";
            });
        }

        if (label === "assign driver") {
            button.addEventListener("click", () => {
                window.location.href = "/admin/buses.html";
            });
        }
    });
});
