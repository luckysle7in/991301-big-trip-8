// Get random number from 0 to MAX
const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// All types of events
const eventTypes = [
  {name: `Taxi`, icon: `🚕`},
  {name: `Bus`, icon: `🚌`},
  {name: `Train`, icon: `🚂`},
  {name: `Ship`, icon: `🛳️`},
  {name: `Transport`, icon: `🚊`},
  {name: `Drive`, icon: `🚗`},
  {name: `Flight`, icon: `✈️`},
  {name: `Check-in`, icon: `🏨`},
  {name: `Sightseeing`, icon: `🏛️`},
  {name: `Restaurant`, icon: `🍴`},
];

// Get random event type
const getTaskType = () => {
  return eventTypes[getRandomNumber(eventTypes.length)];
};

// All cities
const eventCities = [
  `Amsterdam`,
  `Rome`,
  `Barcelona`,
  `Milan`,
  `Paris`,
];

// Get ramdom citi
const getEventCity = () => {
  return eventCities[getRandomNumber(eventCities.length)];
};

// Get random event picture
const getEventPicture = () => {
  return `http://picsum.photos/100/100?r=${Math.random()}`;
};

// All offer variants
const eventOffers = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
];

// Get up to 2 random offers
const getEventOffer = () => {
  const count = getRandomNumber(3);
  let offers = new Set();
  for (let i = 0; i < count; i++) {
    offers.add(eventOffers[getRandomNumber(eventOffers.length)]);
  }
  return offers;
};

// All sentenses for description
const eventDescriptionParts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

// Get 1–3 random sentenses
const getEventDescription = () => {
  const count = getRandomNumber(4, 1);
  let description = new Set();
  for (let i = 0; i < count; i++) {
    description.add(eventDescriptionParts[getRandomNumber(eventDescriptionParts.length)]);
  }
  const descriptionArray = Array.from(description);
  return descriptionArray.join(` `);
};

// Get random date + 2 weeks from now
const getStartDate = () => {
  return Math.floor(Date.now() / 600000) * 600000 + Math.floor(Math.random() * 14 * 24 * 60 / 10) * 10 * 60 * 1000;
};

// Get random event duration
const getEventDuration = () => {
  return Math.floor(getRandomNumber(180, 20) / 5) * 5;
};

// Get random event price
const getEventPrice = () => {
  return Math.floor(getRandomNumber(500, 5) / 5) * 5;
};

// Get new object for task
const getEventData = () => {
  return {
    type: getTaskType(),
    city: getEventCity(),
    picture: getEventPicture(),
    offers: getEventOffer(),
    description: getEventDescription(),
    startDate: getStartDate(),
    duration: getEventDuration(),
    price: getEventPrice(),
  };
};

// Get code of offers
const getOffersCode = (offers) => {
  let offersCode = `<ul class="trip-point__offers">`;
  offers.forEach((offer) => {
    offersCode += `
      <li>
        <button class="trip-point__offer">${offer}</button>
      </li>
    `;
  });
  offersCode += `</ul>`;
  return offersCode;
};

// Transform time format from 4:5 to 04:05
const padZero = (n) => {
  if (n < 10) {
    return `0${n}`;
  }
  return n;
};

// Get code for the list of the events
const getEventsCode = (eventsData) => {
  let eventsDataCode = ``;
  eventsData.forEach((event) => {
    eventsDataCode += `
      <article class="trip-point">
        <i class="trip-icon">${event.type.icon}</i>
        <h3 class="trip-point__title">${event.type.name} to ${event.city}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">
            ${padZero(new Date(event.startDate).getHours())}:${padZero(new Date(event.startDate).getMinutes())}
            &nbsp;&mdash;
            ${padZero(new Date(event.startDate + event.duration * 60 * 1000).getHours())}:${padZero(new Date(event.startDate + event.duration * 60 * 1000).getMinutes())}
          </span>
          <span class="trip-point__duration">
            ${Math.floor(event.duration / 60) ? `${Math.floor(event.duration / 60)}h` : ``}
            ${event.duration % 60 ? `${event.duration % 60}m` : ``}
          </span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${event.price}</p>
        ${getOffersCode(event.offers)}
      </article>
    `;
  });
  return eventsDataCode;
};

// Get code for the list of the events
export default (eventsCount) => {
  let eventsData = [];
  for (let i = 0; i < eventsCount; i++) {
    eventsData.push(getEventData());
  }
  return getEventsCode(eventsData);
};
