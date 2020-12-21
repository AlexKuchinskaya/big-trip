import {formatTime, formatTimeDifferenceBetweenDates, formatDate} from "./date-formatting";
import {createElement} from "../utils.js";

const createPointTripTemplate = (pointTrip) => {
  const {additionalOptions, startDate, endDate, typeTripPoint, destination, price, isFavorite} = pointTrip;
  const createExtraOffersListItem = () => {
    if (additionalOptions.length !== 0) {
      return additionalOptions.map((additionalOption) =>
        `<li class="event__offer">
          <span class="event__offer-title">${additionalOption.name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${additionalOption.price}</span>
        </li>`).join(``);
    } else {
      return ``;
    }
  };
  const favoriteClassName = isFavorite ? `` : `event__favorite-btn--active`;
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${startDate.format()}">${formatDate(startDate)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeTripPoint}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typeTripPoint} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDate.format()}">${formatTime(startDate)}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDate.format()}">${formatTime(endDate)}</time>
        </p>
        <p class="event__duration">${formatTimeDifferenceBetweenDates(startDate, endDate)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createExtraOffersListItem()}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class PointTrip {
  constructor(tripData) {
    this._tripData = tripData;
    this._element = null;
  }

  getTemplate() {
    return createPointTripTemplate(this._tripData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
