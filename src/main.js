import renderFilters, {filtersData} from "./get-filter.js";
import renderEvents, {getAllEventsData} from "./get-event.js";
import {moneyChartRender, transportChartRender} from "./statistic.js";

const filtersNode = document.getElementById(`trip-filter`);
const eventsNode = document.getElementById(`trip-day__items`);
const openTableLink = document.querySelector(`a[href="#table"]`);
const openStatisticLink = document.querySelector(`a[href="#stats"]`);
const mainNode = document.querySelector(`.main`);
const statisticNode = document.querySelector(`#stats`);
const statisticMoneyNode = document.querySelector(`.statistic__money`);
const statisticTransportNode = document.querySelector(`.statistic__transport`);


// Render events to the page
const eventsData = getAllEventsData(7);
renderEvents(eventsData, eventsNode);


// Rendering filters
renderFilters(filtersData, filtersNode, eventsData);


// Open statistic
openStatisticLink.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  mainNode.classList.add(`visually-hidden`);
  statisticNode.classList.remove(`visually-hidden`);
  openStatisticLink.classList.add(`view-switch__item--active`);
  openTableLink.classList.remove(`view-switch__item--active`);

  moneyChartRender(eventsData, statisticMoneyNode);
  transportChartRender(eventsData, statisticTransportNode);

});

// Open table
openTableLink.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mainNode.classList.remove(`visually-hidden`);
  statisticNode.classList.add(`visually-hidden`);
  openStatisticLink.classList.remove(`view-switch__item--active`);
  openTableLink.classList.add(`view-switch__item--active`);
});
