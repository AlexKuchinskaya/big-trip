import {formatDatePointEditing} from "./date-formatting";
import {types} from "../const/const.js";
import Abstract from "./abstract.js";
const createEditingPointTemplate = (pointTrip) => {
  const {additionalOptions, startDate, endDate, typeTripPoint, destination, price, informationDestination} = pointTrip;
  const generateOffersTemplate = (currentInformationElement) => {
    return additionalOptions.map((randomAddiotionalOption) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${randomAddiotionalOption.type}-1" type="checkbox" name="event-offer-${randomAddiotionalOption.type}"
      ${currentInformationElement === randomAddiotionalOption ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${randomAddiotionalOption.type}-1">
        <span class="event__offer-title">${randomAddiotionalOption.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${randomAddiotionalOption.price}</span>
      </label>
    </div>`).join(``);
  };
  const generateTripsTypesOptions = (currentTripType) => {
    return types.map((tripType) => `<div class="event__type-item">
      <input id="event-type-${tripType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType}" ${currentTripType === tripType ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${tripType}" for="event-type-${tripType}-1">${tripType}</label>
    </div>`).join(``);
  };
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeTripPoint}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${generateTripsTypesOptions()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${typeTripPoint}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDatePointEditing(startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDatePointEditing(endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${generateOffersTemplate()}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${informationDestination}</p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditingTripPoint extends Abstract {
  constructor(tripData) {
    super();
    this._tripData = tripData;
    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._editFormCloseHandler = this._editFormCloseHandler.bind(this);
  }
  _editFormSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.editFormSubmit();
  }
  _editFormCloseHandler() {
    this._callback.editFormClose();
  }
  setEditFormSubmitHandler(callback) {
    this._callback.editFormSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._editFormSubmitHandler);
  }
  setEditFormCloseHandler(callback) {
    this._callback.editFormClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editFormCloseHandler);
  }
  getTemplate() {
    return createEditingPointTemplate(this._tripData);
  }
}
