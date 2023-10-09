document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userElement = document.getElementById('loggedInUser');

    if (loggedInUser && userElement) {
        userElement.textContent = loggedInUser.name; // Assuming 'name' is the property holding the username
    }
});
