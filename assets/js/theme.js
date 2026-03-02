let darkTheme = localStorage.getItem('darkTheme');
const themeToggle = document.querySelector('#theme-btn');
const themeSun = document.querySelector('#theme-btn .theme-icon.sun');
const themeMoon = document.querySelector('#theme-btn .theme-icon.moon');

const enableDark = () => {
	document.body.classList.add('dark-theme');
	localStorage.setItem('darkTheme', 'enabled');
	themeSun.style.display = '';
	themeMoon.style.display = 'none';
};

const disableDark = () => {
	document.body.classList.remove('dark-theme');
	localStorage.setItem('darkTheme', null);
	themeSun.style.display = 'none';
	themeMoon.style.display = '';
};

if (darkTheme === 'enabled') {
	document.body.classList.add('no-transition');
	enableDark();
	document.body.classList.remove('no-transition');
} else {
	disableDark();
}

themeToggle.addEventListener('click', () => {
	darkTheme = localStorage.getItem('darkTheme');
	if (darkTheme !== 'enabled') {
		enableDark();
	} else {
		disableDark();
	}
});

if (CONFIG.imageBackground) {
	document.body.classList.add('background-with-image');
}

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

switch (CONFIG.autoChangeTheme) {
	case 'os':
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			enableDark();
		} else {
			disableDark();
		}
		break;
	case 'hour':
		const date = new Date();
		const month = date.getMonth();
		const isWinter = month === 0 || month === 1 || month === 2;
		const isSpring = month === 3 || month === 4 || month === 5;
		const isSummer = month === 6 || month === 7 || month === 8;
		const isFall = month === 9 || month === 10 || month === 11;
		const hours = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
		const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
		const currentTime = hours + ':' + minutes;

		if (isWinter && inInterval(currentTime, CONFIG.winterHourDarkThemeActive, CONFIG.winterHourDarkThemeInactive) ||
			isSpring && inInterval(currentTime, CONFIG.springHourDarkThemeActive, CONFIG.springHourDarkThemeInactive) ||
			isSummer && inInterval(currentTime, CONFIG.summerHourDarkThemeActive, CONFIG.summerHourDarkThemeInactive) ||
			isFall && inInterval(currentTime, CONFIG.fallHourDarkThemeActive, CONFIG.fallHourDarkThemeInactive)
		) {
			enableDark();
		} else {
			disableDark();
		}
		break;
	case 'no':
	default:
		break;
}
