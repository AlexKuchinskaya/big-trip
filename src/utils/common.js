export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomNumberOfElements = (elements, min, max) => {
  let newElements = [];
  for (let i = 0; i < getRandomInteger(min, max); i++) {
    newElements.push(elements[getRandomInteger(min, elements.length - 1)]);
  }
  return newElements;
};
