//Functions

//Format date and time(s)
function formatDateForecast(timestamp) {
  let date = new Date(timestamp);
  let dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = dayArray[date.getDay()];
  return `${day}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayArray[date.getDay()];
  return `${day}, ${formatTime(timestamp)}`;
}
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Convert units

function displayFahrUnit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");

  celsiusUnit.classList.remove("active");
  fahrUnit.classList.add("active");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
}

function displayCelsiusUnit(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrUnit.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

//change icons weather
function replaceIconWeather(response) {
  console.log(response);
}

// Display weather

function displayCurrentWeather(response) {
  event.preventDefault();
  let cityElement = document.querySelector("#currentCity");
  let temperatureElement = document.querySelector("#currentTemp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#currentHumidity");
  let feelsLikeElement = document.querySelector("#currentFeeling");
  let windElement = document.querySelector("#currentWind");
  let sunriseElement = document.querySelector("#sunriseTime");
  let sunsetElement = document.querySelector("#sunsetTime");
  let dateElement = document.querySelector("#currentDate");
  let iconElement = document.querySelector("#iconW");
  celsiusTemp = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  iconElement.setAttribute("src", `src/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//Display forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#weekForecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `
  <div class="col-2">
  <div class="day1" id="dayOne">
   ${formatDateForecast(forecast.dt * 1000)}
  </div>
  <img src="src/${forecast.weather[0].icon}.png"class="iWF"/>
  <div class="forecastTemperature">
  <strong>${Math.round(forecast.temp.max)} °</strong>${Math.round(
      forecast.temp.min
    )} °</div>
  </div>
  `;
  }
}

//Get weather from current location

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  // 1. get the current weather for the lat and lon
  let apiOpenWeatherGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiOpenWeatherKey}&units=metric`;
  axios.get(apiOpenWeatherGeoUrl).then(displayCurrentWeather);

  // 2. get the 7 days forecast for lat and lon
  displayForecastWeather(lat, lon);
}

function currentGeolocation(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//Get weather by city name
function search(city) {
  let apiOpenWeatherCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiOpenWeatherKey}&units=metric`;
  axios.get(apiOpenWeatherCityUrl).then(function (response) {
    //This makes a request to the API
    displayCurrentWeather(response);
    // Here: get the lat & lon from "response" and pass them to a separate function for Forecast
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;

    displayForecastWeather(lat, lon);
  });
}

//Get the 7 days forecast
function displayForecastWeather(lat, lon) {
  let apiOpenWeatherFUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiOpenWeatherKey}&units=metric`;
  axios.get(apiOpenWeatherFUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchBar");
  search(cityInputElement.value);
}

//Variables
let apiOpenWeatherKey = "2a64b8c658dc2d165dbcbfd51a3372f7";

let celsiusTemp = null;

let fahrUnit = document.querySelector("#fahr");
fahrUnit.addEventListener("click", displayFahrUnit);

let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", displayCelsiusUnit);

let form = document.querySelector("#search-form ");
form.addEventListener("submit", handleSubmit);

let link = document.querySelector("#currentLocation");
link.addEventListener("click", currentGeolocation);

search("Paris");
