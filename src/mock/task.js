import {generateTripPointDates} from "./date-generation.js";
import {offersMock} from "./offers.js";
import {destinationsMock} from "./destinations.js";
import {getRandomInteger, getRandomNumberOfElements} from "../utils/common.js";
import {types} from "../const/const.js";

const MIN_RANDOM_NUMBER_TYPES = 0;
const MIN_PRICE = 20;
const MAX_PRICE = 200;

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateAdditionalOptions = (appliedType) => {
  const offersFilteredByType = offersMock.find((offer) => {
    return offer.type === appliedType;
  });
  const randomAdditionalOptions = getRandomNumberOfElements(offersFilteredByType.offers, 0, 5);
  return randomAdditionalOptions;
};

const generateTypeTripPoint = () => {
  const randomIndex = getRandomInteger(MIN_RANDOM_NUMBER_TYPES, types.length - 1);

  return types[randomIndex];
};

const generateDestinations = () => {

  const randomIndex = getRandomInteger(0, destinationsMock.length - 1);
  return destinationsMock[randomIndex].name;
};

const generatePrice = () => {
  return getRandomInteger(MIN_PRICE, MAX_PRICE);
};

export const generateTripPoint = (index) => {
  const generatedTypeTrip = generateTypeTripPoint();
  const {startDate, endDate} = generateTripPointDates(index);
  return {
    id: generateId(),
    typeTripPoint: generatedTypeTrip,
    destination: generateDestinations(),
    startDate,
    endDate,
    price: generatePrice(),
    appliedOffers: generateAdditionalOptions(generatedTypeTrip),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
