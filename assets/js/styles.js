
document.querySelector('.container').dataset.column = CONFIG.smallSizeMode ? CONFIG.smallSizeMode : 1;
document.documentElement.style.setProperty('--image-background-enabled', CONFIG.imageBackground === true ? 1 : 0);

document.documentElement.style.setProperty('--light-glow-enabled', CONFIG.lightFontGlowEnabled === true ? 1 : 0);
document.documentElement.style.setProperty('--dark-glow-enabled', CONFIG.darkFontGlowEnabled === true ? 1 : 0);

document.documentElement.style.setProperty('--num-columns-buttons-left', CONFIG.numberOfColumnsLeft);
document.documentElement.style.setProperty('--num-columns-buttons-right', CONFIG.numberOfColumnsRight);
