const user = JSON.parse(localStorage.getItem('user'));

if (!user || user.role !== 'user') {
    window.location.href = 'login.html';
}

// Show user data
document.getElementById('userName').innerText = user.email;
document.getElementById('userId').innerText = user.id;

document.getElementById('welcomeName').innerText = user.email;
document.getElementById('welcomeId').innerText = user.id;

// Logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}