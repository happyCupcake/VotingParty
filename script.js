

function handleFormSubmit(event) {
  console.log('Hi, !');
  //event.preventDefault();
  var nameInput = document.getElementById('name');
  var name = nameInput.value.trim();
  if (name !== '') {
    printGreeting(name);
  }
}

function printGreeting(name) {
  document.getElementById("result").innerHTML = ('Hi, ' + name + '!');
}




function load() {
  console.log('Hi, !');
  gapi.client.setApiKey('AIzaSyB7q8BVVatQbt7btIRwPPbWq_5ZJlp0vq4');
  lookup('1263 Pacific Ave. Kansas City KS', displayPollingLocation);
}

function lookup(address, callback) {
  var electionId = 2000;
  //var apiKey = ; // Replace with your own API key
  //gapi.client.setApiKey('AIzaSyB7q8BVVatQbt7btIRwPPbWq_5ZJlp0vq4');
  //gapi.client.request('civicinfo', 'v2', function() {
  console.log("look")
  //address='4371, Jessica Cir, Fremont, CA.'
  var req = gapi.client.request({
    'path': '/civicinfo/v2/voterinfo',
    'params': { 'electionId': electionId, 'address': address }
  });

  req.execute(callback);

}

function displayPollingLocation(response, rawResponse) {
  console.log("hi");
  var resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!response || response.error) {
    resultsContainer.textContent = 'Error while trying to fetch polling place';
    return;
  }

  var normalizedAddress = response.normalizedInput.line1 + ' ' +
    response.normalizedInput.city + ', ' +
    response.normalizedInput.state + ' ' +
    response.normalizedInput.zip;

  if (response.pollingLocations && response.pollingLocations.length > 0) {
    var pollingLocation = response.pollingLocations[0].address;
    var pollingAddress = pollingLocation.locationName + ', ' +
      pollingLocation.line1 + ' ' +
      pollingLocation.city + ', ' +
      pollingLocation.state + ' ' +
      pollingLocation.zip;

    var normEl = document.createElement('strong');
    normEl.textContent = 'Polling place for ' + normalizedAddress + ': ';
    resultsContainer.appendChild(normEl);

    var addressEl = document.createElement('span');
    addressEl.textContent = pollingAddress;
    resultsContainer.appendChild(addressEl);
  } else {
    var errorEl = document.createElement('span');
    errorEl.textContent = 'Could not find polling place for ' + normalizedAddress;
    resultsContainer.appendChild(errorEl);
  }
}


function handleFormSubmit() {
  //event.preventDefault();

  var addressInput = document.getElementById('address');
  var address = addressInput.value.trim();

  gapi.client.setApiKey('AIzaSyB7q8BVVatQbt7btIRwPPbWq_5ZJlp0vq4');

  if (address !== '') {
    console.log('Form submitted:', address);
    lookup(address, displayPollingLocation
    );
  }
}


//function load() {
  //gapi.load('client', function() {
/*gapi.client.init({
  apiKey: apiKey
});*/
  //});
//}