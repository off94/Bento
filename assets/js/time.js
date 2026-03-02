window.onload = displayClock();
function displayClock() {
	const monthNames = [
		'Ene',
		'Feb',
		'Mar',
		'Abr',
		'May',
		'Jun',
		'Jul',
		'Ago',
		'Sep',
		'Oct',
		'Nov',
		'Dic',
	];

	const d = new Date();

	document.getElementById('hour').innerText = d.getHours();
	document.getElementById('separator').innerHTML = ' : ';
	document.getElementById('minutes').innerText = ('0' + d.getMinutes()).slice(-2);

	document.getElementById('month').innerText = monthNames[d.getMonth()];
	document.getElementById('day').innerText = d.getDate();
	document.getElementById('utc').innerText = getUTCOffset(d.getTimezoneOffset());

	setTimeout(displayClock, 1000);
}

function getUTCOffset(offset) {
	const sign = offset <= 0 ? '+' : '-';  // note: getTimezoneOffset = UTC - local
	const absMin = Math.abs(offset);
	const hh = String(Math.floor(absMin / 60)).padStart(2, '0');
	const mm = String(absMin % 60).padStart(2, '0');
	return `UTC${sign}${hh}:${mm}`;
}
