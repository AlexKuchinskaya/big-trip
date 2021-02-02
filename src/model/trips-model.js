import dayjs from "dayjs";
import Observer from "../utils/observer.js";

export default class TripsModel extends Observer {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(updateType, trips) {
    this._trips = trips.slice();
    this._notify(updateType);
  }

  getTrips() {
    return this._trips;
  }

  updateTrip(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      update,
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType, update);

  }

  addTrip(updateType, update) {
    this._trips = [
      update,
      ...this._trips
    ];
    this._notify(updateType, update);
  }

  deleteTrip(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          typeTripPoint: trip.type,
          startDate: trip.date_from ? dayjs(trip.date_from) : null,
          endDate: trip.date_to ? dayjs(trip.date_to) : null,
          price: trip.base_price,
          isFavorite: trip.is_favorite,
          appliedOffers: trip.offers,
        }
    );

    delete adaptedTrip.type;
    delete adaptedTrip.date_from;
    delete adaptedTrip.date_to;
    delete adaptedTrip.is_favorite;
    delete adaptedTrip.base_price;
    delete adaptedTrip.offers;
    return adaptedTrip;
  }

  static adaptToServer(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          "type": trip.typeTripPoint,
          "date_from": trip.startDate ? trip.startDate.toISOString() : null,
          "date_to": trip.endDate ? trip.endDate.toISOString() : null,
          "base_price": trip.price,
          "is_favorite": trip.isFavorite,
          "offers": trip.appliedOffers
        }
    );

    delete adaptedTrip.typeTripPoint;
    delete adaptedTrip.startDate;
    delete adaptedTrip.endDate;
    delete adaptedTrip.isFavorite;
    delete adaptedTrip.price;
    delete adaptedTrip.appliedOffers;

    return adaptedTrip;
  }

  static adaptOffersToClient(offer) {
    const adaptedOffer = Object.assign(
        {},
        offer,
        {
          offers: offer.offers
        }
    );
    return adaptedOffer;
  }
}
