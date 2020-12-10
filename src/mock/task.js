import dayjs from "dayjs";
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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

  const randomIndex = getRandomInteger(0, types.length - 1);

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
  return getRandomInteger(20, 200);
};
const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
  // return dayjs() - содержит текущую дату
  // toDate(); вернет нам нормальный объект типа date
};

const generateTime = () => {
  const minHour = 0;
  const maxHour = 23;
  const minMinute = 0;
  const maxMinute = 59;
  const randomHour = getRandomInteger(minHour, maxHour);
  const randomMinute = getRandomInteger(minMinute, maxMinute);
  return dayjs(`${randomHour}.${randomMinute}`).format(`HH:mm`);

// const timeEnd = dayjs(`${randomHour}.${randomMinute}`).format(`HH:mm`);
// const timeBeginning = dayjs(`${randomHour}.${randomMinute}`).format(`HH:mm`);
// if (timeEnd != timeBeginning) {
//   const timeDifference = timeEnd.diff(timeBeginning, 'minute')
//     if (dayjs(timeDifference).isBefore('1', 'hour')) {
//       return dayjs(`${timeDifference}`).format(`m`);
//     }
//     if (more than twenty-four hours)
//     if (less than twenty-four hours )
// // }
};

// Время маршрута отображается в формате начало — окончание (например, «10:30 — 11:00»). Формат продолжительности нахождения в точке маршрута зависит от длительности:

// Менее часа: минуты (например, 23M);
// Менее суток: часы минуты (например, 02H 44M или 12H 00M, если минуты равны нулю);
// Более суток: дни часы минуты (например, 01D 02H 30M или 07D 00H 00M, если часы и/или минуты равны нулю).
// // создание новой сущности точка маршрута

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
  let randomSentences = [];
  for (let i = 0; i < 5; i++) {
    randomSentences.push(information[getRandomInteger(1, information.length)]);
  }
  return randomSentences;
};

const generateOfferType = () => {
  const additionalOfferName = [
    `Order Uber`,
    `Add luggage`,
    `Switch to comfort`,
    `Rent a car`,
    `Add breakfast`,
    `Book tickets`,
    `Lunch in city`
  ];
  const randomIndex = getRandomInteger(0, additionalOfferName.length - 1);

  return additionalOfferName[randomIndex];
};

const generateDestinationPhotos = () => {
  // return `http://picsum.photos/248/152?${getRandomInteger(1, 93)}`;
  let photos = [];
  for (let i = 0; i < getRandomInteger(1, 6); i++) {
    photos.push(`http://picsum.photos/248/152?${getRandomInteger(1, 1000)}`);
  }
  return photos;
};
export const generateTripPoint = () => {
  return {
    typeTripPoint: generateTypeTripPoint(),
    destination: generateDestinations(),
    date: generateDate(),
    time: generateTime(), // записывает только одно время, как сделать два
    price: generatePrice(),
    additionalOptions: {
      offerName: generateOfferType()
    },
    informationDestination: generateInformationOfDestinations(),
    destinationPhotos: generateDestinationPhotos(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
