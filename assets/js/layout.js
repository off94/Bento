const generateLayout = () => {
	let firstButtonsContainer = `
    <div class="buttons-container" id="buttons_1"></div>
  `;
	let secondButtonsContainer = `
    <div class="buttons-container" id="buttons_2"></div>
  `;
	let firstListsContainer = `
    <div class="lists-container" id="lists_1"></div>
  `;

	let secondListsContainer = `
    <div class="lists-container" id="lists_2"></div>
  `;

	const position = 'beforeend';

	switch (CONFIG.bentoLayout) {
		case 'bento':
			linksBlockLeft.insertAdjacentHTML(position, firstButtonsContainer);
			linksBlockRight.insertAdjacentHTML(position, firstListsContainer);
			break;
		case 'lists':
			linksBlockLeft.insertAdjacentHTML(position, firstListsContainer);
			linksBlockRight.insertAdjacentHTML(position, secondListsContainer);
			break;
		case 'buttons':
			linksBlockLeft.insertAdjacentHTML(position, firstButtonsContainer);
			linksBlockRight.insertAdjacentHTML(position, secondButtonsContainer);
			break;
		default:
			break;
	}
};

generateLayout();
