// Current date

let currentDay = new Date();
let h2 = document.querySelector("h2");
let hours = currentDay.getHours();
let minutes = ("0" + currentDay.getMinutes()).slice(-2);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDay.getDay()];
h2.innerHTML = `${day}, ${hours}:${minutes}`;

// Temperature and Geolocation

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#comment").innerHTML =
    response.data.weather[0].description;
}

function getSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "a634dd1dee9be0dfeff6ce65b2525c84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(position) {
  let apiKey = "a634dd1dee9be0dfeff6ce65b2525c84";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let apiKey = "a634dd1dee9be0dfeff6ce65b2525c84";
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getSubmit);
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
