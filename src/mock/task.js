import {generateTripPointDates} from "./date-generation";
import {getRandomInteger, getRandomNumberOfElements} from "../utils/common.js";
import {types} from "../const/const.js";

const MAX_NUMBER_SENTENCES = 5;
const MIN_RANDOM_NUMBER_TYPES = 0;
const MIN_RANDOM_NUMBER = 1;
const MIN_PRICE = 20;
const MAX_PRICE = 200;
const MAX_RANDOM_PICTURES = 1000;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);


export const offers = [
  {
    type: `taxi`,
    allOffers: [
      {
        title: `Order Uber`,
        price: 20
      },
      {
        title: `Choose the radio station"`,
        price: 5
      },
      {
        title: `Choose the seat"`,
        price: 40
      },
      {
        title: `Upgrade to a business class`,
        price: 400
      },
      {
        title: `Choose the color"`,
        price: 30
      }
    ]
    // taxi: [{name: `1`, pirce: 20}, {name: `2`, pirce: 200}],
  },
  {
    type: `bus`,
    allOffers: [
      {
        title: `Book tickets`,
        price: 20
      },
      {
        title: `Choose the radio station`,
        price: 5
      },
      {
        title: `Choose the seat`,
        price: 40
      },
      {
        title: `Upgrade to a business class`,
        price: 300
      },
      {
        title: `Choose the color`,
        price: 10
      }
    ]
  },
  {
    type: `train`,
    allOffers: [
      {
        title: `Book tickets`,
        price: 20
      },
      {
        title: `Choose the meal`,
        price: 5
      },
      {
        title: `Choose the seat"`,
        price: 40
      },
      {
        title: `Upgrade to a business class`,
        price: 300
      },
      {
        title: `Choose the coach`,
        price: 10
      }
    ]
  },
  {
    type: `ship`,
    allOffers: [
      {
        title: `Book tickets`,
        price: 20
      },
      {
        title: `Choose the meal`,
        price: 5
      },
      {
        title: `Choose the seat"`,
        price: 40
      },
      {
        title: `Upgrade to a business class`,
        price: 300
      },
      {
        title: `Choose the ship`,
        price: 10000
      }
    ]
  },
  {
    type: `transport`,
    allOffers: [
      {
        title: `Book tickets`,
        price: 20
      },
      {
        title: `Choose the meal`,
        price: 5
      },
      {
        title: `Choose the seat"`,
        price: 40
      },
      {
        title: `Upgrade to a business class`,
        price: 300
      },
      {
        title: `Choose the transport`,
        price: 1000
      }
    ]
  },
  {
    type: `drive`,
    allOffers: [
      {
        title: `Book tickets`,
        price: 20
      },
      {
        title: `Choose the meal`,
        price: 5
      },
      {
        title: `Choose the seat`,
        price: 40
      },
      {
        title: `Upgrade to a business class`,
        price: 300
      },
      {
        title: `Choose the driver`,
        price: 200
      }
    ]
  },
  {
    type: `flight`,
    allOffers: [
      {
        title: `Book tickets`,
        price: 100
      },
      {
        title: `Choose the meal`,
        price: 50
      },
      {
        title: `Choose the seat`,
        price: 60
      },
      {
        title: `Upgrade to a business class`,
        price: 100
      },
      {
        title: `Choose the airport`,
        price: 230
      }
    ]
  },
  {
    type: `check-in`,
    allOffers: [
      {
        title: `Book a room`,
        price: 100
      },
      {
        title: `Choose the meal`,
        price: 50
      },
      {
        title: `Choose a view`,
        price: 60
      },
      {
        title: `Upgrade to a suite`,
        price: 200
      },
      {
        title: `Choose a check-in time`,
        price: 30
      }
    ]
  },
  {
    type: `sightseeing`,
    allOffers: [
      {
        title: `Book an excurssion`,
        price: 100
      },
      {
        title: `Choose the guide`,
        price: 50
      },
      {
        title: `Choose a transport`,
        price: 60
      },
      {
        title: `Upgrade to an individual excurssion`,
        price: 200
      },
      {
        title: `Choose monuments`,
        price: 30
      }
    ]
  },
  {
    type: `restaurant`,
    allOffers: [
      {
        title: `Book the restaurant`,
        price: 100
      },
      {
        title: `Choose a meal`,
        price: 50
      },
      {
        title: `Choose drinks`,
        price: 60
      },
      {
        title: `Book a champaign`,
        price: 200
      },
      {
        title: `Choose vegetarian`,
        price: 30
      }
    ]
  },
];

// const additionalOffers = [
//   {
//     type: `taxi`,
//     name: `Order Uber`,
//     price: 20
//   },
//   {
//     type: `bus`,
//     name: `Add luggage`,
//     price: 50
//   },
//   {
//     type: `ship`,
//     name: `Switch to comfort`,
//     price: 80
//   },
//   {
//     type: `transport`,
//     name: `Rent a car`,
//     price: 200
//   },
//   {
//     type: `drive`,
//     name: `Add breakfast`,
//     price: 50
//   },
//   {
//     type: `flight`,
//     name: `Book tickets`,
//     price: 40
//   },
//   {
//     type: `check-in`,
//     name: `Lunch in city`,
//     price: 30
//   },
// ];

export const filerOffersByType = (offerType) => {
  for (let offer of offers) {
    if (offer.type === offerType) {
      console.log(`allOffers`, offer.allOffers)
      return offer.allOffers;
    }
  }
}
// export const filerOffersByType = (offerType) => {
//   offers.filter((offer) => {
//     if (offer.type === offerType) {
//       console.log(offer.allOffers)
//       return offer.allOffers;
//     }
//   });
// };

const generateAdditionalOptions = (appliedType) => {
  let offersFilteredByType = filerOffersByType(appliedType);
  const randomAdditionalOptions = getRandomNumberOfElements(offersFilteredByType, 0, 5);
  console.log(`appliedType`, appliedType)
  console.log(`offersFilteredByType`, offersFilteredByType)
  console.log (`randomOptions`, getRandomNumberOfElements(offersFilteredByType, 0, 5))
  return randomAdditionalOptions;
};

const generateTypeTripPoint = () => {
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
