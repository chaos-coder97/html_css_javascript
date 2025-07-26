async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const list = document.getElementById('userList');

    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
                        <div class="username">${user.name}</div>
                        <div class="email">${user.email}</div>`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

getUsers();