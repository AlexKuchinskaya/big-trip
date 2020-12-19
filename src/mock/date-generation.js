import dayjs from "dayjs";
const DENOMINATOR_FOR_THREE_SITUATIONS = 3;
const MODULO_ZERO = 0;
const MODULO_ONE = 1;
const THIRTY_MINUTES = 30;
const TWELVE_HOURS = 12;
const THREE_DAYS = 3;

export const generateTripPointDates = (index) => {
  let endDate;
  const startDate = dayjs(`2021-05-05 12:35`).add(index, `day`);
  const divisionRemainder = index % DENOMINATOR_FOR_THREE_SITUATIONS;
  if (divisionRemainder === MODULO_ZERO) {
    endDate = startDate.add(THIRTY_MINUTES, `minute`);
  } else if (divisionRemainder === MODULO_ONE) {
    endDate = startDate.add(TWELVE_HOURS, `hour`);
  } else {
    endDate = startDate.add(THREE_DAYS, `days`);
  }
  return {
    startDate, endDate
  };
};
