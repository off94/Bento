let theme = localStorage.getItem('theme');
const themeToggle = document.querySelector('#theme-btn');
const themeSun = document.querySelector('#theme-btn .theme-icon.sun');
const themeMoon = document.querySelector('#theme-btn .theme-icon.moon');
const themeAuto = document.querySelector('#theme-btn .theme-icon.auto');

const enableDark = () => {
	cleanTheme();
	document.body.classList.add('dark-theme');
	localStorage.setItem('theme', 'dark');
	themeMoon.style.display = '';
};

const enableLight = () => {
	cleanTheme();
	document.body.classList.add('light-theme');
	localStorage.setItem('theme', 'light');
	themeSun.style.display = '';
};

const enableAuto = () => {
	cleanTheme();
	document.body.classList.add('auto-theme');
	localStorage.setItem('theme', 'auto');
	themeAuto.style.display = '';
};

const cleanTheme = () => {
	document.body.classList.remove('auto-theme');
	document.body.classList.remove('light-theme');
	document.body.classList.remove('dark-theme');
	localStorage.setItem('theme', null);
	themeSun.style.display = 'none';
	themeMoon.style.display = 'none';
	themeAuto.style.display = 'none';
}

switch (theme) {
	case 'dark':
		enableDark();
		break;
	case 'light':
		enableLight();
		break;
	case 'auto':
		enableAuto();
		break;
	default:
		enableDark();
		break;
}


themeToggle.addEventListener('click', () => {
	theme = localStorage.getItem('theme');
	switch (theme) {
		case 'dark':
			enableAuto();
			break;
		case 'light':
			enableDark();
			break;
		case 'auto':
			enableLight();
			break;
		default:
			enableDark();
			break;
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
			enableLight();
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
			enableLight();
		}
		break;
	case 'no':
	default:
		break;
}
