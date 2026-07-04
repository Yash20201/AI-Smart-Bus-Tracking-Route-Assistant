async function loadUsers() {
    try {
        const users = await apiFetch("/admin/users");
        const tbody = document.getElementById("userTableBody");
        const count = document.getElementById("userCount");
        if (count) count.textContent = users.length;

        if (!users.length) {
            tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">👥</div><p>No users found.</p></div></td></tr>`;
            return;
        }

        tbody.innerHTML = users.map(u => `
            <tr>
                <td><strong>${escapeHtml(u.name)}</strong></td>
                <td>${escapeHtml(u.email)}</td>
                <td><span class="badge badge-${u.role}">${escapeHtml(u.role)}</span></td>
                <td><button class="btn btn-danger btn-sm" data-delete="user" data-id="${u._id}" data-label="${escapeHtml(u.name)}">🗑 Delete</button></td>
            </tr>`).join("");
    } catch (e) { showToast(e.message, "error"); }
}

document.addEventListener("DOMContentLoaded", loadUsers);
