import getFiltersCode from "./get-filter.js";
import getEventsCode from "./get-event.js";

const filtersNode = document.getElementById(`trip-filter`);
const eventsNode = document.getElementById(`trip-day__items`);

// Get code for filters
filtersNode.innerHTML = getFiltersCode();

// Get code for the initial list of events
eventsNode.innerHTML = getEventsCode(7);

// Show new events, if a filter has changes. Number of the events is taken from filter that has chosen
const filtersLinks = filtersNode.getElementsByClassName(`trip-filter__item`);
for (let filtersLink of filtersLinks) {
  // Click event for each filter
  filtersLink.addEventListener(`click`, () => {
    eventsNode.innerHTML = getEventsCode(Math.floor(Math.random() * 9 + 1));
  });
}
