import {getRandomNumberOfElements} from "../utils/common.js";
const MIN_RANDOM_NUMBER = 1;
const MAX_NUMBER_SENTENCES = 5;
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

export const destinationsMock = [
  {
    description: generateInformationOfDestinations(),
    name: `Amsterdam`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Amsterdam parliament building`
      }
    ]
  },
  {
    description: generateInformationOfDestinations(),
    name: `Madrid`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Madrid parliament building`
      }
    ]
  },
  {
    description: generateInformationOfDestinations(),
    name: `Chamonix`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Chamonix parliament building`
      }
    ]
  },
  {
    description: generateInformationOfDestinations(),
    name: `Warsaw`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Warsaw parliament building`
      }
    ]
  },
  {
    description: generateInformationOfDestinations(),
    name: `Geneva`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Geneva parliament building`
      }
    ]
  },
];
