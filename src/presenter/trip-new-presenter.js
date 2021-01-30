import EditingTripPoint from "../view/edit-point.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {generateId} from "../mock/task.js";
import {UserAction, UpdateType} from "../const/const.js";

export default class TripNewPresenter {
  constructor(tripListElement, changeData, destinations, offers) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._destinations = destinations;
    this._offers = offers;

    this._tripNewPointComponent = null;
    this._destroyCallback = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;
    if (this._tripNewPointComponent !== null) {
      return;
    }
    this._tripNewPointComponent = new EditingTripPoint(undefined, this._destinations, this._offers);
    this._tripNewPointComponent.setEditFormSubmitHandler(this._handleFormSubmit);
    this._tripNewPointComponent.setDeleteClickHandler(this._handleDeleteClick);

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

  _handleFormSubmit(trip) {
    this._changeData(
        UserAction.ADD_TRIP,
        UpdateType.MINOR,
        Object.assign(
            {id: generateId()},
            trip
        )
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
