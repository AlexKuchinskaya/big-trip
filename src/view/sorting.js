const sortingElements = [
  {
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
    id: `time`,
    label: `Time`,
    isSortable: true,
  },
  {
    id: `price`,
    label: `Price`,
    isSortable: true,
  },
  {
    id: `offer`,
    label: `Offer`,
    isSortable: false,
  },
];

const crateTripSortingElements = (currentSortingElement) => {
  return sortingElements.map((sortingElement) => ` <div class="trip-sort__item  trip-sort__item--${sortingElement.id}">
    <input
      id="sort-${sortingElement.id}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sortingElement.id}"
      ${currentSortingElement === sortingElement.id ? `checked` : ``}
      ${!sortingElement.isSortable ? `disabled` : ``}>
    <label
      class="trip-sort__btn"
      for="sort-${sortingElement.id}">${sortingElement.label}</label>
  </div>`).join(``);
};

export const createSortingTripTemplate = (currentSortingElement) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${crateTripSortingElements(currentSortingElement)}
  </form>`;
};
