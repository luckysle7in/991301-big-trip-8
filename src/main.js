import getFiltersCode from "./get-filter.js";
import renderEvents, {getAllEventsData} from "./get-event.js";

const filtersNode = document.getElementById(`trip-filter`);
const eventsNode = document.getElementById(`trip-day__items`);

// Render filters to the page
filtersNode.innerHTML = getFiltersCode();

// Render events to the page
const eventsData = getAllEventsData(7);
renderEvents(eventsData, eventsNode);
