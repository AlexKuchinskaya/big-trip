import {createInformationTripTemplate} from "./view/information-trip.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTripTemplate} from "./view/sorting.js";
import {createPointsListTemplate} from "./view/points-list.js";
import {createNewPointFormTemplate} from "./view/new-point-form.js";
import {createPointTripTemplate} from "./view/point-trip.js";
import {createEditingPointTemplate} from "./view/edit-point.js";
import {generateTripPoint} from "./mock/task.js";

const TRIP_COUNT = 20;
// конструктор array прнимает кол-во параметров которых должно быть создано. Они создаются пустыми
// элементы надо заполнить, вызываем метод fill, который заполнит все элементы каким-то значением undefined
// нужно получить новый массив, элементами которого будут эти 20 объектов с описанием точки маршрута
// generateTripPoint будет вызываться для каждого из 20 элемента массива
const trips = new Array(TRIP_COUNT).fill().map(generateTripPoint);

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
render(tripEventsList, createNewPointFormTemplate(trips[0]), `beforeend`);
for (let i = 1; i < TRIP_COUNT; i++) {
  render(tripEventsList, createPointTripTemplate(trips[i]), `beforeend`);
}
render(tripEventsList, createEditingPointTemplate(trips[0]), `beforeend`);

