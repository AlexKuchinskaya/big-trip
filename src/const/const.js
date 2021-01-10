export const sortingElements = [
  {
    sortType: `default`,
    id: `day`,
    label: `Day`,
    isSortable: true,
  },
  {
    id: `event`,
    label: `Event`,
    isSortable: false,
  },
  {
    sortType: `time`,
    id: `time`,
    label: `Time`,
    isSortable: true,
  },
  {
    sortType: `price`,
    id: `price`,
    label: `Price`,
    isSortable: true,
  },
  {
    id: `offer`,
    label: `Offers`,
    isSortable: false,
  },
];

export const SortTypes = {
  DEFAULT: `day`,
  PRICE_UP: `price`,
  TIME_UP: `time`
};
