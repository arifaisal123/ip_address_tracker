// Variables for form input
const form = document.getElementById("ip-form");
const inputField = document.getElementById("input-field");

// Variables for fetching geoip data
const ipAddressElement = document.getElementById('ip-address');
const locationElement = document.getElementById('location');
const timezoneElement = document.getElementById('timezone');
const ispElement = document.getElementById('isp');

// Validates user input and display fetched data on submit
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents initial form submission
  const inputValue = inputField.value;

  // Checks for valid IPv4 or IPv6 address
  if (validateAddress(inputValue)) {
    // Fetch data from 3rd party API
    getData(inputValue);
  }
  else {
    // Shows error message for invalid input
    inputField.value = "Please enter a valid IPv4 or IPv6 address...";
    inputField.style.color = "red";
    inputField.style.fontStyle = "italic";
  }
});

// Clears any value on the form input when on focus
inputField.addEventListener('focus', function() {
    inputField.value = "";
    inputField.style.color = "black";
    inputField.style.fontStyle = "normal";
});

// Fetches data using 3rd party API
async function getData(ip_add) {
    const dataContainer = document.getElementById("data-container");

    await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IP_ADDRESS_TRACKER_API}&ipAddress=${ip_add}`) 
      .then(response => response.json())
      .then(data => {
        const ipAddress = data.ip;
        const country = data.location.country;
        const region = data.location.region;
        const city = data.location.city;
        const postal = data.location.postalCode;
        const timezone = data.location.timezone;
        const isp = data.isp;
        const latitude = data.location.lat;
        const longitude = data.location.lng;

        ipAddressElement.textContent = ipAddress;
        locationElement.textContent = `${city}, ${region}, ${postal}`;
        timezoneElement.textContent = `UTC ${timezone}`;
        ispElement.textContent = `${isp}`;

        // Updates map based on fetched values
        updateMap(latitude, longitude, city, region);
      })
      .catch(error => {
        // Handles program error
        console.error('Error:', error);
        dataContainer.innerText = 'An error occurred. Please try again later.';
      });
}
