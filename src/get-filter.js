export default (title, isChecked = false) => {
  const filterName = title.toLowerCase();
  return `
    <input type="radio" id="filter-${filterName}" name="filter" value="${filterName}" ${isChecked ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${filterName}">${title}</label>
  `;
};
