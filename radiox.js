(function() {
  function Radiox() {
    return {
      radioxGroupList: Array.from(document.querySelectorAll('.radiox-group')),
      radioxInputList: document.querySelectorAll('input.radiox[type="radio"]'),
    }
  }

  Radiox.prototype.enable = function() {
    initRadioX.call(this)
    defineRadioXGroupEvent.call(this)
  }

  function initRadioX() {
    this.radioxInputList.forEach((inputRadio) => {
      const radioxGroupDiv = inputRadio.closest('.radiox-group')
      const inputRadioClasses = Array.from(inputRadio.classList)

      const radioxEl = createElement('div', {
        class: inputRadioClasses.join(' '),
      })

      const radioxTextEl = createElement('div', {
        class: 'radiox-text',
      })

      showRadioXIcon(inputRadio, radioxEl)
      checkInitRadioX(inputRadioClasses, inputRadio)
      showCheckIcon(radioxEl)
      showRadioX(radioxGroupDiv, radioxEl, radioxTextEl, inputRadio)
    })
  }

  function defineRadioXGroupEvent() {
    this.radioxGroupList.forEach((radioxGroup) => radioxGroup.addEventListener('click', handleRadioXGroup))
  }

  function checkInitRadioX(inputRadioClasses, inputRadio) {
    const hasActiveRadioX = inputRadioClasses.includes('radiox--active')

    if (hasActiveRadioX) inputRadio.checked = true
  }

  function showRadioXIcon(inputRadio, radioxEl) {
    const hasIcon = inputRadio.dataset.icon

    if (hasIcon) {
      const radioxIconEl = createElement('div', {
        class: 'radiox-icon',
      })

      const iconEl = createElement('i', {
        class: inputRadio.dataset.icon,
      })

      radioxEl.insertAdjacentElement('beforeend', radioxIconEl)
      radioxIconEl.insertAdjacentElement('beforeend', iconEl)
    }
  }

  function showRadioX(radioxGroupDiv, radioxEl, radioxTextEl, inputRadio) {
    const radioxtext = inputRadio.dataset.text
    const radioxUpperText = inputRadio.value.replace(inputRadio.value[0], inputRadio.value[0].toUpperCase())

    radioxTextEl.textContent = radioxtext || radioxUpperText

    radioxGroupDiv.insertAdjacentElement('beforeend', radioxEl)
    radioxEl.insertAdjacentElement('beforeend', radioxTextEl)
    radioxEl.insertAdjacentElement('beforeend', inputRadio)

    inputRadio.removeAttribute('class')
    inputRadio.removeAttribute('data-icon')
  }

  function handleRadioXGroup(event) {
    const isRadioXInputEl = event.target.tagName === 'INPUT'

    if (isRadioXInputEl) {
      unCheckRadioX(event)
      checkRadioX(event)
    }
  }

  function checkRadioX(event) {
    const radioxEl = event.target.parentElement
    const radioxInputEl = event.target

    radioxEl.classList.add('radiox--active')
    radioxInputEl.checked = true

    showCheckIcon(radioxEl)
  }

  function unCheckRadioX(event) {
    const radioxGroupEl = event.target.closest('.radiox-group')
    const radioxEl = radioxGroupEl.querySelector('.radiox--active')
    const radioxCheckEl = radioxEl.querySelector('.radiox-check')
    const radioxInputEl = radioxEl.querySelector('input[type="radio"]')

    radioxCheckEl.remove()
    radioxEl.classList.remove('radiox--active')
    radioxInputEl.checked = false
  }

  function showCheckIcon(radioxEl) {
    const radioxCheckEl = createElement('div', { class: 'radiox-check' })
    const checkIconEl = createElement('div', { class: 'radiox-check--icon' })
    const hasActiveRadioX = Array.from(radioxEl.classList).includes('radiox--active')

    if (hasActiveRadioX) {
      radioxEl.insertAdjacentElement('afterbegin', radioxCheckEl)
      radioxCheckEl.insertAdjacentElement('beforeend', checkIconEl)
    }
  }

  function createElement(elementName, attributes) {
    const element = document.createElement(elementName)

    Object.entries(attributes).forEach(([key, attribute]) => element.setAttribute(key, attribute))

    return element
  }

  return Object.setPrototypeOf({ ...Radiox()  }, Radiox.prototype).enable()
})()