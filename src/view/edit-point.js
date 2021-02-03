import {types} from "../const/const.js";
import SmartView from "./smart-view.js";
import flatpickr from "flatpickr";
import dayjs from "dayjs";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

export const generateTripsTypesOptions = (isDisabled) => {
  return types.map((tripType) => `<div class="event__type-item">
    <input
      id="event-type-${tripType}-1"
      class="event__type-input  visually-hidden"
      type="radio"
      name="event-type"
      value="${tripType}"
      ${isDisabled ? `disabled` : ``}" >
    <label
      class="event__type-label  event__type-label--${tripType}"
      for="event-type-${tripType}-1">${tripType[0].toUpperCase() + tripType.substring(1)}
    </label>
  </div>`).join(``);
};

export const generateDestinations = (destinations, isDisabled) => {
  return destinations.map((destinationValue) => (
    `<option value="${destinationValue.name}" ${isDisabled ? `disabled` : ``}></option>`
  )).join(``);
};

export const findOffersByType = (allPossibleoffers, type) => {
  return allPossibleoffers.find((offer) => {
    return offer.type === type;
  });
};

const renderOfferSelector = (offer, index, appliedOffersFromTripPoint, isDisabled) => {
  const isChecked = appliedOffersFromTripPoint.find(
      (appliedOffer) => appliedOffer.title === offer.title
  );
  const checkboxId = `event-offer-${offer.title}-${index}`;
  return `
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="${checkboxId}"
      type="checkbox"
      name="event-offer-${offer.title}"
      value="${offer.title}"
      ${isChecked ? `checked` : ``}
      ${isDisabled ? `disabled` : ``}
    >
    <label class="event__offer-label" for="${checkboxId}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
};

const generateOffersTemplate = (allPossibleoffers, appliedOffersFromTripPoint, type, isDisabled) => {
  const offersFilteredBytype = findOffersByType(allPossibleoffers, type);
  if (!offersFilteredBytype) {
    throw new Error(`Cannot find offers group with '${type}' type`);
  }
  return offersFilteredBytype.offers.map((offer, index) => {
    return renderOfferSelector(offer, index, appliedOffersFromTripPoint, isDisabled);
  })
  .join(``);
};

const generateImageTemplate = (pictures) => {
  return pictures.map((picture) => {
    return `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`;
  }).join(``);
};

const createDestionationInfoTemplate = (destination, destinations) => {
  const foundDestinationInfo = destinations.find((_destination) => {
    return _destination.name === destination.name;
  });
  if (!foundDestinationInfo) {
    throw new Error(`Cannot find a destination with '${destination.name}' name`);
  }
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

const createEditingPointTemplate = (data, destinations, offers) => {
  const {appliedOffers, typeTripPoint, destination, price, isDisabled, isSaving, isDeleting} = data;
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeTripPoint}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"
          ${isDisabled ? `disabled` : ``}>

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
          <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${destination ? destination.name : ``}"
            list="destination-list-1"
            ${isDisabled ? `disabled` : ``}
          >
          <datalist id="destination-list-1">
            ${generateDestinations(destinations, isDisabled)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${price}" ${isDisabled ? `disabled` : ``}
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>
          ${isSaving ? `saving...` : `save`}
        </button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>
          ${isDeleting ? `deleting...` : `delete`}
        </button>
        <button class="event__rollup-btn" type="button" ${isDisabled ? `disabled` : ``}>
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${generateOffersTemplate(offers, appliedOffers, typeTripPoint)}
          </div>
        </section>

        ${destination && createDestionationInfoTemplate(destination, destinations)}
      </section>
    </form>
  </li>`;
};

export default class EditingTripPoint extends SmartView {
  constructor(tripData, destinations, offers) {
    super();
    this._destinations = destinations;
    this._offers = offers;
    const newTrip = EditingTripPoint.generateNewTrip(destinations);
    this._data = EditingTripPoint.parseTripPointToData(tripData || newTrip);
    this._datepicker = null;
    this._endDatepicker = null;
    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._editFormCloseHandler = this._editFormCloseHandler.bind(this);
    this._typeTripChangeHandler = this._typeTripChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersCheckboxHandler = this._offersCheckboxHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndtDatepicker();
  }
  static generateNewTrip(destinations) {
    return {
      typeTripPoint: `taxi`,
      destination: destinations[0],
      startDate: null,
      endDate: null,
      price: 0,
      appliedOffers: [],
      isFavorite: false,
    };
  }
  static parseTripPointToData(trip) {
    return Object.assign(
        {},
        trip,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }
  static parseDataToTripPoint(data) {
    data = Object.assign(
        {},
        data
    );
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }

  _typeTripChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      typeTripPoint: evt.target.value,
      appliedOffers: []
    });
  }
  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const newDestinationName = evt.target.value;
    const foundDestination = this._destinations.find((destination) => {
      return destination.name === newDestinationName;
    });
    if (foundDestination) {
      this.updateData({
        destination: foundDestination
      });
      evt.target.setCustomValidity(``);
    } else {
      evt.target.setCustomValidity(`Введенное значение должно соответсвовать одному из вариантов из списка`);
    }
    evt.target.reportValidity();
  }
  _setStartDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          time_24hr: true, // eslint-disable-line
          defaultDate: this._data.startDate ? this._data.startDate.toDate() : null,
          onChange: this._startDateChangeHandler
        }
    );
  }

  _setEndtDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          time_24hr: true, // eslint-disable-line
          defaultDate: this._data.endDate ? this._data.endDate.toDate() : null,
          onChange: this._endDateChangeHandler
        }
    );
  }
  _startDateChangeHandler(userDate) {
    this.updateData({
      startDate: dayjs(userDate)
    });
  }
  _endDateChangeHandler(userDate) {
    this.updateData({
      endDate: dayjs(userDate)
    });
  }
  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeTripChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._priceInputHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelectorAll(`.event__offer-checkbox`).forEach((offerCheckbox) => {
      offerCheckbox.addEventListener(`change`, this._offersCheckboxHandler);
    });
  }
  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndtDatepicker();
    this.setEditFormSubmitHandler(this._callback.editFormSubmit);
    this.setCloseFormHandler(this._callback.editFormClose);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }
  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: parseInt(evt.target.value, 10)
    }, true);
  }
  _offersCheckboxHandler(evt) {
    const offerTitle = evt.target.value;
    const isSelected = evt.target.checked;
    const offerGroupOfCurrentType = this._offers.find((offerGroup) => offerGroup.type === this._data.typeTripPoint);
    const currentOffer = offerGroupOfCurrentType.offers.find((offer) => offer.title === offerTitle);
    if (isSelected) {
      const newSelectedOffers = [
        ...this._data.appliedOffers,
        currentOffer,
      ];
      this.updateData({
        appliedOffers: newSelectedOffers,
      });
    } else {
      const newSelectedOffers = this._data.appliedOffers.filter((appliedOffer) => {
        return appliedOffer.title !== offerTitle;
      });
      this.updateData({
        appliedOffers: newSelectedOffers,
      });
    }
  }
  _editFormSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.editFormSubmit(EditingTripPoint.parseDataToTripPoint(this._data));
  }
  _editFormCloseHandler() {
    this._callback.editFormClose();
  }
  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditingTripPoint.parseDataToTripPoint(this._data));
  }
  setEditFormSubmitHandler(callback) {
    this._callback.editFormSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._editFormSubmitHandler);
  }
  setCloseFormHandler(callback) {
    this._callback.editFormClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editFormCloseHandler);
  }
  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }
  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }
  getTemplate() {
    return createEditingPointTemplate(this._data, this._destinations, this._offers);
  }
}
