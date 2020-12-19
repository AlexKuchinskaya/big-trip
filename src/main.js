import {createInformationTripTemplate} from "./view/information-trip.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTripTemplate} from "./view/sorting.js";
import {createPointsListTemplate} from "./view/points-list.js";
import {createNewPointFormTemplate} from "./view/new-point-form.js";
import PointTrip from "./view/point-trip.js"
import {createEditingPointTemplate} from "./view/edit-point.js";
import {generateTripPoint} from "./mock/task.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const TRIP_COUNT = 20;
const trips = new Array(TRIP_COUNT).fill().map((el, index) => generateTripPoint(index));


const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);


renderTemplate(tripMainHeaderContainer, createInformationTripTemplate(), `afterbegin`);
renderTemplate(tripControlsHeading, createSiteMenuTemplate(), `afterend`);
renderTemplate(tripControlsMenu, createFiltersTemplate(), `beforeend`);
renderTemplate(tripEventsContainer, createSortingTripTemplate(), `beforeend`);
renderTemplate(tripEventsContainer, createPointsListTemplate(), `beforeend`);
const tripEventsList = document.querySelector(`.trip-events__list`);
renderTemplate(tripEventsList, createNewPointFormTemplate(trips[0]), `beforeend`);
for (let i = 1; i < TRIP_COUNT; i++) {
  renderElement(tripEventsList, new PointTrip(trips[i]).getElement(), RenderPosition.BEFOREEND);
}
renderTemplate(tripEventsList, createEditingPointTemplate(trips[0]), `beforeend`);
