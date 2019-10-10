class Select {
  constructor({ selector, label, url, onSelect }) {
    this.selector = selector;
    this.label = label;
    this.url = url;
    this.onSelect = onSelect;
  }

  initSelect() {
    const s = document.createElement('div');
    s.className = "g-select";
    const container = document.querySelector(this.selector);
    const dropdown = document.createElement('div');
    const carret = document.createElement('div');
    dropdown.classList.add('g-dropdown');
    carret.classList.add('g-carret');
    const option = document.createElement('div');
    const option1 = document.createElement('div');
    const option2 = document.createElement('div');
    const option3 = document.createElement('div');
    option.innerHTML = 'first';
    option.classList.add('g-option');
    option1.innerHTML = 'second';
    option1.classList.add('g-option');
    option2.innerHTML = 'third';
    option2.classList.add('g-option');
    option3.innerHTML = 'fourth';
    option3.classList.add('g-option');
    dropdown.append(option);
    dropdown.append(option1);
    dropdown.append(option2);
    dropdown.append(option3);
    s.append(carret);
    s.append(dropdown);
    container.append(s);
    console.log(s);
    console.log(option);
  }

  destroy() {
    const container = document.querySelector(this.selector);
    container.remove();
    console.log('destroy');
  }

  open() {
    console.log('open')
  }

  close() {
    console.log('close')
  }
}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  onSelect(selectedItem) {}
})

const init = () => {
  select.initSelect();
  const actions = document.getElementById('actions');
  console.log(actions);
}

init();

// setTimeout(() => {
//   select.destroy();
// }, 2000);