function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#descr");
  let precipitationElement = document.querySelector("#precipitation");
  let speedWind = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  speedWind.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
}

let apiKey = "f48cb8e5ea750137e496c7dd7e72c4af";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
