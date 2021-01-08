import SortingTrip from "../view/sorting.js";
import TripPointMessage from "../view/no-trip-point.js";
import PointsList from "../view/points-list.js";
import {render, RenderPosition} from "../utils/render.js";
import TripPointPresenter from "./trip-point-presenter.js";
import {updateItems} from "../utils/common.js";

const TRIP_COUNT = 20;
export default class TripPresenter {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointsList = new PointsList();
    this._tripSortingMenu = new SortingTrip();
    this._noTripComponent = new TripPointMessage();
    this._tripPrsenters = {};
    this._handleTripChange = this._handleTripChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }
  init(tripPoints) {
    this._tripPoints = tripPoints;
    render(this._tripContainer, this._tripSortingMenu, RenderPosition.BEFOREEND);
    render(this._tripContainer, this._pointsList, RenderPosition.BEFOREEND);
    this._renderTripContent();
  }
  _renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter(this._pointsList, this._handleTripChange, this._handleModeChange);
    tripPointPresenter.init(tripPoint);
    this._tripPrsenters[tripPoint.id] = tripPointPresenter;
  }
  _renderTripPointsList() {
    for (let i = 0; i < TRIP_COUNT; i++) {
      this._renderTripPoint(this._tripPoints[i]);
    }
  }
  _renderNoTripMessage() {
    render(this._pointsList, this._noTripComponent, RenderPosition.BEFOREEND);
  }
  _renderTripContent() {
    if (this._tripPoints.length === 0) {
      this._renderNoTripMessage();
    } else {
      this._renderTripPointsList();
    }
  }
  _clearTripList() {
    Object
      .values(this._tripPrsenters)
      .forEach((presenter) => presenter.destroy());
    this._tripPrsenters = {};
  }
  _handleTripChange(updatedTrip) {
    this._tripPoints = updateItems(this._tripPoints, updatedTrip);
    this._tripPrsenters[updatedTrip.id].init(updatedTrip); // в пустой _tripPrsenter мы присваиваем ключ updatedTrip, затем вызывая метод init мы рендерим обновленую точку маршрута??
  }
  _handleModeChange() {
    Object
      .values(this._tripPrsenters)
      .forEach((presenter) => presenter.resetView());
  }
}
