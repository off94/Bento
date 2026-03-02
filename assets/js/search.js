(function () {
    const form = document.querySelector('form[action="https://www.google.com/search"]');
    if (!form) return;
    const input = form.querySelector('input[name="q"]');
    if (!input) return;

    // Asegura la clase base (oculto)
    input.classList.add('search-input');

    // Muestra el input y opcionalmente inserta la tecla inicial si es imprimible
    function showInput(initialKey) {
        if (!input.classList.contains('visible')) {
            input.classList.add('visible');
        }
        input.focus();
        if (initialKey && initialKey.length === 1) {
            // Si había texto previo, lo preservamos; aquí se coloca el caracter al inicio
            input.value = initialKey;
            // dispara evento input si necesitas listeners
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    // Oculta y limpia si está vacío
    function hideIfEmpty() {
        if (input.value.trim() === '') {
            input.classList.remove('visible');
            input.value = '';
            input.blur();
        }
    }
    function hide() {
        input.classList.remove('visible');
        input.value = '';
        input.blur();
    }

    // Evento global: muestra al teclear fuera del propio input
    document.addEventListener('keydown', (e) => {
        // no interferir cuando ya se está escribiendo en el input
        if (document.activeElement === input) return;
        // ignorar combinaciones con modificadores
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        const key = e.key;
        // mostrar ante teclas imprimibles y espacio; también ante Enter
        if (key.length === 1 || key === 'Enter' || key === 'Backspace') {
            showInput(key.length === 1 ? key : undefined);
            // prevenir que la tecla afecte a la página si insertamos el carácter
            if (key.length === 1) e.preventDefault();
        }
    });

    // Si el usuario borra todo, ocultar
    input.addEventListener('input', () => {
        if (input.value === '') {
            // pequeña demora opcional para evitar parpadeo al seleccionar/pegar
            requestAnimationFrame(hideIfEmpty);
        }
    });

    // Escape para cerrar y limpiar
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            input.value = '';
            input.classList.remove('visible');
            input.blur();
        }
    });

    // Al perder foco, si está vacío se oculta
    input.addEventListener('blur', () => {
        hide();
    });
})();