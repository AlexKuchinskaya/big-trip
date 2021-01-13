import {generateTripPointDates} from "./date-generation";
import {getRandomInteger, getRandomNumberOfElements} from "../utils/common.js";

const MAX_NUMBER_SENTENCES = 5;
const MIN_RANDOM_NUMBER_TYPES = 0;
const MIN_RANDOM_NUMBER = 1;
const MIN_PRICE = 20;
const MAX_PRICE = 200;
const MAX_RANDOM_PICTURES = 1000;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateAdditionalOptions = () => {
  const additionalOffers = [
    {
      type: `Uber`,
      name: `Order Uber`,
      price: 20
    },
    {
      type: `luggage`,
      name: `Add luggage`,
      price: 50
    },
    {
      type: `comfort`,
      name: `Switch to comfort`,
      price: 80
    },
    {
      type: `car`,
      name: `Rent a car`,
      price: 200
    },
    {
      type: `breakfast`,
      name: `Add breakfast`,
      price: 50
    },
    {
      type: `tickets`,
      name: `Book tickets`,
      price: 40
    },
    {
      type: `city`,
      name: `Lunch in city`,
      price: 30
    },
  ];
  const randomAdditionalOptions = getRandomNumberOfElements(additionalOffers, 0, 5);
  return randomAdditionalOptions;
};

const generateTypeTripPoint = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(MIN_RANDOM_NUMBER_TYPES, types.length - 1);

  return types[randomIndex];
};

const generateDestinations = () => {
  const destinations = [
    `Amsterdam`,
    `Madrid`,
    `Chamonix`,
    `Geneva`,
    `Warsaw`
  ];
  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const generatePrice = () => {
  return getRandomInteger(MIN_PRICE, MAX_PRICE);
};

const generateInformationOfDestinations = () => {
  const information = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const randomSentences = getRandomNumberOfElements(information, MIN_RANDOM_NUMBER, MAX_NUMBER_SENTENCES);
  return randomSentences;
};

const generateDestinationPhotos = () => {
  let photos = [];
  for (let i = 0; i < getRandomInteger(1, 6); i++) {
    photos.push(`http://picsum.photos/248/152?${getRandomInteger(MIN_RANDOM_NUMBER, MAX_RANDOM_PICTURES)}`);
  }
  return photos;
};
export const generateTripPoint = (index) => {
  const {startDate, endDate} = generateTripPointDates(index);
  return {
    id: generateId(),
    typeTripPoint: generateTypeTripPoint(),
    destination: generateDestinations(),
    startDate,
    endDate,
    price: generatePrice(),
    additionalOptions: generateAdditionalOptions(),
    informationDestination: generateInformationOfDestinations(),
    destinationPhotos: generateDestinationPhotos(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
