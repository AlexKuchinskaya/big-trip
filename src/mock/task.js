// import dayjs from "dayjs";
import {generateTripPointDates} from "./date-generation";
import {getRandomInteger, getRandomNumberOfElements} from "../utils.js";

const MAX_NUMBER_SENTENCES = 5;
const MIN_RANDOM_NUMBER = 1;
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

// const timeDifference = {
//   LessHour: 1,
//   LessDay: 2,
//   MoreDay: 3
// };

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
// const generateDate = () => {
//   const maxDaysGap = 7;
//   const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

//   return dayjs().add(daysGap, `day`).toDate();
//   // return dayjs() - содержит текущую дату
//   // toDate(); вернет нам нормальный объект типа date
// };

// const generateTime = () => {
//   const minHour = 0;
//   const maxHour = 23;
//   const minMinute = 0;
//   const maxMinute = 59;
//   const minDay = 1;
//   const maxDay = 31;
//   const randomHourStart = getRandomInteger(minHour, maxHour - 12);
//   const randomHourEnd = getRandomInteger(minHour + 12, maxHour);
//   const randomMinuteStart = getRandomInteger(minMinute, maxMinute);
//   const randomMinuteEnd = getRandomInteger(minMinute, maxMinute);


//   const randomSituation = getRandomInteger(1, 3);
//   const startTime = dayjs(`${randomHourStart}.${randomMinuteStart}`).date(getRandomInteger(minDay, maxDay - 15));
//   const endTime = dayjs().hour(`${randomHourEnd}`);

//   const getTimeDifference = () => {
//     if (randomSituation === timeDifference.LessHour) {
//       return `${endTime.diff(startTime, `minute`)}M`;
//     }
//     if (randomSituation === timeDifference.LessDay) {
//       const timeDifferenceHour = `${endTime.diff(startTime, `hour`)}H`;
//       const timeDifferenceMinute = `${endTime.diff(startTime, `minute`)}M`;
//       return `${timeDifferenceHour} ${timeDifferenceMinute}`;
//     }
//     if (randomSituation === timeDifference.MoreDay) {
//       const timeDifferenceDay = `${endTime.diff(startTime, `day`)}D`;
//       const timeDifferenceHour = `${endTime.diff(startTime, `hour`)}H`;
//       const timeDifferenceMinute = `${endTime.diff(startTime, `minute`)}M`;
//       return `${timeDifferenceDay} ${timeDifferenceHour} ${timeDifferenceMinute}`;
//     }
//   };
//   return {
//     // startTime: startTime.format(`HH:mm`),
//     // endTime: endTime.format(`HH:mm`),
//     startTime,
//     endTime,
//     durationTrip: getTimeDifference()
//   };
// };


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
    photos.push(`http://picsum.photos/248/152?${getRandomInteger(1, 1000)}`);
  }
  return photos;
};
export const generateTripPoint = (index) => {
  const {startDate, endDate} = generateTripPointDates(index);
  return {
    typeTripPoint: generateTypeTripPoint(),
    destination: generateDestinations(),
    startDate,
    endDate,
    price: generatePrice(),
    additionalOptions: additionalOffers,
    informationDestination: generateInformationOfDestinations(),
    destinationPhotos: generateDestinationPhotos(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
