async function loadUsers() {
    try {
        const users = await apiFetch("/admin/users");
        const tbody = document.getElementById("userTableBody");

        tbody.innerHTML = users.map((user) => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge badge-${user.role}">${user.role}</span></td>
            </tr>
        `).join("");
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadUsers);
