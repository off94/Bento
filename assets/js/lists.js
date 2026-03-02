const generateFirstListsContainer = () => {
	for (const list of CONFIG.firstlistsContainer) {
		let item = `
        	<div class="card list list__${list.id}" id="list_${list.id}">
        		${CONFIG.iconsAsSVG ? list.svg : list.icon}
		`;
		for (const element of list.links) {
			item += `
				<a
					target="${CONFIG.openInNewTab ? "_blank" : ""}"
					href="${element.link}"
					class="listItem"
					rel="noopener noreferrer"
				>${element.name}</a>
			`;
		}
		item += `</div>`;
		const position = 'beforeend';
		lists_1.insertAdjacentHTML(position, item);
	}
};

const generateSecondListsContainer = () => {
	for (const list of CONFIG.secondListsContainer) {
		let item = `
        	<div class="card list list__${list.id}" id="list_${list.id}">
        		${CONFIG.iconsAsSVG ? list.svg : list.icon}
		`;
		for (const element of list.links) {
			item += `
				<a
					target="${CONFIG.openInNewTab ? "_blank" : ""}"
					href="${element.link}"
					class="listItem"
					rel="noopener noreferrer"
				>${element.name}</a>
			`;
		}
		item += `</div>`;
		const position = 'beforeend';
		lists_2.insertAdjacentHTML(position, item);
	}
};

const generateLists = () => {
	switch (CONFIG.bentoLayout) {
		case 'bento':
			generateFirstListsContainer();
			break;
		case 'lists':
			generateFirstListsContainer();
			generateSecondListsContainer();
			break;
		default:
			break;
	}
};

generateLists();
