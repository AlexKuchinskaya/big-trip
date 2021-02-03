export const types = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

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

export const UserAction = {
  ADD_TRIP: `ADD_TRIP`,
  DELETE_TRIP: `DELETE_TRIP`,
  UPDATE_TRIP: `UPDATE_TRIP`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

