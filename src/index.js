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
  document.querySelector("#placeholder").innerHTML = response.data.name;
  document.querySelector("#tempNow").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  fTemp = Math.round(response.data.main.temp);
}

function changeCity(event) {
  event.preventDefault();
  let apiKey = "25fad9f7e87157d33dde0f82ab269ee8";
  let city = document.querySelector("#city-entered").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
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

let search = document.querySelector("#city-search");
search.addEventListener("submit", changeCity);

currentTime();

let fTemp = "null";

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsius);

let fLink = document.querySelector("#fLink");
fLink.addEventListener("click", showF);
