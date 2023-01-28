function showTemp(response) {
  let numberTemp = document.querySelector("#number");
  numberTemp.innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("h1").innerHTML = response.data.city;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  celsiusTemp = response.data.temperature.current;

  getForecast(response.data.coordinates);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div id="forecast-day">${formatDay(forecastDay.time)}</div>
        <img src=${forecastDay.condition.icon_url} id="forecast-icons" alt="${
          forecastDay.condition.icon
        }" width="40" />
        <div class="forecast-temp"><span id="max">${Math.round(
          forecastDay.temperature.maximum
        )}°</span> <span id="min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span></div>
      </div>
        
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8a74ad5eo45tde558fe05997d33ec4b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function search(city) {
  let apiKey = "8a74ad5eo45tde558fe05997d33ec4b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8a74ad5eo45tde558fe05997d33ec4b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getLocation);

search("New York");
