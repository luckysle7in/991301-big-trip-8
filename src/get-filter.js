// Array with content for filters
const filters = [
  {name: `Everything`, isChecked: true},
  {name: `Future`, isChecked: false},
  {name: `Past`, isChecked: false}
];

// Get code for one filter
const getFilterElementCode = (title, isChecked = false) => {
  const filterName = title.toLowerCase();
  return `
    <input type="radio" id="filter-${filterName}" name="filter" value="${filterName}" ${isChecked ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${filterName}">${title}</label>
  `;
};

// Get code for the list of the filters
export default () => {
  let filtersCode = ``;
  filters.forEach((filter) => {
    filtersCode += getFilterElementCode(filter.name, filter.isChecked);
  });
  return filtersCode;
};
