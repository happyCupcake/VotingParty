

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

const lookupTable = {
    "33955 Emilia Lane Fremont, CA 94555": "ARDENWOOD ELEM SCHOOL  LIBRARY, 33955 EMILIA LN  FREMONT, CA 94555",
    "719 Wisteria Drive Fremont, CA 94539": "CHADBOURNE ELEM SCH  LIBRARY, 801 PLYMOUTH AVE  FREMONT, CA 94539",
    "4474 Macbeth Circle Fremont, CA 94555": "ARDENWOOD ELEM SCHOOL  LIBRARY, 33955 EMILIA LN  FREMONT, CA 94555",
    "4458 Macbeth Circle Fremont, CA 94555": "ARDENWOOD ELEM SCHOOL  LIBRARY, 33955 EMILIA LN  FREMONT, CA 94555",
    "3764 Howe Court Fremont, CA 94538": "FREMONT FIRE STATION 3, 40700 CHAPEL WAY  FREMONT, CA 94538",
    "41751 Murphy Place Fremont, CA 94539": "CHADBOURNE ELEM SCH  LIBRARY, 801 PLYMOUTH AVE  FREMONT, CA 94539",
    "857 Bedford Street Fremont, CA 94539": "CHADBOURNE ELEM SCH  LIBRARY, 801 PLYMOUTH AVE  FREMONT, CA 94539",
    "32412 Lois Way Union City, CA 94587": "CABELLO SCHOOL  TEACHERS LOUNGE, 4500 CABELLO ST  UNION CITY, CA 94587",
};


function load() {
  console.log('Hi, !');
  gapi.client.setApiKey('AIzaSyB7q8BVVatQbt7btIRwPPbWq_5ZJlp0vq4');
  lookup('1263 Pacific Ave. Kansas City KS', displayPollingLocation);
}

function lookup(address, callback) {
  //var electionId = 2000;
  //var electionId = 8076;
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

function displayPollingLocation(user, response, elementId, htmlInfo) {
  var resultsContainer = document.getElementById(elementId);
  resultsContainer.innerHTML = htmlInfo;
  
  if (!response || response.error) {
    resultsContainer.textContent = 'Error while trying to fetch polling place';
    return;
  }
   console.log('displayPollingLocation1 ', response);
  
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
      normEl.textContent = 'Polling Location: ';
      resultsContainer.appendChild(normEl);
  
      var addressEl = document.createElement('strong');
      addressEl.textContent = pollingAddress;
      resultsContainer.appendChild(addressEl);
      if (user) {
        user.polling = pollingAddress;
        localStorage.setItem(user.contact, JSON.stringify(user));
      }
  } else {
      console.log('here1 ',normalizedAddress);
      if (lookupTable.hasOwnProperty(normalizedAddress)) {
          console.log('here2');
          pollingAddress = lookupTable[normalizedAddress];
           var normEl = document.createElement('strong');
            normEl.textContent = 'Polling Location: ';
            resultsContainer.appendChild(normEl);
        
            var addressEl = document.createElement('strong');
            addressEl.textContent = pollingAddress;
            resultsContainer.appendChild(addressEl);
            if (user) {
              user.polling = pollingAddress;
              localStorage.setItem(user.contact, JSON.stringify(user));
            }
      } else {
        var errorEl = document.createElement('span');
        errorEl.textContent = 'Could not find polling place for ' + normalizedAddress;
        resultsContainer.appendChild(errorEl);
      }
  }
}


function handleFormSubmit() {
  //event.preventDefault();

  var addressInput = document.getElementById('address');
  var address = addressInput.value.trim();

  gapi.client.setApiKey('AIzaSyCQVU3YSvM00wvoN7u_Dm125_Kpg-F_us4');
  var elementId = 'results';
  if (address !== '') {
    console.log('Form submitted:', address);
    lookup(address, function(response) {
      displayPollingLocation(null, response, elementId, '');
    });
  }
}


function displayAddressInfo(addressInfo, elementId) {
  var element = document.getElementById(elementId);
  if (element) {
    // Display the address information in the specified element
    element.innerHTML = `
      <p><strong>Polling Location:</strong> ${addressInfo.pollingLocation}</p>
      <p><strong>Election Date:</strong> ${addressInfo.electionDate}</p>
      <p><strong>Other Details:</strong> ${addressInfo.otherDetails}</p>
    `;
  } else {
    console.log(`Element with ID '${elementId}' not found.`);
  }
}