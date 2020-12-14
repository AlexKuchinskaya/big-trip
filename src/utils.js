export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomExtraOffersFromZeroToFive = (additionalOffersArray) => {
  const MAX_NUMBER_EXTRA_OFFERS = 5;
  const MIN_NUMBER_EXTRA_OFFERS = 0;
  const randomNumberOfExtraOffers = getRandomInteger(MIN_NUMBER_EXTRA_OFFERS, MAX_NUMBER_EXTRA_OFFERS);
  let randomAdditionalOffers = [];
  if (randomNumberOfExtraOffers !== 0) {
    for (let i = 0; i < randomNumberOfExtraOffers; i++) {
      const randomElementFromArray = additionalOffersArray[Math.floor(Math.random() * additionalOffersArray.length)];
      randomAdditionalOffers.push(randomElementFromArray);
    }
  } else {
    randomAdditionalOffers = ``;
  }
  return randomAdditionalOffers;
};

export const getRandomNumberOfElements = (elements, min, max) => {
  let newElements = [];
  for (let i = 0; i < getRandomInteger(min, max); i++) {
    newElements.push(elements[getRandomInteger(min, elements.length)]);
  }
  return newElements;
};
