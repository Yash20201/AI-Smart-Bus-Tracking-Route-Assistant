
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
