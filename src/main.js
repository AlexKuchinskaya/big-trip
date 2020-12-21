import InformationTrip from "./view/information-trip.js";
import SiteMenu from "./view/site-menu.js";
import TripPointFilters from "./view/filters.js";
import SortingTrip from "./view/sorting.js";
import PointsList from "./view/points-list.js";
import NewTripPointForm from "./view/new-point-form.js";
import PointTrip from "./view/point-trip.js";
import EditingTripPoint from "./view/edit-point.js";
import {generateTripPoint} from "./mock/task.js";
import {renderElement, RenderPosition} from "./utils.js";

const TRIP_COUNT = 20;
const trips = new Array(TRIP_COUNT).fill().map((el, index) => generateTripPoint(index));


const tripMainHeaderContainer = document.querySelector(`.trip-main`);
const tripControlsMenu = tripMainHeaderContainer.querySelector(`.trip-controls`);
const tripControlsHeading = tripMainHeaderContainer.querySelector(`h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);


renderElement(tripMainHeaderContainer, new InformationTrip().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripControlsHeading, new SiteMenu().getElement(), RenderPosition.AFTEREND);
renderElement(tripControlsMenu, new TripPointFilters().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsContainer, new SortingTrip().getElement(), RenderPosition.BEFOREEND);
const pointsListComponent = new PointsList();
renderElement(tripEventsContainer, pointsListComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(pointsListComponent.getElement(), new NewTripPointForm(trips[0]).getElement(), RenderPosition.BEFOREEND);
const renderTripPoint = (tripListElement, tripPoint) => {
  const tripPointComponent = new PointTrip(tripPoint);
  const tripPointEditComponent = new EditingTripPoint(tripPoint);
  const replacePointToEditForm = () => {
    tripListElement.replaceChild(tripPointEditComponent.getElement(), tripPointComponent.getElement());
  };
  const replaceEditFormToPoint = () => {
    tripListElement.replaceChild(tripPointComponent.getElement(), tripPointEditComponent.getElement());
  };
  const editButton = tripPointComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replacePointToEditForm();
  });
  const editSubmit = tripPointEditComponent.getElement().querySelector(`form`);
  editSubmit.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
  });
  renderElement(tripListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};
for (let i = 0; i < TRIP_COUNT; i++) {
  renderTripPoint(pointsListComponent.getElement(), trips[i]);
}

