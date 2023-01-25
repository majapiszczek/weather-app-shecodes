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
