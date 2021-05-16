// Display Current Weather Default by Geo-location

function currentWeather(response) {
  console.log();
  let temperature = Math.round(response.data.main.temp);
  let currentLocation = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  currentLocation.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${temperature}°F`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "imperial";

  console.log(latitude);
  console.log(longitude);

  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(currentWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

//////////// Search & Display Specified Weather for Location

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  let weatherDescription = document.querySelector("#weather-description");

  temperatureElement.innerHTML = `${temperature}°F`;
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchCity = document.querySelector("#city-form");
  let apiKey = "9c82592b70e35c40d22dd8f8facfbc64";

  let units = "imperial";
  let city = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  currentCity.innerHTML = searchCity.value;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

///////////////

// Return to Current City Button

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let returnToCurrent = document.querySelector("#to-current-city");
returnToCurrent.addEventListener("click", getPosition);

//////////

// Format Date & Time and Display on Page
let currentDate = new Date();

function formatDayTime(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    return `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let currentTime = document.querySelector("#current-day-time");
  currentTime.innerHTML = `${day} ${hour}:${minutes}`;
}
formatDayTime(currentDate);
