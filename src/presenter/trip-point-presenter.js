import PointTrip from "../view/point-trip.js";
import EditingTripPoint from "../view/edit-point.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const/const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class TripPointPresenter {
  constructor(tripListElement, changeData, changeMode, detinations, offers) {
    this._tripListElement = tripListElement;
    this._detinations = detinations;
    this._offers = offers;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleEditFormSubmit = this._handleEditFormSubmit.bind(this);
    this._onEscapeKeyDownFormToPoint = this._onEscapeKeyDownFormToPoint.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleEditFormClose = this._handleEditFormClose.bind(this);
  }
  init(tripPoint) {
    this._tripPoint = tripPoint;
    const previousTripPointComponent = this._tripPointComponent;
    const previousTripPointEditComponent = this._tripPointEditComponent;
    this._tripPointComponent = new PointTrip(tripPoint);
    this._tripPointEditComponent = new EditingTripPoint(tripPoint, this._detinations, this._offers);

    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointComponent.setFavouriteClickHadler(this._handleFavoriteClick);
    this._tripPointEditComponent.setEditFormSubmitHandler(this._handleEditFormSubmit);
    this._tripPointEditComponent.setCloseFormHandler(this._handleEditFormClose);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (previousTripPointComponent === null || previousTripPointEditComponent === null) {
      render(this._tripListElement, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, previousTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointEditComponent, previousTripPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(previousTripPointComponent);
    remove(previousTripPointEditComponent);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._tripPointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    switch (state) {
      case State.SAVING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripPointComponent.shake(resetFormState);
        this._tripPointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToEditForm() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._onEscapeKeyDownFormToPoint);
    this._changeMode();
    this._mode = Mode.EDITING;
  }
  _replaceEditFormToPoint() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._onEscapeKeyDownFormToPoint);
    this._mode = Mode.DEFAULT;
  }
  _onEscapeKeyDownFormToPoint(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._replaceEditFormToPoint();
    }
  }
  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripPointEditComponent);
  }
  _handleEditClick() {
    this._replacePointToEditForm();
  }
  _handleEditFormSubmit(tripPoint) {
    this._changeData(
        UserAction.UPDATE_TRIP,
        UpdateType.MINOR,
        tripPoint
    );
  }
  _handleEditFormClose() {
    this._replaceEditFormToPoint();
  }
  _handleDeleteClick(tripPoint) {
    this._changeData(
        UserAction.DELETE_TRIP,
        UpdateType.MINOR,
        tripPoint
    );
  }
  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_TRIP,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._tripPoint,
            {
              isFavorite: !this._tripPoint.isFavorite
            }
        )
    );
  }
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToPoint();
    }
  }
}
