import InformationTrip from "./view/information-trip.js";
import SiteMenu from "./view/site-menu.js";
import TripPointFilters from "./view/filters.js";
import SortingTrip from "./view/sorting.js";
import PointsList from "./view/points-list.js";
import PointTrip from "./view/point-trip.js";
import EditingTripPoint from "./view/edit-point.js";
import TripPointMessage from "./view/no-trip-point.js";
import {generateTripPoint} from "./mock/task.js";
import {render, RenderPosition, replace} from "./utils/render.js";

const TRIP_COUNT = 20;
const trips = new Array(TRIP_COUNT).fill().map((el, index) => generateTripPoint(index));


const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);


render(tripMainHeaderContainer, new InformationTrip(), RenderPosition.AFTERBEGIN);
render(tripControlsHeading, new SiteMenu(), RenderPosition.AFTEREND);
render(tripControlsMenu, new TripPointFilters(), RenderPosition.BEFOREEND);
render(tripEventsContainer, new SortingTrip(), RenderPosition.BEFOREEND);
const pointsListComponent = new PointsList();
render(tripEventsContainer, pointsListComponent, RenderPosition.BEFOREEND);

const renderTripPoint = (tripListElement, tripPoint) => {
  const tripPointComponent = new PointTrip(tripPoint);
  const tripPointEditComponent = new EditingTripPoint(tripPoint);
  const replacePointToEditForm = () => {
    replace(tripPointEditComponent, tripPointComponent);
  };
  const replaceEditFormToPoint = () => {
    replace(tripPointComponent, tripPointEditComponent);
  };
  const onEscapeKeyDownFormToPoint = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener(`keydown`, onEscapeKeyDownFormToPoint);
    }
  };
  tripPointComponent.setEditClickHandler(() => {
    replacePointToEditForm();
    document.addEventListener(`keydown`, onEscapeKeyDownFormToPoint);
  });
  tripPointEditComponent.setEditFormSubmitHandler(() => {
    replaceEditFormToPoint();
    document.removeEventListener(`keydown`, onEscapeKeyDownFormToPoint);
  });
  render(tripListElement, tripPointComponent, RenderPosition.BEFOREEND);
};
if (trips.length === 0) {
  render(pointsListComponent, new TripPointMessage(), RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < TRIP_COUNT; i++) {
    renderTripPoint(pointsListComponent, trips[i]);
  }
}

