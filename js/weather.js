const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');

// App data
const weather = {};
weather.temperature = {
    unit: 'celsius',
};

// Change to 'F' for Fahrenheit
const tempUnit = 'C';

const KELVIN = 273.15;

// https://openweathermap.org/
const owm = 'e1b52704780b82f262ae369dbd14d03b';

const language = 'es';

// Set Position function
setPosition();

function setPosition() {
    // Here you can change your position
    // https://www.latlong.net/
    let latitude = 41.655250;
    let longitude = -0.857835;

    getWeather(latitude, longitude);
}

// Get the Weather data
function getWeather(latitude, longitude) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language}&appid=${owm}`;

    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let celsius = Math.floor(data.main.temp - KELVIN);
            weather.temperature.value = (tempUnit === 'C') ? celsius : (celsius * 9/5) + 32;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
        })
        .then(function () {
            displayWeather();
        });
}

// Display Weather info
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/Nord/${weather.iconId}.png" alt="weather_icon"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span class="darkfg">${tempUnit}</span>`;
    descElement.innerHTML = weather.description;
}
