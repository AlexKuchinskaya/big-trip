import SortingTrip from "../view/sorting.js";
import TripPointMessage from "../view/no-trip-point.js";
import PointsList from "../view/points-list.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import TripPointPresenter from "./trip-point-presenter.js";
import TripNewPresenter from "./trip-new-presenter.js";
import {updateItems} from "../utils/common.js";
import {sortTripsByPrice, sortingByTime} from "../utils/trips-sorting.js";
import {SortTypes, UserAction, UpdateType} from "../const/const.js";
import {filter} from "../utils/filter-utils.js";

export default class TripPresenter {
  constructor(tripContainer, destinations, offers, tripsModel, filterModel) {
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._destinations = destinations;
    this._tripContainer = tripContainer;
    this._offers = offers;
    this._pointsList = new PointsList();
    this._tripSortingMenu = null;
    this._noTripComponent = new TripPointMessage();
    this._tripPrsenters = {};
    this._currentSortType = SortTypes.DEFAULT;
    // this._handleTripChange = this._handleTripChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    // this._tripsModel.addObserver(this._handleModelEvent);
    // this._filterModel.addObserver(this._handleModelEvent);
    this._tripNewPresenter = new TripNewPresenter(this._pointsList, this._handleViewAction, this._destinations, this._offers);
  }

  init() {
    // this._tripPoints = tripPoints.slice(); // удалить вконце
    // this._originalTripPoints = tripPoints.slice(); // удалить вконце
    // this._renderSort();
    this._renderTripContent();
    render(this._tripContainer, this._pointsList, RenderPosition.BEFOREEND);
    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearTripsArea({resetSortType: true});

    remove(this._pointsList);
    remove(this._tripSortingMenu);

    this._tripsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createNewTrip(callback) {
    this._currentSortType = SortTypes.DEFAULT;
    // this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._tripNewPresenter.init(callback);
  }

  _getTrips() {
    const filterType = this._filterModel.getFilter();
    const trips = this._tripsModel.getTrips();
    const filteredTrips = filter[filterType](trips);

    switch (this._currentSortType) {
      case SortTypes.PRICE_UP:
        return filteredTrips.sort(sortTripsByPrice);
      case SortTypes.TIME_UP:
        return filteredTrips.sort(sortingByTime);
    }
    return filteredTrips;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTripsArea();
    this._renderTripContent();
  }

  _renderSort() {
    if (this._tripSortingMenu !== null) {
      this._tripSortingMenu = null;
    }
    this._tripSortingMenu = new SortingTrip(this._currentSortType);
    render(this._tripContainer, this._tripSortingMenu, RenderPosition.BEFOREEND);
    this._tripSortingMenu.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter(
        this._pointsList, this._handleViewAction, this._handleModeChange, this._destinations, this._offers
    );
    tripPointPresenter.init(tripPoint);
    this._tripPrsenters[tripPoint.id] = tripPointPresenter;
  }

  _renderTripPointsList(trips) {
    // const trips = this._getTrips().slice();
    trips.forEach((trip) => this._renderTripPoint(trip));
  }

  _renderNoTripMessage() {
    render(this._pointsList, this._noTripComponent, RenderPosition.BEFOREEND);
  }

  _renderTripContent() {
    const trips = this._getTrips();
    const tripsLenght = trips.length;
    if (tripsLenght === 0) {
      this._renderNoTripMessage();
      return;
    }
    this._renderSort();
    this._renderTripPointsList(trips);
  }

  _clearTripsArea({resetSortType = false} = {}) {
    this._tripNewPresenter.destroy();
    Object
      .values(this._tripPrsenters)
      .forEach((presenter) => presenter.destroy());
    remove(this._tripSortingMenu);
    remove(this._noTripComponent);
    if (resetSortType) {
      this._currentSortType = SortTypes.DEFAULT;
    }

  }
  // _handleTripChange(updatedTrip) {
  //   // this._tripPoints = updateItems(this._tripPoints, updatedTrip); удалить вконце
  //   // Здесь будем вызывать обновление модели
  //   this._tripPrsenters[updatedTrip.id].init(updatedTrip);
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this._tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this._tripsModel.deleteTrip(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPrsenters[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripsArea();
        this._renderTripContent();
        break;
      case UpdateType.MAJOR:
        this._clearTripsArea({resetSortType: true});
        this._renderTripContent();
        break;
    }
  }

  _handleModeChange() {
    this._tripNewPresenter.destroy();
    Object
      .values(this._tripPrsenters)
      .forEach((presenter) => presenter.resetView());
  }
}
