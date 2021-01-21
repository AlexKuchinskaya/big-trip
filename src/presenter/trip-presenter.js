import SortingTrip from "../view/sorting.js";
import TripPointMessage from "../view/no-trip-point.js";
import PointsList from "../view/points-list.js";
import {render, RenderPosition} from "../utils/render.js";
import TripPointPresenter from "./trip-point-presenter.js";
import {updateItems} from "../utils/common.js";
import {sortTripsByPrice, sortingByTime} from "../utils/trips-sorting.js";
import {SortTypes} from "../const/const.js";

const TRIP_COUNT = 20;
export default class TripPresenter {
  constructor(tripContainer, destinations) {
    this._destinations = destinations;
    this._tripContainer = tripContainer;
    this._pointsList = new PointsList();
    this._tripSortingMenu = new SortingTrip();
    this._noTripComponent = new TripPointMessage();
    this._tripPrsenters = {};
    this._currentSortType = SortTypes.DEFAULT;
    this._handleTripChange = this._handleTripChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }
  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._originalTripPoints = tripPoints.slice();
    this._renderSort();
    render(this._tripContainer, this._pointsList, RenderPosition.BEFOREEND);
    this._renderTripContent();
  }
  _sortTrips(sortType) {
    switch (sortType) {
      case SortTypes.PRICE_UP:
        this._tripPoints.sort(sortTripsByPrice);
        break;
      case SortTypes.TIME_UP:
        this._tripPoints.sort(sortingByTime);
        break;
      default:
        this._tripPoints = this._originalTripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortTrips(sortType);
    this._clearTripList();
    this._renderTripContent();
  }
  _renderSort() {
    render(this._tripContainer, this._tripSortingMenu, RenderPosition.BEFOREEND);
    this._tripSortingMenu.setSortTypeChangeHandler(this._handleSortTypeChange);
  }
  _renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter(
        this._pointsList, this._handleTripChange, this._handleModeChange, this._destinations
    );
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
    this._tripPrsenters[updatedTrip.id].init(updatedTrip);
  }
  _handleModeChange() {
    Object
      .values(this._tripPrsenters)
      .forEach((presenter) => presenter.resetView());
  }
}
