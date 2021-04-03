(() => {
    function MegaRadio() {
        this.megaRadioGroupList = Array.from(document.querySelectorAll('.mega-group'));
        this.megaRadioInputList = document.querySelectorAll('input.mega-radio[type="radio"]');

        initMegaRadio();
        defineMegaRadioGroupEvent();
    }

    function initMegaRadio() {
        this.megaRadioInputList.forEach(inputRadio => {
            const megaRadioGroupDiv = inputRadio.closest('.mega-group');
            const inputRadioClasses = Array.from(inputRadio.classList);

            const megaRadioEl = createElement('div', {
                'class': inputRadioClasses.join(' ')
            });

            const megaRadioTextEl = createElement('div', {
                'class': 'mega-text',
            });

            showMegaRadioIcon(inputRadio, megaRadioEl);
            checkInitMegaRadio(inputRadioClasses, inputRadio);
            showCheckIcon(megaRadioEl);
            showMegaRadio(megaRadioGroupDiv, megaRadioEl, megaRadioTextEl, inputRadio);
        });
    }

    const checkInitMegaRadio = (inputRadioClasses, inputRadio) => {
        const hasActiveMegaRadio = inputRadioClasses.includes('-mega-active');

        if (hasActiveMegaRadio) inputRadio.checked = true;
    }

    const showMegaRadioIcon = (inputRadio, megaRadioEl) => {
        const hasIcon = inputRadio.dataset.icon;

        if (hasIcon) {
            const megaRadioIconEl = createElement('div', {
                'class': 'mega-icon'
            });

            const iconEl = createElement('i', {
                'class': inputRadio.dataset.icon
            });

            megaRadioEl.insertAdjacentElement('beforeend', megaRadioIconEl)
            megaRadioIconEl.insertAdjacentElement('beforeend', iconEl);
        }
    }

    const showMegaRadio = (megaRadioGroupDiv, megaRadioEl, megaRadioTextEl, inputRadio) => {
        const megaRadiotext = inputRadio.dataset.text;
        const megaRadioUpperText = inputRadio.value.replace(inputRadio.value[0], inputRadio.value[0].toUpperCase());

        megaRadioTextEl.textContent = megaRadiotext || megaRadioUpperText

        megaRadioGroupDiv.insertAdjacentElement('beforeend', megaRadioEl);
        megaRadioEl.insertAdjacentElement('beforeend', megaRadioTextEl);
        megaRadioEl.insertAdjacentElement('beforeend', inputRadio);

        inputRadio.removeAttribute('class');
        inputRadio.removeAttribute('data-icon');
    }

    const defineMegaRadioGroupEvent = () => {
        this.megaRadioGroupList.forEach(megaRadioGroup => megaRadioGroup.addEventListener('click', handleMegaRadioGroup));
    }

    const handleMegaRadioGroup = event => {
        const isMegaRadioInputEl = event.target.tagName === 'INPUT';
        
        if (isMegaRadioInputEl) {
            unCheckMegaRadio(event);
            checkMegaRadio(event);
        }
    }

    const checkMegaRadio = event => {
        const megaRadioEl = event.target.parentElement;
        const megaRadioInputEl = event.target;

        megaRadioEl.classList.add('-mega-active');
        megaRadioInputEl.checked = true;

        showCheckIcon(megaRadioEl);
    }

    const unCheckMegaRadio = event => {
        const megaRadioGroupEl = event.target.closest('.mega-group');
        const megaRadioEl = megaRadioGroupEl.querySelector('.-mega-active');
        const megaRadioCheckEl = megaRadioEl.querySelector('.mega-check');
        const megaRadioInputEl = megaRadioEl.querySelector('input[type="radio"]');

        megaRadioCheckEl.remove();
        megaRadioEl.classList.remove('-mega-active');
        megaRadioInputEl.checked = false;
    }

    const showCheckIcon = megaRadioEl => {
        const megaRadioCheckEl = createElement('div', {'class': 'mega-check'});
        const checkIconEl = createElement('div', {'class': 'mega-check-icon'});

        const hasActiveMegaRadio = Array.from(megaRadioEl.classList).includes('-mega-active');

        if (hasActiveMegaRadio) {
            megaRadioEl.insertAdjacentElement('afterbegin', megaRadioCheckEl);
            megaRadioCheckEl.insertAdjacentElement('beforeend', checkIconEl);
        }
    }

    const createElement = (elementName, attributes) => {
        const element = document.createElement(elementName);

        Object.entries(attributes).forEach(([key, attribute]) => {
            element.setAttribute(key, attribute);
        });

        return element;
    }

    return MegaRadio();
})();