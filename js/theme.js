// Store the theme
let lightTheme = localStorage.getItem('bentoLightTheme');
const themeToggle = document.querySelector('#themeButton');

const enableLight = () => {
    document.body.classList.add('lighttheme');
    localStorage.setItem('bentoLightTheme', 'enabled');
    themeToggle.innerHTML = `<i id="bicon" class="fas fa-sun fa-2x"></i>`;
};

const disableLight = () => {
    document.body.classList.remove('lighttheme');
    localStorage.setItem('bentoLightTheme', null);
    themeToggle.innerHTML = `<i id="bicon" class="fas fa-moon fa-2x"></i>`;
};

if (lightTheme === 'enabled') {
    enableLight();
} else {
    disableLight();
}

themeToggle.addEventListener('click', () => {
    lightTheme = localStorage.getItem('bentoLightTheme');
    if (lightTheme !== 'enabled') {
        enableLight();
    } else {
        disableLight();
    }
});

// Change the theme with the time
/*
const hour = new Date().getHours();
const dawn = 7;
const dusk = 19;

if (hour >= dusk || hour < dawn) {
    disableLight();
} else {
    enableLight();
}
*/