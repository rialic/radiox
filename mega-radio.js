(() => {
    function MegaRadio() {
        this.megaRadioGroupList = Array.from(document.querySelectorAll('.mega-radio-group'));
        this.megaRadioInputList = document.querySelectorAll('input.mega-radio[type="radio"]');

        initMegaRadio();
        defineMegaRadioGroupEvent();
    }

    function initMegaRadio() {
        const generateMegaRadio = inputRadio => {
            const megaRadioGroupDiv = inputRadio.closest('.mega-radio-group');
            const inputRadioClassList = Array.from(inputRadio.classList);
            const megaRadioEl = makeElement('div', {'class': inputRadioClassList.join(' ')});
            const megaRadioTextEl = makeElement('div', {'class': 'mega-radio-text',});

            showMegaRadioIcon(inputRadio, megaRadioEl);
            checkInitMegaRadio(inputRadioClassList, inputRadio);
            showCheckIcon(megaRadioEl);
            showMegaRadio(megaRadioGroupDiv, megaRadioEl, megaRadioTextEl, inputRadio);
        }

        this.megaRadioInputList.forEach(generateMegaRadio);
    }

    const checkInitMegaRadio = (inputRadioClassList, inputRadio) => {
        const hasActiveMegaRadio = inputRadioClassList.includes('mega-radio--active');

        if (hasActiveMegaRadio) inputRadio.checked = true;
    }

    const showMegaRadioIcon = (inputRadio, megaRadioEl) => {
        const hasIcon = inputRadio.dataset.icon;

        if (hasIcon) {
            const megaRadioIconEl = makeElement('div', {'class': 'mega-radio-icon'});
            const iconEl = makeElement('i', {'class': inputRadio.dataset.icon});

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
        const generateMegaRadioGroupEvents = megaRadioGroup => megaRadioGroup.addEventListener('click', handleMegaRadioGroup);

        this.megaRadioGroupList.forEach(generateMegaRadioGroupEvents);
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

        megaRadioEl.classList.add('mega-radio--active');
        megaRadioInputEl.checked = true;

        showCheckIcon(megaRadioEl);
    }

    const unCheckMegaRadio = event => {
        const megaRadioGroupEl = event.target.closest('.mega-radio-group');
        const megaRadioEl = megaRadioGroupEl.querySelector('.mega-radio--active');
        const megaRadioCheckEl = megaRadioEl.querySelector('.mega-radio-check');
        const megaRadioInputEl = megaRadioEl.querySelector('input[type="radio"]');

        megaRadioCheckEl.remove();
        megaRadioEl.classList.remove('mega-radio--active');
        megaRadioInputEl.checked = false;
    }

    const showCheckIcon = megaRadioEl => {
        const megaRadioCheckEl = makeElement('div', {'class': 'mega-radio-check'});
        const checkIconEl = makeElement('div');

        const hasActiveMegaRadio = Array.from(megaRadioEl.classList).includes('mega-radio--active');

        if (hasActiveMegaRadio) {
            megaRadioEl.insertAdjacentElement('afterbegin', megaRadioCheckEl);
            megaRadioCheckEl.insertAdjacentElement('beforeend', checkIconEl);
        }
    }

    const makeElement = (elementName, attributes = {}) => {
        const isValidStringEl = typeof elementName === 'string' && Boolean(elementName);
        const isValidObjectAttr = typeof attributes === 'object' && Boolean(attributes);

        if (isValidStringEl && isValidObjectAttr) {
            const element = document.createElement(elementName);
            const attributeList = Object.entries(attributes);
            const defineElementAttr = ([key, value]) => element.setAttribute(key, value);

            attributeList.forEach(defineElementAttr);

            return element;
        }

        return;
    }

    return MegaRadio();
})();