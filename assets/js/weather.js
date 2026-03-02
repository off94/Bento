const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.weather-value p');
const descElement = document.querySelector('.weather-description p');
const sunriseElement = document.querySelector('.weather-sunrise p');
const sunsetElement = document.querySelector('.weather-sunset p');
const humidityElement = document.querySelector('.weather-humidity p');
const windElement = document.querySelector('.weather-wind p');
const pressureElement = document.querySelector('.weather-pressure p');
const rainElement = document.querySelector('.weather-rain p');
const snowElement = document.querySelector('.weather-snow p');
const locationElement = document.querySelector('.weather-location p');

const weather = {};

const key = `${CONFIG.weatherKey}`;
setPosition();
setInterval(() => setPosition(), 1200000);

function setPosition() {
	if (!CONFIG.trackLocation || !navigator.geolocation) {
		if (CONFIG.trackLocation) {
			console.error('Geolocation not available');
		}
		getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
		return;
	}
	navigator.geolocation.getCurrentPosition(
		pos => {
			getWeather(pos.coords.latitude.toFixed(3), pos.coords.longitude.toFixed(3));
		},
		err => {
			console.error(err);
			getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
		}
	);
}

function getWeather(latitude, longitude) {
	if (!key) {
		console.error('API key for OpenWeatherMap is missing. Please add it to the CONFIG object.');
		displayNoWeather();
		return;
	}
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=${key}`;
	fetch(api)
		.then(function(response) {
			if (!response.ok) {
				throw new Error(`[${response.status}] ${response.statusText}`);
			}
			return response.json();
		})
		.then(function(data) {
			const formatTime = (timestamp) => {
				const date = new Date(timestamp * 1000);
				return date.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false
				});
			};
			weather.temperature = Math.round(data.main.temp);
			weather.feels_like = Math.round(data.main.feels_like);
			weather.pressure = data.main.grnd_level;
			weather.humidity = data.main.humidity;
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
			weather.windSpeed = data.wind.speed;
			weather.sunrise = formatTime(data.sys.sunrise);
			weather.sunset = formatTime(data.sys.sunset);
			weather.location = `${data.name}, ${data.sys.country}`;
			weather.rain = data.rain ? data.rain['1h'] || data.rain['3h'] : 0;
			weather.snow = data.snow ? data.snow['1h'] || data.snow['3h'] : 0;

			displayWeather();
		})
		.catch(function (error) {
			console.error('Error recibiendo datos meteorológicos:', error);
			displayNoWeather();
		});
}

function displayWeather() {
	iconElement.innerHTML = `<img src="assets/icons/${CONFIG.weatherIcons}/${weather.iconId}.png" alt="weather_icon"/>`;
	tempElement.innerHTML = `${weather.temperature.toFixed(0)}°<span class="darkfg">C</span> <br>(${weather.feels_like.toFixed(0)}°<span class="darkfg">C</span>)`;
	descElement.innerHTML = weather.description;

	sunriseElement.innerHTML = ` ${weather.sunrise}`;
	sunsetElement.innerHTML = ` ${weather.sunset}`;
	humidityElement.innerHTML = ` ${weather.humidity}%`;
	windElement.innerHTML = ` ${weather.windSpeed} m/s`;
	pressureElement.innerHTML = ` ${weather.pressure} hPa`;
	rainElement.innerHTML = ` ${weather.rain} mm`;
	snowElement.innerHTML = ` ${weather.snow} mm`;
	locationElement.innerHTML = weather.location;
	if (weather.snow === 0) {
		snowElement.parentElement.style.display = 'none';
		rainElement.parentElement.style.display = 'visible';
	} else {
		snowElement.parentElement.style.display = 'visible';
		rainElement.parentElement.style.display = 'none';
	}
}

function displayNoWeather() {
	iconElement.innerHTML = `<img src="assets/icons/${CONFIG.weatherIcons}/unknown.png" alt="weather_icon"/>`;
	tempElement.innerHTML = `- °<span class="darkfg">C</span>`;
	descElement.innerHTML = 'No disponible';
	sunriseElement.innerHTML = ` - `;
	sunsetElement.innerHTML = ` - `;
	humidityElement.innerHTML = ` - `;
	windElement.innerHTML = ` - `;
	pressureElement.innerHTML = ` - `;
	rainElement.innerHTML = ` - `;
	snowElement.innerHTML = ` - `;
	locationElement.innerHTML = 'Ubicación desconocida';
}