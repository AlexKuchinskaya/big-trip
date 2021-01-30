import Abstract from "./abstract.js";
import {sortingElements} from "../const/const.js";

const crateTripSortingElements = (currentSortingElement) => {
  return sortingElements.map((sortingElement) => ` <div class="trip-sort__item  trip-sort__item--${sortingElement.id}">
    <input
      data-sort-type="${sortingElement.sortType}"
      id="sort-${sortingElement.id}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sortingElement.id}"
      ${currentSortingElement === sortingElement.id ? `checked` : ``}
      ${!sortingElement.isSortable ? `disabled` : ``}>
    <label
      class="trip-sort__btn"
      for="sort-${sortingElement.id}">${sortingElement.label}</label>
  </div>`).join(``);
};

const createSortingTripTemplate = (currentSortingElement) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${crateTripSortingElements(currentSortingElement)}
  </form>`;
};

export default class SortingTrip extends Abstract {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
  getTemplate() {
    return createSortingTripTemplate();
  }
}
