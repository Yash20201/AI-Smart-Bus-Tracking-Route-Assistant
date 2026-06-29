async function loadDrivers() {
    try {
        const [drivers, buses] = await Promise.all([
            apiFetch("/admin/users?role=driver"),
            apiFetch("/buses")
        ]);

        const tbody = document.getElementById("driverTableBody");

        tbody.innerHTML = drivers.map((driver) => {
            const assignedBus = buses.find(
                (bus) => bus.driver && bus.driver._id === driver._id
            );

            return `
                <tr>
                    <td>${driver.name}</td>
                    <td>${driver.email}</td>
                    <td>${assignedBus ? assignedBus.busNumber : "Not assigned"}</td>
                </tr>
            `;
        }).join("");
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadDrivers);
