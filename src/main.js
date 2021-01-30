import InformationTrip from "./view/information-trip.js";
import SiteMenu from "./view/site-menu.js";
import {generateTripPoint} from "./mock/task.js";
import {destinationsMock} from "./mock/destinations.js";
import {offersMock} from "./mock/offers.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip-presenter.js";
import TripsModel from "./model/trips-model.js";
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import {MenuItem, UpdateType, FilterType} from "./const/const.js";
const TRIP_COUNT = 20;
const trips = new Array(TRIP_COUNT).fill().map((el, index) => generateTripPoint(index));


const tripsModel = new TripsModel();
tripsModel.setTrips(trips);

const filterModel = new FilterModel();
const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);

const siteMenuComponent = new SiteMenu();
render(tripMainHeaderContainer, new InformationTrip(), RenderPosition.AFTERBEGIN);
render(tripControlsHeading, siteMenuComponent, RenderPosition.AFTEREND);

const filterPresenter = new FilterPresenter(tripControlsMenu, filterModel);
const tripContentPresenter = new TripPresenter(tripEventsContainer, destinationsMock, offersMock, tripsModel, filterModel);
filterPresenter.init();
tripContentPresenter.init();

const handleTripNewFormClose = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  // siteMenuComponent.getElement().querySelector(`[name="${MenuItem.TABLE}"]`).disabled = false; // не работает со ссылкой
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripContentPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      tripContentPresenter.destroy();
      // Показать статистику
      break;
  }
};
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  evt.target.disabled = true;
  tripContentPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripContentPresenter.init();
  // siteMenuComponent.getElement().querySelector(`[name="${MenuItem.TABLE}"]`).disabled = true;  // не работает со ссылкой
  siteMenuComponent.getElement().querySelector(`[name="${MenuItem.TABLE}"]`).classList.remove(`trip-tabs__btn--active`);
  tripContentPresenter.createNewTrip(handleTripNewFormClose);
});

