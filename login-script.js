// Login Form
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const welcomeMessage = document.getElementById('welcome-message');
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
        //loginForm.reset();
        localStorage.setItem('loggedInUser', value);
        showLoggedInUser();
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

function showLoggedInUser() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  welcomeMessage.textContent += user.name;
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

    let userMindSet = calculateMindsetBasedOnFiveSurveys(Number(user.govScore)+Number(user.economicScore)+Number(user.socialScore)+ Number(user.foreignScore) +Number(user.envScore));

     console.log(userMindSet);
    // find all users with same polling location as me
    userInfo.innerHTML += `
          <hr>
          <p><strong>Additional users found with same polling location. Based on your survey responses and a proprietary algorithm, here are some potential matches to reduce political polarization:</strong></p>`

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      const storedUser = JSON.parse(value);

      if (storedUser) {
        if (storedUser.polling === user.polling && storedUser.name != user.name) {

            let totalScore = convertToNumber(storedUser.govScore)+
              convertToNumber(storedUser.economicScore)+
              convertToNumber(storedUser.socialScore)+
              convertToNumber(storedUser.foreignScore)+
              convertToNumber(storedUser.envScore);
            let storedMindSet = calculateMindsetBasedOnFiveSurveys(totalScore);
            
            console.log(storedMindSet);
          
            if (
                (userMindSet == 'Moderate' && storedMindSet == 'Moderate') ||
                (userMindSet == 'Moderate' && storedMindSet == 'Liberal') ||
                (userMindSet == 'Liberal' && storedMindSet == 'Moderate') ||
                (userMindSet == 'Liberal' && storedMindSet == 'Conservative') ||
                 (userMindSet == 'Conservative' && storedMindSet == 'Liberal') ||
                (userMindSet == 'Conservative' && storedMindSet == 'Moderate') ||
                 (userMindSet == 'Moderate' && storedMindSet == 'Conservative')) {
            
                userInfo.innerHTML += `
                    <p><strong>Contact Method:</strong> ${storedUser.contact}</p>`
            } else if  (userMindSet == 'Conservative' && storedMindSet == 'Conservative') {
              console.log("two Conservatives found, maching them together will reinforce their believes");
            } else if ((userMindSet == 'Liberal' && storedMindSet == 'Liberal') ) {
              console.log("two Liberal found, maching them together will reinforce their believes");
            }
        } 
      } else {
        loginMessage.textContent = 'No user found with same polling location.';
      }

    }
    userInfo.innerHTML += `
       <p> <strong>You can start planning your Voting Parties by initiating an Email.</strong></p>
       <hr>`
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