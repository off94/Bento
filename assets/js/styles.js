
document.querySelector('.container').dataset.column = CONFIG.smallSizeMode ? CONFIG.smallSizeMode : 1;
document.documentElement.style.setProperty('--image-background-enabled', CONFIG.imageBackground === true ? 1 : 0);
document.documentElement.style.setProperty('--image-background-path', 'url(../img/'+CONFIG.imageBackgroundPath+')');

document.documentElement.style.setProperty('--light-glow-enabled', CONFIG.lightFontGlowEnabled === true ? 1 : 0);
document.documentElement.style.setProperty('--light-img-background-tint-enabled', CONFIG.lightBackgroundImgTintEnabled === true ? 1 : 0);
document.documentElement.style.setProperty('--dark-glow-enabled', CONFIG.darkFontGlowEnabled === true ? 1 : 0);
document.documentElement.style.setProperty('--dark-img-background-tint-enabled', CONFIG.darkBackgroundImgTintEnabled === true ? 1 : 0);
document.documentElement.style.setProperty('--auto-glow-enabled', CONFIG.autoFontGlowEnabled === true ? 1 : 0);
document.documentElement.style.setProperty('--auto-img-background-tint-enabled', CONFIG.autoBackgroundImgTintEnabled === true ? 1 : 0);

document.documentElement.style.setProperty('--light-font-color', CONFIG.lightFontColor);
document.documentElement.style.setProperty('--light-font-hover-color', CONFIG.lightFontHoverColor);
document.documentElement.style.setProperty('--light-card-color', CONFIG.lightCardColor);
document.documentElement.style.setProperty('--light-card-hover-color', CONFIG.lightCardHoverColor);
document.documentElement.style.setProperty('--light-background-color', CONFIG.lightBackgroundColor);
document.documentElement.style.setProperty('--light-img-background-tint', CONFIG.lightBackgroundImgTint);
document.documentElement.style.setProperty('--light-glow-color-value', CONFIG.lightFontGlow);

document.documentElement.style.setProperty('--dark-font-color', CONFIG.darkFontColor);
document.documentElement.style.setProperty('--dark-font-hover-color', CONFIG.darkFontHoverColor);
document.documentElement.style.setProperty('--dark-card-color', CONFIG.darkCardColor);
document.documentElement.style.setProperty('--dark-card-hover-color', CONFIG.darkCardHoverColor);
document.documentElement.style.setProperty('--dark-background-color', CONFIG.darkBackgroundColor);
document.documentElement.style.setProperty('--dark-img-background-tint', CONFIG.darkBackgroundImgTint);
document.documentElement.style.setProperty('--dark-glow-color-value', CONFIG.darkFontGlow);

document.documentElement.style.setProperty('--num-columns-buttons-left', CONFIG.numberOfColumnsLeft);
document.documentElement.style.setProperty('--num-columns-buttons-right', CONFIG.numberOfColumnsRight);
