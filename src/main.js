import getFiltersCode from "./get-filter.js";
import getEventsCode, {getRandomNumber} from "./get-event.js";

const filtersNode = document.getElementById(`trip-filter`);
const eventsNode = document.getElementById(`trip-day__items`);

// Get code for filters
filtersNode.innerHTML = getFiltersCode();

// Get code for the initial list of events
getEventsCode(7, eventsNode);

filtersNode.addEventListener(`click`, (event) => {
  let target = event.target;
  while (target !== filtersNode) {
    if (target.tagName === `LABEL`) {
      getEventsCode(getRandomNumber(9, 1), eventsNode);
    }
    target = target.parentNode;
  }
});
