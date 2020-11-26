import {createInformationTripTemplate} from "./view/information-trip.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTripTemplate} from "./view/sorting.js";
import {createPointsListTemplate} from "./view/points-list.js";
import {createPointTripTemplate} from "./view/point-trip.js";
import {createEditingPointTemplate} from "./view/edit-point.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);


render(tripMainHeaderContainer, createInformationTripTemplate(), `afterbegin`);
render(tripControlsHeading, createSiteMenuTemplate(), `afterend`);
render(tripControlsMenu, createFiltersTemplate(), `beforeend`);
render(tripEventsContainer, createSortingTripTemplate(), `beforeend`);
render(tripEventsContainer, createPointsListTemplate(), `beforeend`);
const tripEventsList = document.querySelector(`.trip-events__list`);
render(tripEventsList, createPointTripTemplate(), `beforeend`);
render(tripEventsList, createEditingPointTemplate(), `beforeend`);

