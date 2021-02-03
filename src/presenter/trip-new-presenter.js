import EditingTripPoint from "../view/edit-point.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const/const.js";

export default class TripNewPresenter {
  constructor(tripListElement, changeData) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._destinations = null;
    this._offers = null;

    this._tripNewPointComponent = null;
    this._destroyCallback = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
  }

  init(destroyCallback, destinations, offers) {
    this._destroyCallback = destroyCallback;
    this._destinations = destinations;
    this._offers = offers;
    if (this._tripNewPointComponent !== null) {
      return;
    }
    this._tripNewPointComponent = new EditingTripPoint(undefined, this._destinations, this._offers);
    this._tripNewPointComponent.setEditFormSubmitHandler(this._handleFormSubmit);
    this._tripNewPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._tripNewPointComponent.setCloseFormHandler(this._handleFormClose);

    render(this._tripListElement, this._tripNewPointComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripNewPointComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._tripNewPointComponent);
    this._tripNewPointComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._tripNewPointComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  _handleFormSubmit(trip) {
    this._changeData(
        UserAction.ADD_TRIP,
        UpdateType.MINOR,
        trip
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleFormClose() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
