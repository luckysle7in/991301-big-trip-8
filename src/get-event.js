import {Event} from "./event.js";
import {EventFull} from "./event-full.js";
import moment from "moment";


// Get random number from 0 to MAX
const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Get random boolean
const getRandomBoolean = () => {
  const variants = [true, false];
  return variants[getRandomNumber(2)];
};


// All types of events
const eventTypes = [
  {name: `taxi`, icon: `🚕`},
  {name: `bus`, icon: `🚌`},
  {name: `train`, icon: `🚂`},
  // {name: `Ship`, icon: `🛳️`},
  // {name: `Transport`, icon: `🚊`},
  // {name: `Drive`, icon: `🚗`},
  {name: `flight`, icon: `✈️`},
  {name: `check-in`, icon: `🏨`},
  {name: `sight-seeing`, icon: `🏛️`},
  // {name: `Restaurant`, icon: `🍴`},
];

// Get random event type
const getTaskType = () => {
  return JSON.parse(JSON.stringify(eventTypes[getRandomNumber(eventTypes.length)]));
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
    const newOffer = eventOffers[getRandomNumber(eventOffers.length)];
    if (!Array.from(offers).filter((element) => element.name === newOffer).length) {
      offers.add({
        name: newOffer,
        price: getRandomNumber(1, 5) * 5,
        isSelected: getRandomBoolean(),
      });
    }
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
  return moment()
    .add(getRandomNumber(14), `days`)
    .hours(getRandomNumber(20, 8))
    .minutes(getRandomNumber(5) * 10)
    .seconds(0)
    .toDate();
};

// Get finish date: + up to 6 hours
const getFinishDate = (startDate) => {
  return moment(startDate)
    .add(getRandomNumber(5, 1), `hours`)
    .add(getRandomNumber(5) * 10, `minutes`)
    .toDate();
};

// Get random event price
const getEventPrice = () => {
  return Math.floor(getRandomNumber(500, 5) / 5) * 5;
};

// Get new object for task
const getEventData = () => {
  const eventStartDate = getStartDate();
  const eventFinishDate = getFinishDate(eventStartDate);
  return {
    type: getTaskType(),
    city: getEventCity(),
    pictures: getEventPictures(),
    offers: getEventOffer(),
    description: getEventDescription(),
    startDate: eventStartDate,
    finishDate: eventFinishDate,
    price: getEventPrice(),
    isFavorite: getRandomBoolean(),
    isDeleted: false,
  };
};

// Get array of objects for all events
const getAllEventsData = (count) => {
  const allEventsData = [];
  for (let i = 0; i < count; i++) {
    allEventsData.push(getEventData());
  }
  return allEventsData;
};

// Put a few tasks to the booard
export default (eventsData, container) => {
  // Remove everything from tasts board
  container.innerHTML = ``;

  // Generate a few events
  for (let i = 0; i < eventsData.length; i++) {

    // Generate new data for the task
    const eventData = eventsData[i];

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

    // Changing event type
    eventFullInstance.onChangeEventType = (newEventType) => {
      eventData.type.name = newEventType;
      eventData.type.icon = eventTypes.find((element) => element.name === newEventType).icon;
      eventInstance.update(eventData);
      eventFullInstance.update(eventData);
    };

    // Changing favourite type
    eventFullInstance.onChangeFavorite = (isFavorite) => {
      eventData.isFavorite = isFavorite;
      eventInstance.update(eventData);
      eventFullInstance.update(eventData);
    };

    // 'Submit' event for the full event card
    eventFullInstance.onSubmit = (newObject) => {
      eventData.type.name = newObject.type;
      eventData.type.icon = eventTypes.find((element) => element.name === newObject.type).icon;
      eventData.city = newObject.city;
      eventData.offers.forEach(function (eventElement) {
        eventElement.isSelected = (newObject.offers.find((element) => element === eventElement.name)) ? true : false;
      });
      eventData.startDate = newObject.startDate;
      eventData.finishDate = newObject.finishDate;
      eventData.price = newObject.price;

      // Updating events
      eventInstance.update(eventData);
      eventInstance.render();
      container.replaceChild(eventInstance.element, eventFullInstance.element);
      eventFullInstance.update(eventData);
      eventFullInstance.unrender();
    };

    // Deleting an event
    eventFullInstance.onDelete = () => {
      eventData.isDeleted = true;
      container.removeChild(eventFullInstance.element);
      eventFullInstance.unrender();
    };

  }
};

export {getRandomNumber, getAllEventsData};
