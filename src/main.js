import getFilter from "./get-filter.js";
import getEvent from "./get-event.js";

const filtersNode = document.getElementById(`trip-filter`);
const eventsNode = document.getElementById(`trip-day__items`);

// Array with content for filters
const filters = [
  { name: `Everything`, isChecked: true },
  { name: `Future`, isChecked: false },
  { name: `Past`, isChecked: false }
];

// Get code for the list of the filters
let filtersCode = ``;
filters.forEach((filter, i) => {
  filtersCode += getFilter(filter.name, filter.isChecked);
});
filtersNode.innerHTML = filtersCode;

// Get code for the list of the events
const getEventCode = (number) => {
  let eventsCode = ``;
  for (let i = 0; i < number; i++) {
    eventsCode += getEvent();
  }
  return eventsCode;
}
eventsNode.innerHTML = getEventCode(7);

// Show new events, if a filter has changes. Number of the events is taken from filter that has chosen
const filtersLinks = filtersNode.getElementsByClassName(`trip-filter__item`);
for (let filtersLink of filtersLinks) {
  // Click event for each filter
  filtersLink.addEventListener(`click`, (event) => {
    eventsNode.innerHTML = getEventCode(Math.floor(Math.random() * 9 + 1));
  });
}
