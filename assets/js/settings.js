const settingsBtn = document.querySelector('#settings-btn');
const panel = document.getElementById('config-panel');
const rows = document.getElementById('config-form-rows');
const saveBtn = document.getElementById('config-save');
const cancelBtn = document.getElementById('config-cancel');
const closeBtn = document.getElementById('config-close');

let closeTimer = null;
let escHandler = null;


function loadData(cfg) {
    Object.entries(cfg).forEach(entry => {
        const key = entry[0];
        const value = entry[1];
        const div = document.querySelector(`.field[data-key=${key}]`);
        const isRadioGroup = div && div.classList.contains('radio-group');
        const input = div.querySelector('input');
        const radios = div.querySelectorAll('input');
        const ta = div.querySelector('textarea');

        const t = typeof value;
        if (isRadioGroup) {
            if (t === 'number') {
                radios.forEach(radio => {
                    radio.checked = radio.value === value;
                    radio.dataset.type = 'number';
                })
            } else {
                radios.forEach(radio => {
                    radio.checked = radio.value === value;
                    radio.dataset.type = 'string';
                })
            }
        } else {
            if (t === 'boolean') {
                input.checked = !!value;
                input.dataset.type = 'boolean';
            } else if (Array.isArray(value) || (t === 'object' && value !== null)) {
                ta.dataset.type = 'json';
                ta.value = JSON.stringify(value, null, 2);
            } else if (t === 'number') {
                input.value = value;
                input.dataset.type = 'number';
            } else {
                input.value = value === undefined || value === null ? '' : String(value);
                input.dataset.type = 'string';
            }
        }
    });
}

function openConfigPanel() {
    if (!panel || !rows) return;
    const current = (typeof loadConfig === 'function') ? loadConfig(CONFIG) : (window.CONFIG || {});
    loadData(current);

    if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
    }
    panel.style.display = 'flex';
    requestAnimationFrame(() => {
        panel.setAttribute('aria-hidden', 'false');
    });

    panel.addEventListener('click', onBackdropClick);
    escHandler = (e) => { if (e.key === 'Escape') closeConfigPanel(); };
    document.addEventListener('keydown', escHandler);
    const first = panel.querySelector('input, textarea, button');
    if (first && typeof first.focus === 'function') first.focus();
}

function onBackdropClick(e) {
    if (e.target === panel) closeConfigPanel();
}

function closeConfigPanel() {
    if (!panel) return;
    panel.setAttribute('aria-hidden', 'true');
    closeTimer = setTimeout(() => {
        panel.style.display = 'none';
        closeTimer = null;
    }, 220);
    panel.removeEventListener('click', onBackdropClick);
    if (escHandler) {
        document.removeEventListener('keydown', escHandler);
        escHandler = null;
    }
}

function readForm() {
    const children = Array.from(rows.children);
    const updated = structuredClone(typeof loadConfig === 'function' ? loadConfig(CONFIG) : (window.CONFIG || {}));
    children.forEach(ch => {
        const key = ch.dataset.key;
        const controls = ch.querySelectorAll('input, textarea');
        const control = controls.length === 1 ? controls[0] : Array.from(controls).find(r => r.checked);
        if (!control) return;
        const type = control.dataset.type;
        let val;
        try {
            if (type === 'boolean') {
                val = control.checked;
            } else if (type === 'number') {
                val = control.value === '' ? null : Number(control.value);
            } else if (type === 'json') {
                const raw = control.value.trim();
                val = raw === '' ? null : JSON.parse(raw);
            } else {
                val = control.value;
            }
        } catch (e) {
            console.error('Error parseando campo', key, e);
            return;
        }
        updated[key] = val;
    });
    return updated;
}


settingsBtn.addEventListener('click', () => openConfigPanel());
saveBtn.addEventListener('click', () => {
    const updated = readForm();
    if (typeof saveConfig === 'function') {
        saveConfig(updated);
        if (typeof window !== 'undefined' && window.CONFIG !== undefined) {
            try { window.CONFIG = updated; } catch(e) { console.error('saveConfig error', e); }
        }
    } else {
        console.warn('saveConfig no está disponible');
    }
    closeConfigPanel();
    window.location.href = window.location.href;  // Force reload of page to apply new settings
});
cancelBtn.addEventListener('click', () => closeConfigPanel());
closeBtn.addEventListener('click', () => closeConfigPanel());
