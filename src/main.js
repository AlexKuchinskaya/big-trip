import InformationTrip from "./view/information-trip.js";
import SiteMenu from "./view/site-menu.js";
import TripPointFilters from "./view/filters.js";
import {generateTripPoint} from "./mock/task.js";
import {destinationsMock} from "./mock/destinations.js";
import {offersMock} from "./mock/offers.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip-presenter.js";
import TripsModel from "./model/trips-model.js";
const TRIP_COUNT = 20;
const trips = new Array(TRIP_COUNT).fill().map((el, index) => generateTripPoint(index));


const tripsModel = new TripsModel();
tripsModel.setTrips(trips);

const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);


render(tripMainHeaderContainer, new InformationTrip(), RenderPosition.AFTERBEGIN);
render(tripControlsHeading, new SiteMenu(), RenderPosition.AFTEREND);
render(tripControlsMenu, new TripPointFilters(), RenderPosition.BEFOREEND);

const tripContentPresenter = new TripPresenter(tripEventsContainer, destinationsMock, offersMock, tripsModel);
tripContentPresenter.init();
