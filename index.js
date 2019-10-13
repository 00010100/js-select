class Select {
  constructor({ selector, label, url, onSelect }) {
    this.selector = document.querySelector(selector)
    this.label = label
    this.url = url
    this.onSelect = onSelect
    this.dropdown = null
    this.labelItem = null
    this.options = null
  }

  addListeners() {
    document.addEventListener('click', (e) => {
      if (this.dropdown.classList.contains('is-open')) {
        this.dropdown.classList.remove('is-open')
      } else {
        this.dropdown.classList.add('is-open')
      }

      if (e.target.closest('#select')) return
      this.dropdown.classList.remove('is-open')
    })
  }

  addDropdown() {
    this.dropdown = document.createElement('div')
    this.dropdown.classList.add('g-dropdown')
  }

  async getOptions() {
    try {
      return await fetch(this.url).then((data) => data.json());
    } catch (e) {
      throw e
    }
  }

  removeActive() {
    this.optionsItem.forEach((option) => option.classList.remove('is-active'))
  }

  async setOptions() {
    this.options = await this.getOptions();
    const optionsItem = [];

    for (let [key, {label}] of Object.entries(this.options)) {
      const option = document.createElement('div')
      option.classList.add('g-option')
      option.innerHTML = label
      option.id = key
      optionsItem.push(option)
      option.addEventListener('click', (e) => {
        this.labelItem.innerHTML = option.innerHTML
        this.labelItem.id = option.id
        this.removeActive()
        option.classList.add('is-active')
      })

      this.dropdown.append(option)
    }
    this.optionsItem = optionsItem
  }

  initSelect() {
    const s = document.createElement('div')
    s.className = "g-select"
    const carret = document.createElement('div')
    this.labelItem = document.createElement('div')

    this.labelItem.classList.add('g-label')
    this.labelItem.innerHTML = this.label

    carret.classList.add('g-carret')
    s.append(carret)
    s.append(this.labelItem)

    this.addDropdown()
    this.setOptions()
    s.append(this.dropdown)
    this.selector.append(s)

    this.addListeners()
  }

  open() {
    this.dropdown.classList.add('is-open')
  }

  close() {
    this.dropdown.classList.remove('is-open')
  }

  set() {
    this.optionsItem.forEach((option, index) => {
      if (index === 5) {
        this.labelItem.innerHTML = option.innerHTML
        this.labelItem.id = option.id
        this.removeActive()
        option.classList.add('is-active')
      }
    })
  }

  get() {
    const {innerHTML, id} = this.labelItem
    if (!id) {
      alert('Empty label value')
    } else {
      alert(JSON.stringify({id, value: innerHTML}))
    }
  }

  clear() {
    if (!this.labelItem.hasAttribute('id')) return
    this.labelItem.innerHTML = this.label
    this.labelItem.removeAttribute('id')
    this.removeActive()
  }

  destroy() {
    this.selector.remove()
  }
}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  onSelect(selectedItem) {}
})

const init = () => {
  select.initSelect()
  const actions = document.querySelectorAll('#actions button')

  actions.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation()
      const {type} = e.target.dataset

      switch (type) {
        case 'open':
          select.open()
          break
        case 'close':
          select.close()
          break
        case 'set':
          select.set()
          break
        case 'get':
          select.get()
          break
        case 'clear':
          select.clear()
          break
        case 'destroy':
          select.destroy()
          break
      }
    })
  })
}

init()
