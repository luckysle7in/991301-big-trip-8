import {Component} from "./component.js";
import {getTimeFromTimestamp, getTimeFromMinutes} from "./get-time-format.js";
import moment from "moment";

// Class of Event
class Event extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._picture = data.picture;
    this._offers = data.offers;
    this._description = data.description;
    this._startDate = data.startDate;
    this._finishDate = data.finishDate;
    this._price = data.price;
    this._isFavorite = data.isFavorite;
    this._isDeleted = data.isDeleted;

    this._element = null;
    this._onEdit = null;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
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
            ${getTimeFromTimestamp(this._finishDate)}
          </span>
          <span class="trip-point__duration">
            ${getTimeFromMinutes(moment(this._finishDate).diff(moment(this._startDate), `minutes`))}
          </span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
        ${Array.from(this._offers).map((offer) => {
    return `
            <li>
              <button class="trip-point__offer">${offer.name} + €${offer.price} ${offer.isSelected ? ` ✓` : ``}</button>
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

  update(data) {
    this._type = data.type;
    this._city = data.city;
    this._pictures = data.pictures;
    this._offers = data.offers;
    this._description = data.description;
    this._startDate = data.startDate;
    this._finishDate = data.finishDate;
    this._price = data.price;
    this._isFavorite = data.isFavorite;
    this._isDeleted = data.isDeleted;

  }

}

export {Event};
