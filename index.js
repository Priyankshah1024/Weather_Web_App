const selectCountryCodeElement = document.getElementById('country');
const selectCityElement = document.getElementById('city');

const countriesApiUrl = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bcities.json';

function populateCountryOptions(data) {
    data.forEach(country => {
        const option = document.createElement('option');
        option.value = country.iso2; 
        option.text = country.name;
        selectCountryCodeElement.appendChild(option);
    });
}

function populateCityOptions(cities) {
    selectCityElement.innerHTML = '<option value="">Select a City</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.text = city.name;
        selectCityElement.appendChild(option);
    });
}

if(selectCountryCodeElement!=""){
  fetch(countriesApiUrl)
    .then(response => response.json())
    .then(data => {
        populateCountryOptions(data);
        selectCountryCodeElement.addEventListener('change', () => {
            const selectedCountryCode = selectCountryCodeElement.value.toUpperCase();
            const selectedCountry = data.find(country => country.iso2 === selectedCountryCode);
            if (selectedCountry) {
                populateCityOptions(selectedCountry.cities);
            } else {
                selectCityElement.innerHTML = '<option value="">Select a Country First</option>';
            }
        });
    })
    .catch(error => console.error('Error fetching country data:', error));
}
else{
  selectCityElement.innerHTML = '<option value="">Select a Country First</option>';
}

function WeatherData() {
  const apiKey = "dc932122308d9034c1c6e855c81d9123";
  const selectedCountry = selectCountryCodeElement.value.toUpperCase();
  const selectedCity = selectCityElement.value;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},${selectedCountry}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  if(selectedCountry!="" && selectedCity!="")
  {
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        const weatherDataElement = document.getElementById('weatherData');
        const temperatureCelsius = (data.main.temp).toFixed(2);
        const weatherCondition = data.weather[0].description;
        weatherDataElement.innerHTML = `<h3>Weather in ${selectedCity}, ${selectedCountry}:</h3> <b> Temperature: ${temperatureCelsius}°C, <span style="text-transform: capitalize;">${weatherCondition}</span></b>`;
})
    .catch(error => {
      const weatherDataElement = document.getElementById('weatherData');
      weatherDataElement.innerHTML = `<p>Error fetching weather data</p>`;
      console.error('Error:', error);
    }); 
  }
  else{
    alert("Please Enter your Country Code! and City Name!");
    console.log(`Enter your country Code!..\n Enter your city code`);
  }
}

