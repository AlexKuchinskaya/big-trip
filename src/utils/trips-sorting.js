import {getTimeDifferenceInMs} from "../view/date-formatting.js";
export const sortTripsByPrice = (tripA, tripB) => {
  return tripB.price - tripA.price;
};

export const sortingByTripDuration = (tripA, tripB) => {
  return getTripDurationInSeconds(tripB) - getTripDurationInSeconds(tripA);
};

const getTripDurationInSeconds = (trip) => {
  if (!trip.startDate || !trip.endDate) {
    return 0;
  }
  return getTimeDifferenceInMs(trip.startDate, trip.endDate);
};

export const sortingByTripStartDate = (tripA, tripB) => {
  return tripA.startDate.diff(tripB.startDate);
};
