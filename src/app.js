//Format date and time(s)

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day}, ${hours}:${minutes}`;
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
//Format icon(s)

// Current weather
function displayCurrentWeather(response) {
  event.preventDefault();
  console.log(response.data);
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
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//Display current weather & date by default
let apiOpenWeatherKey = "2a64b8c658dc2d165dbcbfd51a3372f7";
let apiOpenWeatherCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${apiOpenWeatherKey}&units=metric`;
axios.get(apiOpenWeatherCityUrl).then(displayCurrentWeather);

//Display current weather & date by current location
function retrievePosition(position) {
  console.log(position);
  let apiOpenWeatherKey = "2a64b8c658dc2d165dbcbfd51a3372f7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiOpenWeatherGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiOpenWeatherKey}&units=metric`;
  axios.get(apiOpenWeatherGeoUrl).then(displayCurrentWeather);
}

function currentGeolocation(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let link = document.querySelector("#currentLocation");
link.addEventListener("click", currentGeolocation);

//Display current weather & date by city name search

function searchCity() {
  event.preventDefault();
  let apiOpenWeatherKey = "2a64b8c658dc2d165dbcbfd51a3372f7";
  let lookUpCity = document.querySelector("#searchBar").value;
  let apiOpenWeatherCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${lookUpCity}&appid=${apiOpenWeatherKey}&units=metric`;
  axios.get(apiOpenWeatherCityUrl).then(displayCurrentWeather);
}

let form = document.querySelector("#search-form ");
form.addEventListener("submit", searchCity);

//Convert units
//Forecast
