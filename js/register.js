// 📦 Get users
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// 💾 Save users
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// 🎯 Register Logic
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // 🔴 Validation
    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    let users = getUsers();

    // 🔴 Duplicate check
    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("Email already registered!");
        return;
    }

    // 🆔 Unique ID
    const userId = "USER" + Math.floor(Math.random() * 100000);

    // ✅ New user
    const newUser = {
        id: userId,
        name: name,
        email: email,
        password: password,
        role: 'user',
        joined: new Date().toLocaleDateString(),
        testsTaken: 0,
        avgScore: 0
    };

    users.push(newUser);
    saveUsers(users);

    // 🔐 Auto login
    localStorage.setItem('user', JSON.stringify(newUser));

    alert("Registration Successful!");

    window.location.href = "dashboard.html";
});
