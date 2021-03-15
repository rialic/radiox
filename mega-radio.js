var MegaRadio = MegaRadio || {};

MegaRadio.MegaRadio = (() => {
    function MegaRadio() {
        this.megaRadioGroupList = Array.from(document.querySelectorAll('.mega-radio-group'));
        this.megaRadioList = document.querySelectorAll('input.mega-radio[type="radio"]');

        MegaRadio.prototype.enable = () => {
            contructMegaRadio.call(this);

            handleMegaRadioGroup.call(this);
        };
    }

    function contructMegaRadio() {
        this.megaRadioList.forEach(inputRadio => {
            const megaRadioGroupDiv = inputRadio.closest('.mega-radio-group');
            const inputRadioClasses = Array.from(inputRadio.classList);
            const megaRadioDiv = document.createElement('div');
            const megaRadioTextDiv = document.createElement('div');
            const megaRadioIconDiv = document.createElement('div');
            const icon = document.createElement('i');
            const hasActiveMegaRadio = inputRadioClasses.includes('mega-active');
            const hasText = inputRadio.dataset.text;
            const hasIcon = inputRadio.dataset.icon;

            megaRadioDiv.classList.add(...inputRadioClasses);
            megaRadioTextDiv.classList.add('mega-text');
            megaRadioTextDiv.textContent = hasText || inputRadio.value.replace(inputRadio.value[0], inputRadio.value[0].toUpperCase());
            
            if(hasIcon) {
                megaRadioIconDiv.classList.add('mega-icon');
                icon.classList.add(...inputRadio.dataset.icon.split(' '));

                megaRadioDiv.insertAdjacentElement('beforeend', megaRadioIconDiv)
                megaRadioIconDiv.insertAdjacentElement('beforeend', icon);
            }
            
            megaRadioGroupDiv.insertAdjacentElement('beforeend', megaRadioDiv);
            megaRadioDiv.insertAdjacentElement('beforeend', megaRadioTextDiv);
            megaRadioDiv.insertAdjacentElement('beforeend', inputRadio);

            if (hasActiveMegaRadio) {
                inputRadio.checked = true;
            }

            inputRadio.removeAttribute('class');
            inputRadio.removeAttribute('data-icon');
        });
    }

    function handleMegaRadioGroup() {
        this.megaRadioGroupList.forEach(megaRadioGroup => megaRadioGroup.addEventListener('click', checkMegaRadio.bind(this, megaRadioGroup)));
    }

    function checkMegaRadio(megaRadioGroup, event) {
        const element = event.target;
        const isMegaRadio = element.tagName === 'INPUT';

        if (isMegaRadio) {
            const megaRadioList = Array.from(megaRadioGroup.children);

            megaRadioList.forEach(megaRadio => {
                const inputRadio = megaRadio.querySelector('input[type="radio"]');

                megaRadio.classList.remove('mega-active');
                inputRadio.checked = false;

                if (inputRadio.value === element.value) {
                    megaRadio.classList.add('mega-active');
                    inputRadio.checked = true;
                }
            });
        }
    }

    return MegaRadio;
})();

document.addEventListener('DOMContentLoaded', () => (new MegaRadio.MegaRadio()).enable());