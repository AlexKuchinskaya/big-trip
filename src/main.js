import InformationTrip from "./view/information-trip.js";
import SiteMenu from "./view/site-menu.js";
import {destinationsMock} from "./mock/destinations.js";
import {offersMock} from "./mock/offers.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import TripPresenter from "./presenter/trip-presenter.js";
import TripsModel from "./model/trips-model.js";
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import {MenuItem, UpdateType, FilterType} from "./const/const.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";
const AUTHORIZATION = `Basic ponmlkjihgfedcba`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const api = new Api(END_POINT, AUTHORIZATION);


const tripsModel = new TripsModel();

const filterModel = new FilterModel();
const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);

const siteMenuComponent = new SiteMenu();

const filterPresenter = new FilterPresenter(tripControlsMenu, filterModel);
const tripContentPresenter = new TripPresenter(tripEventsContainer, offersMock, tripsModel, filterModel, api, destinationsMock);

const handleTripNewFormClose = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  // siteMenuComponent.getElement().querySelector(`[name="${MenuItem.TABLE}"]`).disabled = false; // не работает со ссылкой
  siteMenuComponent.getElement().querySelector(`[name="${MenuItem.TABLE}"]`).removeAttribute(`style`);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};
let statisticsComponent = null;
const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripContentPresenter.init();
      if (statisticsComponent !== null) {
        remove(statisticsComponent);
      }
      break;
    case MenuItem.STATS:
      tripContentPresenter.destroy();
      statisticsComponent = new StatisticsView(tripsModel.getTrips());
      render(tripEventsContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  evt.target.disabled = true;
  siteMenuComponent.getElement().querySelector(`[name="${MenuItem.TABLE}"]`).style = `pointer-events: none`; // не работает со ссылкой
  if (statisticsComponent !== null) {
    remove(statisticsComponent);
  }
  tripContentPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripContentPresenter.init();
  siteMenuComponent.getElement().querySelector(`[name="${MenuItem.TABLE}"]`).classList.remove(`trip-tabs__btn--active`);
  tripContentPresenter.createNewTrip(handleTripNewFormClose);
});

render(tripControlsHeading, siteMenuComponent, RenderPosition.AFTEREND);
filterPresenter.init();
// tripContentPresenter.init();


Promise.all([
  api.getTrips(),
  api.getDestinations(),
  api.getOffers()
])
  .then(([trips, destinations, offers]) => {
    tripContentPresenter.setDestinations(destinations);
    tripContentPresenter.setOffers(offers);
    tripContentPresenter.init();
    tripsModel.setTrips(UpdateType.INIT, trips);
    render(tripMainHeaderContainer, new InformationTrip(), RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })




// api.getTrips()
//   .then((points) => {
//     tripsModel.setTrips(UpdateType.INIT, points);
//     render(tripMainHeaderContainer, new InformationTrip(), RenderPosition.AFTERBEGIN);
//     siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

//   })
//   .catch((error) => {
//     tripsModel.setTrips(UpdateType.INIT, []);
//     render(tripMainHeaderContainer, new InformationTrip(), RenderPosition.AFTERBEGIN);
//     siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
//     throw error;
//   });

// api.getDestinations()
//   .then((destinations) => {
//     // tripContentPresenter.setDestinations(destinations);
//   });

// api.getOffers()
//   .then((offers) => {
//     // tripContentPresenter.setDestinations(destinations);
//   });
