import Abstract from "./abstract.js";
const createTripPointMessage = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class TripPointMessage extends Abstract {
  getTemplate() {
    return createTripPointMessage();
  }
}
