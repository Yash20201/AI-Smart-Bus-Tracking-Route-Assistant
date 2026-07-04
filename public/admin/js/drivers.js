async function loadDrivers() {
    try {
        const [drivers, buses] = await Promise.all([
            apiFetch("/admin/users?role=driver"),
            apiFetch("/buses")
        ]);
<<<<<<< HEAD
        const tbody = document.getElementById("driverTableBody");
        const count = document.getElementById("driverCount");
        if (count) count.textContent = drivers.length;

        if (!drivers.length) {
            tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">🧑‍✈️</div><p>No drivers registered yet.</p></div></td></tr>`;
            return;
        }

        tbody.innerHTML = drivers.map(driver => {
            const bus = buses.find(b => b.driver && b.driver._id === driver._id);
            return `<tr>
                <td><strong>${escapeHtml(driver.name)}</strong></td>
                <td>${escapeHtml(driver.email)}</td>
                <td>${bus ? `<span class="badge badge-active">Bus ${escapeHtml(bus.busNumber)}</span>` : '<span class="badge badge-inactive">Unassigned</span>'}</td>
                <td><button class="btn btn-danger btn-sm" data-delete="driver" data-id="${driver._id}" data-label="${escapeHtml(driver.name)}">🗑 Delete</button></td>
            </tr>`;
        }).join("");
    } catch (e) { showToast(e.message, "error"); }
=======

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
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
}

document.addEventListener("DOMContentLoaded", loadDrivers);
