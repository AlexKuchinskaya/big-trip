import NewTripPointForm from "../view/new-point-form.js";
// import EditingTripPoint from "../view/edit-point.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {generateId} from "../mock/task.js";
import {UserAction, UpdateType} from "../const/const.js";

export default class TripNewPresenter {
  constructor(tripListElement, changeData, destinations, offers) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._destinations = destinations;
    this._offers = offers;

    this._tripNewPointComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._tripNewPointComponent !== null) {
      return;
    }

    this._tripNewPointComponent = new NewTripPointForm(this._detinations, this._offers);
    // this._tripNewPointComponent = new EditingTripPoint(this._detinations, this._offers);
    console.log(`this._tripPointEditComponent`, this._tripNewPointComponent)
    this._tripNewPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    // this._tripNewPointComponent.setEditFormSubmitHandler(this._handleFormSubmit);
    this._tripNewPointComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripListElement, this._tripNewPointComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripNewPointComponent === null) {
      return;
    }

    remove(this._tripNewPointComponent);
    this._tripNewPointComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(trip) {
    this._changeData(
        UserAction.ADD_TASK,
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
