import Absract from "./abstract.js";
const createFiltersTemplate = () => {
  const createTripPointFiltersTemplate = (currentFilterElement) => {
    const filterElements = [`everything`, `future`, `past`];
    return filterElements.map((filterElement) => `<div class="trip-filters__filter">
      <input
        id="filter-${filterElement}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filterElement}"
        ${currentFilterElement === filterElement ? `checked` : ``}>

      <label
        class="trip-filters__filter-label"
        for="filter-${filterElement}">
        ${filterElement}
      </label>
    </div>`).join(``);
  };
  return `<form class="trip-filters" action="#" method="get">
   ${createTripPointFiltersTemplate()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class TripPointFilters extends Absract {
  getTemplate() {
    return createFiltersTemplate();
  }
}
