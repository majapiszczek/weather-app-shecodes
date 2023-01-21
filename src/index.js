function showTemp(response) {
  let numberTemp = document.querySelector("#number");
  numberTemp.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  console.log(response);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

let date = `${day}, ${hour}:${minutes}`;

let currentDate = document.querySelector("p");
currentDate.innerHTML = date;

let city = document.querySelector("form");
city.addEventListener("submit", searchCity);

function toCelsius() {
  let temp = document.querySelector("span");
  temp.innerHTML = `☁️ ${currentCelsius}`;
}

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", toCelsius);
let currentCelsius = 5;

function toFahrenheit() {
  let temp = document.querySelector("span");
  temp.innerHTML = `☁️ ${currentFahrenheit}`;
}

let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", toFahrenheit);
let currentFahrenheit = currentCelsius * 1.8 + 32;

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getLocation);

search("New York");
