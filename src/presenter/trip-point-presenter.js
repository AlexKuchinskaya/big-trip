import PointTrip from "../view/point-trip.js";
import EditingTripPoint from "../view/edit-point.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class PointTripPresenter {
  constructor(tripListElement, changeData, changeMode) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleEditFormSubmit = this._handleEditFormSubmit.bind(this);
    this._onEscapeKeyDownFormToPoint = this._onEscapeKeyDownFormToPoint.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }
  init(tripPoint) {
    this._tripPoint = tripPoint;
    const previousTripPointComponent = this._tripPointComponent;
    const previousTripPointEditComponent = this._tripPointEditComponent;
    this._tripPointComponent = new PointTrip(tripPoint);
    this._tripPointEditComponent = new EditingTripPoint(tripPoint);

    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointComponent.setFavouriteClickHadler(this._handleFavoriteClick);
    this._tripPointEditComponent.setEditFormSubmitHandler(this._handleEditFormSubmit);

    if (previousTripPointComponent === null || previousTripPointEditComponent === null) {
      render(this._tripListElement, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, previousTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointEditComponent, previousTripPointEditComponent);
    }

    remove(previousTripPointComponent);
    remove(previousTripPointEditComponent);
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
  _handleEditFormSubmit() {
    this._replaceEditFormToPoint();
  }
  _handleFavoriteClick() {
    this._changeData(
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
