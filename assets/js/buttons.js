const generateFirstButtonsContainer = () => {
	const buttonsToShow = CONFIG.buttonsContainer.slice(0, CONFIG.numberOfElementsPerContainer);
	for (const button of buttonsToShow) {
		let item = `
			<a
			  href="${button.link}"
			  target="${CONFIG.openInNewTab ? '_blank' : ''}"
			  rel="noopener noreferrer"
			  class="card button"
			>
				${CONFIG.iconsAsSVG ? button.svg : button.icon}
			</a>
		`;
		buttons_1.insertAdjacentHTML('beforeend', item);
	}
};

const generateSecondButtonsContainer = () => {
	const buttonsToShow = CONFIG.buttonsContainer.slice(CONFIG.numberOfElementsPerContainer, CONFIG.numberOfElementsPerContainer*2);
	for (const button of buttonsToShow) {
		let item = `
			<a
			  href="${button.link}"
			  target="${CONFIG.openInNewTab ? '_blank' : ''}"
			  rel="noopener noreferrer"
			  class="card button"
			>
			  <i class="btn-icon" icon-name="${button.icon}"></i>
			</a>
		`;
		buttons_2.insertAdjacentHTML('beforeend', item);
	}
};

const generateButtons = () => {
	switch (CONFIG.bentoLayout) {
		case 'bento':
			generateFirstButtonsContainer();
			break;
		case 'buttons':
			generateFirstButtonsContainer();
			generateSecondButtonsContainer();
			break;
		default:
			break;
	}
};

generateButtons();
