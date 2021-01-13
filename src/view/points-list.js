import Abstract from "./abstract.js";
const createPointsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class InformationTrip extends Abstract {
  getTemplate() {
    return createPointsListTemplate();
  }
}
