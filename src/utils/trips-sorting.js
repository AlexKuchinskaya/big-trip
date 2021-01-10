import {getTimeDifferenceInMs} from "../view/date-formatting.js";
export const sortTripsByPrice = (tripA, tripB) => {
  return tripB.price - tripA.price;
};

export const sortingByTime = (tripA, tripB) => {
  return getTimeDifferenceInMs(tripB.startDate, tripB.endDate) - getTimeDifferenceInMs(tripA.startDate, tripA.endDate);
};
