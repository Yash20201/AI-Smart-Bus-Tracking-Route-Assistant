async function loadDashboard() {
    try {
        const data = await apiFetch("/admin/dashboard");
        const stats = data.statistics;

        document.getElementById("totalUsers").innerText = stats.totalUsers;
        document.getElementById("totalDrivers").innerText = stats.totalDrivers;
        document.getElementById("totalPassengers").innerText = stats.totalPassengers;
        document.getElementById("totalAdmins").innerText = stats.totalAdmins;
        document.getElementById("totalBuses").innerText = stats.totalBuses;
        document.getElementById("activeBuses").innerText = stats.activeBuses;
        document.getElementById("totalRoutes").innerText = stats.totalRoutes;
    } catch (error) {
        showToast(error.message, "error");
    }
}

document.addEventListener("DOMContentLoaded", loadDashboard);
