import SortingTrip from "../view/sorting.js";
import TripPointMessage from "../view/no-trip-point.js";
import PointsList from "../view/points-list.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import TripPointPresenter, {State as TripPresenterViewState} from "./trip-point-presenter.js";
import TripNewPresenter from "./trip-new-presenter.js";
import LoadingView from "../view/loading-view.js";
import {sortTripsByPrice, sortingByTime} from "../utils/trips-sorting.js";
import {SortTypes, UserAction, UpdateType} from "../const/const.js";
import {filter} from "../utils/filter-utils.js";

export default class TripPresenter {
  constructor(tripContainer, offers, tripsModel, filterModel, api, destinations) {
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._destinations = destinations;
    this._tripContainer = tripContainer;
    this._offers = offers;
    this._isLoading = true;
    this._api = api;
    this._tripSortingMenu = null;
    this._pointsList = new PointsList();
    this._noTripComponent = new TripPointMessage();
    this._loadingComponent = new LoadingView();
    this._tripPrsenters = {};
    this._currentSortType = SortTypes.DEFAULT;
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._tripNewPresenter = new TripNewPresenter(this._pointsList, this._handleViewAction, this._destinations, this._offers);
  }

  init() {

    render(this._tripContainer, this._pointsList, RenderPosition.BEFOREEND);

    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    // this._renderTripContent();
  }
  setDestinations(destinations) {
    this._destinations = destinations;
  }
  setOffers(offers) {
    this.offers = offers;
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
    render(this._tripContainer, this._tripSortingMenu, RenderPosition.AFTERBEGIN);
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
    trips.forEach((trip) => this._renderTripPoint(trip));
  }

  _renderNoTripMessage() {
    render(this._pointsList, this._noTripComponent, RenderPosition.BEFOREEND);
  }

  _renderTripContent() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const trips = this._getTrips();
    const tripsLenght = trips.length;

    if (tripsLenght === 0) {
      this._renderNoTripMessage();
      return;
    }
    this._renderSort();
    this._renderTripPointsList(trips);
  }

  _renderLoading() {
    render(this._pointsList, this._loadingComponent, RenderPosition.AFTERBEGIN);
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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._tripPrsenters[update.id].setViewState(TripPresenterViewState.SAVING);
        this._api.updateTrip(update).
          then((response) => {
            this._tripsModel.updateTrip(updateType, response);
          })
          .catch(() => {
            this._tripPrsenters[update.id].setViewState(TripPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_TRIP:
        this._tripNewPresenter.setSaving();
        this._api.addTrip(update).
          then((response) => {
            this._tripsModel.addTrip(updateType, response);
          })
          .catch(() => {
            this._tripNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_TRIP:
        this._tripPrsenters[update.id].setViewState(TripPresenterViewState.DELETING);
        this._api.deleteTrip(update)
          .then(() => {
            this._tripsModel.deleteTrip(updateType, update);
          })
          .catch(() => {
            this._tripPrsenters[update.id].setViewState(TripPresenterViewState.ABORTING);
          })
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
