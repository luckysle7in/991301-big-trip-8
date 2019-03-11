import {Event} from "./event.js";
import {EventFull} from "./event-full.js";


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
const getEventPictures = () => {
  const count = getRandomNumber(10, 5);
  let pictures = new Set();
  for (let i = 0; i < count; i++) {
    pictures.add(`http://picsum.photos/300/300?r=${Math.random()}`);
  }
  return pictures;
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
    pictures: getEventPictures(),
    offers: getEventOffer(),
    description: getEventDescription(),
    startDate: getStartDate(),
    duration: getEventDuration(),
    price: getEventPrice(),
  };
};

// Put a few tasks to the booard
export default (eventsNumber, container) => {
  // Remove everything from tasts board
  container.innerHTML = ``;

  // Generate a few events
  for (let i = 0; i < eventsNumber; i++) {
    // Generate new data for the task
    const eventData = getEventData();

    // Create classes for default and edit states
    const eventInstance = new Event(eventData);
    const eventFullInstance = new EventFull(eventData);

    // Add default state to the page
    container.appendChild(eventInstance.render());

    // 'Edit' event for the event card
    eventInstance.onEdit = () => {
      eventFullInstance.render();
      container.replaceChild(eventFullInstance.element, eventInstance.element);
      eventInstance.unrender();
    };

    // 'Submit' event for the event card
    eventFullInstance.onSubmit = () => {
      eventInstance.render();
      container.replaceChild(eventInstance.element, eventFullInstance.element);
      eventFullInstance.unrender();
    };
  }
};

export {getRandomNumber};
