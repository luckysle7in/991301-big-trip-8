import createElement from "./create-element.js";
import {getTimeFromTimestamp} from "./get-time-format.js";

// Class of Event
class EventFull {
  constructor(data) {
    this._type = data.type;
    this._city = data.city;
    this._pictures = data.pictures;
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

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  get element() {
    return this._element;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>

            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${this._type.icon}</label>

              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                  <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                  <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                  <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
                  <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                </div>

                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
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

            <label class="point__time">
              choose time
              <input class="point__input" type="text" value="${getTimeFromTimestamp(this._startDate)} — ${getTimeFromTimestamp(this._startDate + this._duration * 60 * 1000)}" name="time" placeholder="00:00 — 00:00">
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
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>

          <section class="point__details">

            ${this._offers.size ?
    `<section class="point__offers">
                <h3 class="point__details-title">offers</h3>
                <div class="point__offers-wrap">
                  ${Array.from(this._offers).map((offer) => {
    return `
                      <input class="point__offers-input visually-hidden" type="checkbox" id="${this._type.name}-${this._city}-${offer}" name="offer" value="add-luggage">
                      <label for="${this._type.name}-${this._city}-${offer}" class="point__offers-label">
                        <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">30</span>
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
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>
    `;
  }

  bind() {
    this._element.querySelector(`.point__button--save`).addEventListener(`click`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.point__button--save`).removeEventListener(`click`, this._onSubmitButtonClick.bind(this));
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

export {EventFull};
