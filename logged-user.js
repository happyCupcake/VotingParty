document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userElement = document.getElementById('loggedInUser');
    //const loginForm = document.getElementById('login-form');
    const dashboardSection = document.getElementById('dashboard');
    const loginSection = document.getElementById('login');
    const loginMessage = document.getElementById('login-message');

    if (loggedInUser && userElement) {
        userElement.textContent = loggedInUser.name; // Assuming 'name' is the property holding the username
        if (loginForm && dashboardSection) {
          //loginForm.style.display = 'none';
          loginSection.style.display = 'none';
          loginMessage.innerText = `Welcome back, ${loggedInUser.Name}!`;
          dashboardSection.style.display = 'block';
          showLoggedInUser();
        }
    }
});



