// Login Form
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const userInfo = document.getElementById('user-info');
const dashboard = document.getElementById('dashboard');
const logoutButton = document.getElementById('logout-button');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const loginContact = document.getElementById('login-contact').value;
  const loginPassword = document.getElementById('login-password').value;

  let userFound = false;
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);

    const storedUser = JSON.parse(value);

    if (storedUser) {
      if (storedUser.contact === loginContact && storedUser.password === loginPassword) {
        loginMessage.textContent = 'Login successful!';
        loginForm.reset();
        showLoggedInUser(key);
        localStorage.setItem('loggedInUser', value);
        document.getElementById('loggedInUser').textContent = storedUser.name;
        userFound = true;
        break;
      } 
    } 
  }

  if (userFound == false ) {
    loginMessage.textContent = 'Invalid user or Incorrect password. Please register or try to reset your password';
  }
});

function showLoggedInUser(userKey) {
  var user = JSON.parse(localStorage.getItem(userKey));
  if (user) {
    if (user.polling == '') {
      gapi.client.setApiKey('AIzaSyB7q8BVVatQbt7btIRwPPbWq_5ZJlp0vq4');
      var elementId = 'user-info';
      console.log('showLoggedInUser', user.address);
      htmlInfo = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Address:</strong> ${user.address}</p>
            <p><strong>Contact Method:</strong> ${user.contact}</p>
            <p></p>
            <p></p>
          `;
      lookup(user.address, function(response) {
        displayPollingLocation(user, response, elementId, htmlInfo);
      });
    } else {
      userInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Address:</strong> ${user.address}</p>
            <p><strong>Contact Method:</strong> ${user.contact}</p>
            <p><strong>Polling Location:</string> ${user.polling}</p>
            <p></p>
            <p></p>`
    }
    // find all users with same polling location as me
    userInfo.innerHTML += `
          <hr>
          <p><strong>Additional users found with same polling location:</strong></p>`

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      const storedUser = JSON.parse(value);

      if (storedUser) {
        if (storedUser.polling === user.polling && storedUser.name != user.name) {
          userInfo.innerHTML += `
                <p><strong>Contact Method:</strong> ${storedUser.contact}</p>`
        } 
      } else {
        loginMessage.textContent = 'No user found with same polling location.';
      }

    }
    userInfo.innerHTML += `
       <p> <strong>You can start planning your Voting Parties by initiating an Email.</strong></p>`
  }
  loginForm.style.display = 'none';
  dashboard.style.display = 'block';
}

logoutButton.addEventListener('click', function() {
  loginForm.style.display = 'block';
  dashboard.style.display = 'none';
  loginMessage.textContent="";
  localStorage.removeItem('loggedInUser');
  location.reload(); 
});