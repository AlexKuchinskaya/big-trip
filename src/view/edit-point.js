import {types} from "../const/const.js";
import SmartView from "./smart-view.js";
import flatpickr from "flatpickr";
import dayjs from "dayjs";
import he from "he";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

export const generateTripsTypesOptions = () => {
  return types.map((tripType) => `<div class="event__type-item">
    <input id="event-type-${tripType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType}" >
    <label class="event__type-label  event__type-label--${tripType}" for="event-type-${tripType}-1">${tripType[0].toUpperCase() + tripType.substring(1)}</label>
  </div>`).join(``);
};

export const generateDestinations = (destinations) => {
  return destinations.map((destinationValue) => `<option value="${destinationValue.name}"></option>`).join(``);
};

export const findOffersByType = (allPossibleoffers, type) => {
  return allPossibleoffers.find((offer) => {
    return offer.type === type;
  });
};

const renderOfferSelector = (offer, index, appliedOffersFromTripPoint) => {
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
    >
    <label class="event__offer-label" for="${checkboxId}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
};

const generateOffersTemplate = (allPossibleoffers, appliedOffersFromTripPoint, type) => { // проблемв с id, я пока им присвоила offer.title
  const offersFilteredBytype = findOffersByType(allPossibleoffers, type);
  return offersFilteredBytype.allOffers.map((offer, index) => {
    return renderOfferSelector(offer, index, appliedOffersFromTripPoint);
  })
  .join(``);
};

const generateImageTemplate = (pictures) => {
  return pictures.map((picture) => {
    return `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`;
  }).join(``);
};

export const createDestionationInfoTemplate = (destinationName, destinations) => {
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

const createEditingPointTemplate = (data, destinations, offers) => {
  const {appliedOffers, typeTripPoint, destination, price} = data;
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination)}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${generateDestinations(destinations)}
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
            ${generateOffersTemplate(offers, appliedOffers, typeTripPoint)}
          </div>
        </section>

        ${createDestionationInfoTemplate(destination, destinations)}
      </section>
    </form>
  </li>`;
};

export default class EditingTripPoint extends SmartView {
  constructor(tripData, destinations, offers) {
    super();
    this._destinations = destinations;
    this._offers = offers;
    // this._tripData = tripData;
    this._data = EditingTripPoint.parseTripPointToData(tripData);
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
  static parseTripPointToData(trip) { // обратиться к функции filerOffersByType чтобы была инфа о вскх возможных офферах новое поле лоя т редактт
    if (!trip) {
      trip = {
        id: ``,
        typeTripPoint: `taxi`,
        destination: `Amsterdam`,
        startDate: dayjs(),
        endDate: dayjs(),
        price: 0,
        appliedOffers: [],
        isFavorite: false,
      };
    }
    return Object.assign(
        {},
        trip
    );
  }
  static parseDataToTripPoint(data) {
    return Object.assign(
        {},
        data
    );
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
    const isCorrectValue = this._destinations.some((destination) => {
      return destination.name === newDestinationName;
    });
    if (isCorrectValue) {
      this.updateData({
        destination: newDestinationName
      });
      evt.target.setCustomValidity(``);
    } else {
      evt.target.setCustomValidity(`Введенное значение должно соответсвовать одному из вариантов из списка`); //works only with enter, если просто написать что-то и убрать курсор то оно пропускает это значение
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
          time_24hr: true,
          defaultDate: this._data.startDate.toDate(),
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
          time_24hr: true,
          defaultDate: this._data.endDate.toDate(),
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
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeTripChangeHandler); // здесь срабатывает только input or change
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
    this.setEditFormSubmitHandler(this._callback.editFormSubmit); // зачем нам их восстанавливать, зачем
    this.setEditFormCloseHandler(this._callback.editFormClose); // зачем нам восстанавливтаь их
    this.setDeleteClickHandler(this._callback.deleteClick);
  }
  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }
  _offersCheckboxHandler(evt) {
    const offerTitle = evt.target.value;
    const isSelected = evt.target.checked;
    const offerGroupOfCurrentType = this._offers.find((offerGroup) => offerGroup.type === this._data.typeTripPoint);
    const currentOffer = offerGroupOfCurrentType.allOffers.find((offer) => offer.title === offerTitle);
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
  setEditFormCloseHandler(callback) {
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
  // reset(trip) {
  //   this.updateData({
  //     EditingTripPoint.parseTripPointToData(trip)
  //   })
  // }
  getTemplate() {
    return createEditingPointTemplate(this._data, this._destinations, this._offers);
  }
}
