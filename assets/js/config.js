let CONFIG = {};

const STORAGE_KEY = 'config';

function saveConfig(config) {
	try {
		const payload = JSON.stringify(config);
		const cleaned = payload.replace(/<!--!Font Awesome[\s\S]*?-->/g, "");
		const stored = (window.LZString && window.LZString.compressToUTF16)
			? window.LZString.compressToUTF16(cleaned)
			: cleaned;
		localStorage.setItem(STORAGE_KEY, stored);
		if (stored.length > 100000) console.warn('config large:', stored.length);
	} catch (err) {
		console.error('saveConfig error', err);
	}
}

function loadConfig(defaultConfig = {}) {
	try {
		let raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			console.error('loadConfig error, no existe config en localStorage, usando default');
			return structuredClone(defaultConfig);
		}
		if (window.LZString && window.LZString.decompressFromUTF16) {
			raw = window.LZString.decompressFromUTF16(raw);
		}
		const parsed = JSON.parse(raw);
		return deepMerge(structuredClone(defaultConfig), parsed || {});
	} catch (err) {
		console.error('loadConfig error, usando default', err);
		return structuredClone(defaultConfig);
	}
}

function deepMerge(target, source) {
	if (!source) return target;
	for (const key of Object.keys(source)) {
		const val = source[key];
		if (val && typeof val === 'object' && !Array.isArray(val)) {
			if (!target[key] || typeof target[key] !== 'object') target[key] = {};
			deepMerge(target[key], val);
		} else {
			target[key] = val;
		}
	}
	return target;
}


CONFIG = loadConfig();
if (Object.keys(CONFIG).length === 0) {
	console.warn('CONFIG vacía, cargando default');
	CONFIG = EXAMPLE_CONFIG;
}
console.log("CONFIG LOADED", CONFIG);

