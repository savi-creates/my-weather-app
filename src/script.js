function updateDateTime() {
  const date = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const timeString = `${dayName} ${formattedHours}:${formattedMinutes}`;

  document.querySelector("#current-date").textContent = timeString;
}

updateDateTime();

setInterval(updateDateTime, 60000);

const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const cityDisplay = document.querySelector("#current-city");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let city = searchInput.value.trim();
  // Capitalize the first letter of each word
  city = city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  cityDisplay.textContent = city;

  searchCity(city); // Call the function to update the temperature

  searchInput.value = "";
});

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = "ta4d13o783b04c3ee4a956ed2febde0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

searchCity("Paris");
