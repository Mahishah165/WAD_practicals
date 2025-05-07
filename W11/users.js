const users = JSON.parse(localStorage.getItem("users")) || [];
const tbody = document.querySelector("#usersTable tbody");

users.forEach(user => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name || ''}</td>
    <td>${user.email || ''}</td>
    <td>${user.mobile || ''}</td>
    <td>${user.dob || ''}</td>
    <td>${user.city || ''}</td>
    <td>${user.address || ''}</td>
  `;
  tbody.appendChild(row);
});