document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userElement = document.getElementById('loggedInUser');
    const dashboardSection = document.getElementById('dashboard');
    const loginSection = document.getElementById('login');
    const loginMessage = document.getElementById('login-message');

    if (loggedInUser && userElement) {
        userElement.textContent = loggedInUser.name;
        if ( dashboardSection) {
          loginSection.style.display = 'none';
          loginMessage.innerText = `Welcome back, ${loggedInUser.Name}!`;
          dashboardSection.style.display = 'block';
          showLoggedInUser();
        }
    }
});



