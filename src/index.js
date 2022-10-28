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
}

function changeCity(event) {
  event.preventDefault();
  let apiKey = "5340a3bf04actcea1o8a948a8a2ba809";
  let city = document.querySelector("#city-entered").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentTemp);
}

function showCelsius(event) {
  event.preventDefault();
  fLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = (fTemp - 32) * (5 / 9);
  document.querySelector("#tempNow").innerHTML = Math.round(celsiusTemp);
}

function showF(event) {
  event.preventDefault();
  fLink.classList.add("active");
  celsiusLink.classList.remove("active");
  document.querySelector("#tempNow").innerHTML = fTemp;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = '<div class="row">';
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
             <div class="weather-forecast-date" id="forecast-date">${day}</div>
             <img 
             src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
             alt="icon"
             id="forecast-icon" />
              <div class="weather-forecast-temps">
                <span class="weather-forecast-max">H: 78°F</span>
             <br />
             <span class="weather-forecast-min">L: 58°F</span>
             </div>
            </div>
            `;
  });

  forecastHTML = forecastHTML + "</div";
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

let search = document.querySelector("#city-search");
search.addEventListener("submit", changeCity);

currentTime();

let fTemp = "null";

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsius);

let fLink = document.querySelector("#fLink");
fLink.addEventListener("click", showF);
