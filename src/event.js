import createElement from "./create-element.js";
import {getTimeFromTimestamp, getTimeFromMinutes} from "./get-time-format.js";

// Class of Event
class Event {
  constructor(data) {
    this._type = data.type;
    this._city = data.city;
    this._picture = data.picture;
    this._offers = data.offers;
    this._description = data.description;
    this._startDate = data.startDate;
    this._duration = data.duration;
    this._price = data.price;

    this._element = null;
    this._state = {
      isFull: false
    };
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${this._type.icon}</i>
        <h3 class="trip-point__title">${this._type.name} to ${this._city}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">
            ${getTimeFromTimestamp(this._startDate)}
            &nbsp;&mdash;
            ${getTimeFromTimestamp(this._startDate + this._duration * 60 * 1000)}
          </span>
          <span class="trip-point__duration">
            ${getTimeFromMinutes(this._duration)}
          </span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
        ${Array.from(this._offers).map((offer) => {
    return `
            <li>
              <button class="trip-point__offer">${offer}</button>
            </li>
          `;
  }).join(``)}
        </ul>
      </article>
    `;
  }

  bind() {
    this._element.querySelector(`.trip-point`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.trip-point`).removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

export {Event};
