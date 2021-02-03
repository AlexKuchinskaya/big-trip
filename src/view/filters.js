import Absract from "./abstract.js";

const createTripPointFilterItemTemplate = (filter, currentFilterType) => {
  // const filterElements = [`everything`, `future`, `past`];
  const {type, name} = filter;
  return `<div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${currentFilterType === type ? `checked` : ``}>

    <label
      class="trip-filters__filter-label"
      for="filter-${type}">
      ${name}
    </label>
  </div>`;
};


const createTripPointFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
  .map((filter) => createTripPointFilterItemTemplate(filter, currentFilterType))
  .join(``);
  return `<form class="trip-filters" action="#" method="get">
   ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class TripPointFiltersView extends Absract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createTripPointFilterTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value); // зачем здесь evt.target.value?
  }
  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll(`.trip-filters__filter-input`).forEach((filter) => {
      filter.addEventListener(`change`, this._filterTypeChangeHandler);
    });
  }
}
