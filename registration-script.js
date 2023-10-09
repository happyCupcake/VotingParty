// Registration Form
const registrationForm = document.getElementById('registration-form');
const registrationMessage = document.getElementById('registration-message');

registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;
  const password = document.getElementById('password').value;

  const user = {
    name: name,
    address: address,
    contact: contact,
    password: password,
    polling: '',
    govScore: '',
    economicScore: '',
    socialScore: '',
    foreignScore: '',
    envScore: '',
    totalScore: '',
  };

  console.log(user.name + " " + user.contact + " " + user.password)
  localStorage.setItem(user.contact, JSON.stringify(user));

  registrationMessage.textContent = 'Registration complete!';
  registrationForm.reset();

  showLoggedInUser(user.contact);
});

function showLoggedInUser(userKey) {
  var user = JSON.parse(localStorage.getItem(userKey));
  if (user) {
    // Display user info after registration
    console.log(user);
  }
}