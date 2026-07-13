let allUsers = [];

async function loadUsers() {
    try {
        allUsers = await apiFetch("/admin/users");
        renderUserTable(allUsers);
    } catch (e) { showToast(e.message, "error"); }
}

function renderUserTable(users) {
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
}

function filterUsers(query) {
    const q = query.trim().toLowerCase();
    if (!q) return renderUserTable(allUsers);

    const filtered = allUsers.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
    renderUserTable(filtered);
}

document.addEventListener("DOMContentLoaded", loadUsers);
