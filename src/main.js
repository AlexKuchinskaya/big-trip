import InformationTrip from "./view/information-trip.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import TripPointFilters from "./view/filters.js";
import SortingTrip from "./view/sorting.js";
import PointsList from "./view/points-list.js";
import NewTripPointForm from "./view/new-point-form.js";
import PointTrip from "./view/point-trip.js";
import EditingTripPoint from "./view/edit-point.js";
import {generateTripPoint} from "./mock/task.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const TRIP_COUNT = 20;
const trips = new Array(TRIP_COUNT).fill().map((el, index) => generateTripPoint(index));


const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);


renderElement(tripMainHeaderContainer, new InformationTrip().getElement(), RenderPosition.AFTERBEGIN);
renderTemplate(tripControlsHeading, createSiteMenuTemplate(), `afterend`);
renderElement(tripControlsMenu, new TripPointFilters().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsContainer, new SortingTrip().getElement(), RenderPosition.BEFOREEND);
const pointsListComponent = new PointsList();
renderElement(tripEventsContainer, pointsListComponent.getElement(), `beforeend`);
renderElement(pointsListComponent.getElement(), new NewTripPointForm(trips[0]).getElement(), RenderPosition.BEFOREEND);
for (let i = 1; i < TRIP_COUNT; i++) {
  renderElement(pointsListComponent.getElement(), new PointTrip(trips[i]).getElement(), RenderPosition.BEFOREEND);
}
renderElement(pointsListComponent.getElement(), new EditingTripPoint(trips[0]).getElement(), RenderPosition.BEFOREEND);
