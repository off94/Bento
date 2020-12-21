// Get the hour
const hour = new Date().getHours();

// Here you can change your name
const name = 'Óscar';

// Here you can change your greetings
const gree1 = 'Buenos días ';
const gree2 = 'Buenas tardes ';
const gree3 = 'Buenas noches ';

// Define the hours of the greetings
if (hour >= 21 || hour < 7) {
    document.getElementById('greetings').innerText = gree3 + name;
} else if (hour >= 7 && hour < 14) {
    document.getElementById('greetings').innerText = gree1 + name;
} else if (hour >= 14 && hour < 21) {
    document.getElementById('greetings').innerText = gree2 + name;
}
