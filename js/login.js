const VALID_USERS = {
    'admin@edu.com': { password: 'admin123', role: 'admin' }
};

// Run after page load
document.addEventListener("DOMContentLoaded", function () {

    const userRadio = document.getElementById('userLogin');
    const adminRadio = document.getElementById('adminLogin');
    const emailInput = document.getElementById('email');
    const form = document.getElementById('loginForm');

    // Change input type
    userRadio.addEventListener('change', () => {
        emailInput.placeholder = "Enter Email";
        emailInput.type = "email";
    });

    adminRadio.addEventListener('change', () => {
        emailInput.placeholder = "Enter Admin ID";
        emailInput.type = "text";
    });

    // Login system
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.querySelector('input[name="role"]:checked');

        if (!role) {
            alert("Select role!");
            return;
        }

        let user = null;

        // Admin login
        if (role.value === 'admin') {
            const admin = VALID_USERS[email];

            if (admin && admin.password === password) {
                user = admin;
            } else {
                alert("Invalid Admin Login!");
                return;
            }
        }

        // User login
        if (role.value === 'user') {
            const users = JSON.parse(localStorage.getItem('users')) || [];

            user = users.find(u => 
                u.email === email && 
                u.password === password
            );

            if (!user) {
                alert("User not found! Please register first.");
                return;
            }
        }

        // Save session
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect
        if (role.value === 'admin') {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }
    });

});