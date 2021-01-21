import {formatDatePointEditing} from "./date-formatting";
import {types} from "../const/const.js";
import Abstract from "./abstract.js";
import {destinationsArray} from "../main.js";
import {filerOffersByType, offers} from "../mock/task.js";
import flatpickr from "flatpickr";
import dayjs from "dayjs";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const generateTripsTypesOptions = () => {
  return types.map((tripType) => `<div class="event__type-item">
    <input id="event-type-${tripType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType}" >
    <label class="event__type-label  event__type-label--${tripType}" for="event-type-${tripType}-1">${tripType[0].toUpperCase() + tripType.substring(1)}</label>
  </div>`).join(``);
};

const generateDestinations = () => {
  return destinationsArray.map((destinationValue) => `<option value="${destinationValue}"></option>`).join(``);
};

const findOffersByType = (type) => {
  return offers.find((offer) => {
    return offer.type === type;
  });
};

const generateOffersTemplate = (appliedOffers, type) => { // проблемв с id, я пока им присвоила offer.title
  const offersFilteredBytype = findOffersByType(type);
  return offersFilteredBytype.allOffers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}"
    ${appliedOffers.find((appliedOffer) => appliedOffer.title === offer.title) ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${offer.title}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join(``);
};

const generateImageTemplate = (pictures) => {
  return pictures.map((picture) => {
    return `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`;
  }).join(``);
};

const createDestionationInfoTemplate = (destinationName, destinations) => {
  const foundDestinationInfo = destinations.find((destination) => {
    return destination.name === destinationName;
  });
  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${foundDestinationInfo.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${generateImageTemplate(foundDestinationInfo.pictures)}
        </div>
      </div>
    </section>
  `;
};

const createEditingPointTemplate = (data, destinations) => { // можно ли тут оставить pointTrip? почему здесь data
  const {appliedOffers, startDate, endDate, typeTripPoint, destination, price} = data;
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
            ${generateDestinations()}
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
            ${generateOffersTemplate(appliedOffers, typeTripPoint)}
          </div>
        </section>

        ${createDestionationInfoTemplate(destination, destinations)}
      </section>
    </form>
  </li>`;
};

export default class EditingTripPoint extends Abstract {
  constructor(tripData, destinations) {
    super();
    this._destinations = destinations;
    // this._tripData = tripData;
    this._data = EditingTripPoint.parseTripPointToData(tripData);
    this._datepicker = null;
    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._editFormCloseHandler = this._editFormCloseHandler.bind(this);
    this._typeTripChangeHandler = this._typeTripChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    // this.__endDateChangeHandler = this.__endDateChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepicker();
  }
  static parseTripPointToData(trip) { // обратиться к функции filerOffersByType чтобы была инфа о вскх возможных офферах новое поле лоя т редактт
    return Object.assign(
        {},
        trip,
        {
          allOffersForTripType: filerOffersByType(trip.typeTripPoint)
        }
    ); // у меня пока нет тех флагов которые можно было бы передать
  }
  static parseDataToTripPoint(data) {
    const copyDate = Object.assign({}, data); // не хватает условий
    return copyDate;
  }
  updateData(newData, justDataUpdating) {
    if (!newData) {
      return;
    }
    this._data = Object.assign(
        {},
        this._data,
        newData
    );
    if (justDataUpdating) {
      return;
    }
    this.updateElement();// разве этот метод не вызовется сразу для нового  this._data, то есть в  previousELement и newElement будет одно и то же??
  }
  updateElement() {
    let previousELement = this.getElement();
    const parent = previousELement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, previousELement);
    this.restoreHandlers();
  }

  _typeTripChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      typeTripPoint: evt.target.value,
      // additionalOptions: findElemenentBy(this._data, evt).additionalOptions
    });
  }
  _destinationChangeHandler(evt) {
    console.log(`evt`, evt)
    // evt.preventDefault();
    const newDestination = evt.target.value;
    this.updateData({
      destination: newDestination
    });
  }
  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          enableTime: true,
          time_24hr: true,
          defaultDate: this._data.startDate, // если не ставлю дефолтное время не меняяется время в инпуте
          onChange: this._startDateChangeHandler // На событие flatpickr передаём наш колбэк
        }
    );
  }
  _startDateChangeHandler(userDate) {
    this.updateData({
      startDate: userDate
    });
  }
  _endDateChangeHandler(userDate) {
    this.updateData({
      endDate: userDate
    });
  }
  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeTripChangeHandler); // здесь срабатывает только input or change
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._priceInputHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
  }
  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setEditFormSubmitHandler(this._callback.editFormSubmit); // зачем нам их восстанавливать, зачем this._callback.editFormSubmit
    this.setEditFormCloseHandler(this._callback.editFormClose); // зачем нам восстанавливтаь их
  }
  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true); // justDataUpdating = true
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
  // reset(trip) {
  //   this.updateData({
  //     EditingTripPoint.parseTripPointToData(trip)
  //   })
  // }
  getTemplate() {
    return createEditingPointTemplate(this._data, this._destinations);
  }
}
