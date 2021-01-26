import Observer from "../utils/observer.js";

export default class TripsModel extends Observer {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(trips) {
    this._trips = trips.slice();
  }

  getTrips() {
    return this._trips;
  }
}