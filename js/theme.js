// Store the theme
let darkTheme = localStorage.getItem('darkTheme');
const themeToggle = document.querySelector('#themeButton');

const enableDark = () => {
    document.body.classList.add('darktheme');
    localStorage.setItem('darkTheme', 'enabled');
    themeToggle.innerHTML = `<i id="bicon" class="fas fa-moon fa-2x"></i>`;
};

const disableDark = () => {
    document.body.classList.remove('darktheme');
    localStorage.setItem('darkTheme', null);
    themeToggle.innerHTML = `<i id="bicon" class="fas fa-sun fa-2x"></i>`;
};

if (darkTheme === 'enabled') {
    enableDark();
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

// Change the theme with the time
/*
const hour = new Date().getHours();
const dawn = 7;
const dusk = 19;

if (hour >= dusk || hour < dawn) {
    enableDark();
} else {
    disableDark();
}
*/