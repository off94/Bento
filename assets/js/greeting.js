const date = new Date();
const hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
const currentTime = hour + ':' + minutes;

const greetingNight = getRandom(CONFIG.greetingNight);
const greetingMorning = getRandom(CONFIG.greetingMorning);
const greetingAfternoon = getRandom(CONFIG.greetingAfternoon);
const greetingEvening = getRandom(CONFIG.greetingEvening);

function inInterval(value, start, end) {
	// Time parameters in format "HH:MM"
	const toMins = (time) => {
		const [h, m] = time.split(':').map(Number);
		return h * 60 + m;
	};
	const startMins = toMins(start);
	const endMins = toMins(end);
	const valueMins = toMins(value);

	if (startMins <= endMins) {
		return valueMins >= startMins && valueMins <= endMins;
	}
	return valueMins >= startMins || valueMins <= endMins;
}

function getRandom(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return "";
	const str = arr[Math.floor(Math.random() * arr.length)];
	return str.includes("$NAME") ? str.replace(/\$NAME/g, CONFIG.name) : str;
}

if (inInterval(currentTime, CONFIG.greetingNightHour, CONFIG.greetingMorningHour)) {
	document.getElementById('greetings').innerText = greetingNight;
} else if (inInterval(currentTime, CONFIG.greetingMorningHour, CONFIG.greetingAfternoonHour)) {
	document.getElementById('greetings').innerText = greetingMorning;
} else if (inInterval(currentTime, CONFIG.greetingAfternoonHour, CONFIG.greetingEveningHour)) {
	document.getElementById('greetings').innerText = greetingAfternoon;
} else {
	document.getElementById('greetings').innerText = greetingEvening;
}
