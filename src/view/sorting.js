export const createSortingTripTemplate = () => {
  const crateTripSortingElements = (currentSortingElement) => {
    const sortingElements = [`day`, `event`, `time`, `price`, `offer`];
    return sortingElements.map((sortingElement) => ` <div class="trip-sort__item  trip-sort__item--${sortingElement}">
      <input
        id="sort-${sortingElement}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortingElement}"
        ${currentSortingElement === sortingElement ? `checked` : ``}
        ${sortingElement === (`event` || `offer`) ? `disabled` : ``}>
      <label
        class="trip-sort__btn"
        for="sort-${sortingElement}">${sortingElement}</label>
    </div>`).join(``);
  };
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${crateTripSortingElements()}
  </form>`;
};
// не работает с disabled +
