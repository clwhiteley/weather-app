function currentTime() {
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  dateElement.innerHTML = `${days[day]}, ${hours}:${minutes}`;
}

function displayCurrentTemp(response) {
  document.querySelector("#placeholder").innerHTML = response.data.city;
  document.querySelector("#tempNow").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.condition.description;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  fTemp = Math.round(response.data.temperature.current);
  currentTime();
  getForecast();
}

function changeCity(city) {
  let apiKey = "5340a3bf04actcea1o8a948a8a2ba809";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentTemp);
}

function getForecast(city) {
  let apiKey = "5340a3bf04actcea1o8a948a8a2ba809";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-entered");
  changeCity(city.value);
  getForecast(city.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = '<div class="row">';

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
             <div class="weather-forecast-date" id="forecast-date">${formatDay(
               forecastDay.time
             )}</div>
             <img 
             src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
               forecastDay.condition.icon
             }.png"
             alt="icon"
             id="forecast-icon" />
              <div class="weather-forecast-temps">
                <span class="weather-forecast-max">H: ${Math.round(
                  forecastDay.temperature.maximum
                )}°F</span>
             <br />
             <span class="weather-forecast-min">L: ${Math.round(
               forecastDay.temperature.minimum
             )}°F</span>
             </div>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + "</div";
  forecastElement.innerHTML = forecastHTML;
}

let search = document.querySelector("#city-search");
search.addEventListener("submit", handleSubmit);

currentTime();
changeCity("Seattle");
getForecast("Seattle");
