let now = new Date();
console.log(now);

function currentTime() {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(weekDay);

  let day = weekDay[now.getDay()];
  console.log(day);

  let hour = now.getHours();
  console.log(hour);

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  console.log(minutes);

  return `${day}, at ${hour}:${minutes}`;
}

let time = document.querySelector("#time");
time.innerHTML = currentTime(now);

function showTemp(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let weather = document.querySelector("#current");
  weather.innerHTML = `${temperature}°C`;
  let h2 = document.querySelector("#city");
  h2.innerHTML = response.data.name;
}

function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "c789e765c19e78f4b69ede7112f55431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", displayCity);

function exactLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c789e765c19e78f4b69ede7112f55431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function exactButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(exactLocation);
}

let exact = document.querySelector("#exact-button");
exact.addEventListener("click", exactButton);
