// Get the hour
var hour = new Date().getHours();

// Here you can change your name
var name = 'Óscar';

// Here you can change your greetings
var gree1 = 'Buenos días ';
var gree2 = 'Buenas tardes ';
var gree3 = 'Buenas noches ';

// Define the hours of the greetings
if (hour >= 21 && hour < 7) {
    document.getElementById('greetings').innerText = gree3 + name;
} else if (hour >= 7 && hour < 14) {
    document.getElementById('greetings').innerText = gree1 + name;
} else if (hour >= 14 && hour < 21) {
    document.getElementById('greetings').innerText = gree2 + name;
}
