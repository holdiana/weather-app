function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tyesday",
    "Wednesday",
    "Thursday",
    "Freiday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coorditates) {
  let apiKey = "f48cb8e5ea750137e496c7dd7e72c4af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coorditates.lat}&lon=${coorditates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#descr");
  let precipitationElement = document.querySelector("#precipitation");
  let speedWind = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  speedWind.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  //використання функції формату дня та часу
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  //зміна іконки
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f48cb8e5ea750137e496c7dd7e72c4af";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  //визиваємо функцію в функції для input
  search(cityInputElement.value);
}

function displayFarTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFarTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsTemp);

//forecast function
//including HTML in JS
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let maxForecastTemp = Math.round(forecastDay.temp.max);
    let minForecastTemp = Math.round(forecastDay.temp.min);
    //index - кількість днів, що показуємо
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
                <div class="forecast__date">${formateDate(forecastDay.dt)}</div>

                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="icon forecast"
                  width="42px"
                />
                <div class="forecast-temp">
                  <span class="forecast-temp__max">${maxForecastTemp}°</span>
                  <span class="forecast-temp__min">${minForecastTemp}°</span>
                </div>
              </div>
            `;
    }

    forecastElement.innerHTML = forecastHTML + `</div>`;
  });
}

function formateDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
