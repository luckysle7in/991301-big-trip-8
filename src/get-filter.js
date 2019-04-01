import {Filter} from "./filter.js";
import renderEvents from "./get-event.js";

const eventsNode = document.getElementById(`trip-day__items`);

// Array with content for filters
const filtersData = [
  {title: `Everything`, isChecked: true},
  {title: `Future`, isChecked: false},
  {title: `Past`, isChecked: false}
];

// Applying filters
const filterEvents = (events, filterName) => {
  switch (filterName) {

    case `Everything`:
      return events;

    case `Future`:
      return events.filter((it) => {
        const eventDate = new Date(it.startDate);
        return eventDate > Date.now() && eventDate.getTime();
      });

    case `Past`:
      return events.filter((it) => {
        const eventDate = new Date(it.finishDate);
        return eventDate < Date.now() && eventDate.getTime();
      });

  }
  return false;
};


// Get code for the list of the filters
export default (filters, container, eventsData) => {
  container.innerHTML = ``;
  let filtersFragment = document.createDocumentFragment();
  for (let i = 0; i < filters.length; i++) {
    const filterInstance = new Filter(filters[i]);
    filtersFragment.appendChild(filterInstance.render());

    // If filers are changed
    filterInstance.onFilter = (filter) => {
      const filterName = filter;
      const filteredEvents = filterEvents(eventsData, filterName);
      renderEvents(filteredEvents, eventsNode);
    };

  }
  container.appendChild(filtersFragment);
};

export {filtersData};
