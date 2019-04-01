import {Component} from "./component.js";

class Filter extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._isChecked = data.isChecked;

    this._onFilter = null;
  }

  _onFilterClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter(this._title);
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    const titleLowerCase = this._title;
    return `
      <input type="radio" id="filter-${titleLowerCase}" name="filter" value="${titleLowerCase}" ${this._isChecked ? `checked` : ``}>
      <label class="trip-filter__item" for="filter-${titleLowerCase}">${this._title}</label>
    `.trim();
  }

  bind() {
    Array.from(this._element.querySelectorAll(`input[name="filter"]`), (element) => {
      element.addEventListener(`change`, this._onFilterClick.bind(this));
    });
  }

  unbind() {
    Array.from(this._element.querySelectorAll(`input[name="filter"]`), (element) => {
      element.removeEventListener(`change`, this._onFilterClick.bind(this));
    });
  }

}

export {Filter};
