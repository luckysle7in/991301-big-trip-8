import flatpickr from "flatpickr";
import {Component} from "./component.js";
import {getTimeFromTimestamp} from "./get-time-format.js";
import moment from "moment";

// Class of Event
class EventFull extends Component {
  constructor(data) {
    super();
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

    this._element = null;
    this._onSubmit = null;
    this._onChangeEventType = null;
    this._onChangeFavorite = null;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeEventTypeClick = this._onChangeEventTypeClick.bind(this);
    this._onChangeFavoriteClick = this._onChangeFavoriteClick.bind(this);
  }


  _processForm(formData) {
    const eventData = {
      type: ``,
      city: ``,
      offers: [],
      startDate: new Date(0),
      finishDate: new Date(0),
      price: 0,
    };

    for (const pair of formData.entries()) {
      const [fieldName, fieldValue] = pair;

      switch (fieldName) {

        case `travel-way`:
          eventData.type = fieldValue;
          break;

        case `destination`:
          eventData.city = fieldValue;
          break;

        case `day`:
          if (fieldValue) {
            const fieldValueMoment = moment(fieldValue);
            eventData.startDate.setDate(fieldValueMoment.date());
            eventData.startDate.setMonth(fieldValueMoment.month());
            eventData.startDate.setYear(moment().year());
            eventData.finishDate.setDate(fieldValueMoment.date());
            eventData.finishDate.setMonth(fieldValueMoment.month());
            eventData.finishDate.setYear(moment().year());
          } else {
            const valueStartDate = moment(this._startDate);
            eventData.startDate.setDate(valueStartDate.date());
            eventData.startDate.setMonth(valueStartDate.month());
            eventData.startDate.setYear(moment().year());
            const valueFinishDate = moment(this._finishDate);
            eventData.finishDate.setDate(valueFinishDate.date());
            eventData.finishDate.setMonth(valueFinishDate.month());
            eventData.finishDate.setYear(moment().year());
          }
          break;

        case `time`:
          if (fieldValue.length === 13) {
            const dateRange = fieldValue.split(` — `);
            const timeOfStartDate = dateRange[0].split(`:`);
            eventData.startDate.setHours(timeOfStartDate[0]);
            eventData.startDate.setMinutes(timeOfStartDate[1]);
            const timeOfFinishDate = dateRange[1].split(`:`);
            eventData.finishDate.setHours(timeOfFinishDate[0]);
            eventData.finishDate.setMinutes(timeOfFinishDate[1]);
          } else {
            const valueStartDate = moment(this._startDate);
            eventData.startDate.setHours(valueStartDate.hours());
            eventData.startDate.setMinutes(valueStartDate.minutes());
            const valueFinishDate = moment(this._finishDate);
            eventData.finishDate.setHours(valueFinishDate.hours());
            eventData.finishDate.setMinutes(valueFinishDate.minutes());
          }
          break;

        case `price`:
          eventData.price = fieldValue;
          break;

        case `offer`:
          eventData.offers.push(fieldValue);
          break;
      }
    }

    return eventData;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.event__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
  }

  _onDeleteButtonClick() {
    this._isDeleted = true;
    this.unbind();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onChangeEventTypeClick(evt) {
    this._type.name = evt.target.value;
    this.unbind();
    if (typeof this._onChangeEventType === `function`) {
      this._onChangeEventType(this._type.name);
    }
    this._partialUpdate();
    this.bind();
  }

  _onChangeFavoriteClick() {
    this._isFavorite = !this._isFavorite;
    this.unbind();
    if (typeof this._onChangeFavorite === `function`) {
      this._onChangeFavorite(this._isFavorite);
    }
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onChangeEventType(fn) {
    this._onChangeEventType = fn;
  }

  set onChangeFavorite(fn) {
    this._onChangeFavorite = fn;
  }

  get template() {
    let totalPrice = Number(this._price);
    return `
      <article class="point">
        <form class="event__form" action="" method="get">
          <header class="point__header">

            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${this._type.icon}</label>

              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" ${(this._type.name === `taxi`) ? `checked` : `` }>
                  <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus" ${(this._type.name === `bus`) ? `checked` : `` }>
                  <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${(this._type.name === `train`) ? `checked` : `` }>
                  <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight" ${(this._type.name === `flight`) ? `checked` : `` }>
                  <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                </div>

                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in" ${(this._type.name === `check-in`) ? `checked` : `` }>
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing" ${(this._type.name === `sight-seeing`) ? `checked` : `` }>
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                </div>
              </div>
            </div>

            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._type.name} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
              <datalist id="destination-select">
                <option value="airport"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="hotel"></option>
              </datalist>
            </div>

            <label class="point__date">
              choose day
              <input
                class="point__input"
                type="text"
                placeholder="MAR 18"
                name="day"
                value="${moment(this._finishDate).format(`D MMMM`)}"
              >
            </label>

            <label class="point__time">
              choose time
              <input
                class="point__form_time_range point__input"
                type="text"
                value="${getTimeFromTimestamp(this._startDate)} — ${getTimeFromTimestamp(this._finishDate)}"
                name="time"
                placeholder="00:00 — 00:00"
              >
            </label>

            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>

            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>

            <div class="paint__favorite-wrap">
              <input
                type="checkbox"
                class="point__favorite-input visually-hidden"
                id="favorite"
                name="favorite"
                ${this._isFavorite ? `checked` : ``}
              >
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>

          <section class="point__details">

            ${this._offers.size ?
    `<section class="point__offers">
                <h3 class="point__details-title">offers</h3>
                <div class="point__offers-wrap">
                  ${Array.from(this._offers).map((offer) => {
    if (offer.isSelected) {
      totalPrice += offer.price;
    }
    return `
                      <input
                        class="point__offers-input visually-hidden"
                        type="checkbox"
                        id="${this._type.name}-${this._city}-${offer.name}"
                        name="offer"
                        value="${offer.name}"
                        ${offer.isSelected ? `checked` : ``}
                      >
                      <label for="${this._type.name}-${this._city}-${offer.name}" class="point__offers-label">
                        <span class="point__offer-service">${offer.name}</span>
                         + €<span class="point__offer-price">${offer.price}</span>
                      </label>
                    `;
  }).join(``)}
                </div>
              </section>`
    : ``}

            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              <div class="point__destination-images">
                ${Array.from(this._pictures).map((picture) => {
    return `
                    <img src="${picture}" alt="picture from place" class="point__destination-image">
                  `;
  }).join(``)}
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="${totalPrice}">
          </section>
        </form>
      </article>
    `;
  }

  bind() {
    this._element.querySelector(`.event__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`button[type="reset"]`)
      .addEventListener(`click`, this._onDeleteButtonClick.bind(this));
    this._element.querySelector(`input[name="favorite"]`)
      .addEventListener(`change`, this._onChangeFavoriteClick.bind(this));
    Array.from(this._element.querySelectorAll(`input[name="travel-way"]`), (element) => {
      element.addEventListener(`change`, this._onChangeEventTypeClick.bind(this));
    });
    flatpickr(this._element.querySelector(`.point__input`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
  }

  unbind() {
    this._element.querySelector(`.event__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`button[type="reset"]`)
      .removeEventListener(`click`, this._onDeleteButtonClick.bind(this));
    this._element.querySelector(`input[name="favorite"]`)
      .removeEventListener(`change`, this._onChangeFavoriteClick.bind(this));
    Array.from(this._element.querySelectorAll(`input[name="travel-way"]`), (element) => {
      element.removeEventListener(`change`, this._onChangeEventTypeClick.bind(this));
    });
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

export {EventFull};
