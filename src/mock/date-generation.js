import dayjs from "dayjs";
const DENOMINATOR_FOR_THREE_SITUATIONS = 3;
const MODULE_ZERO = 0;
const MODULE_ONE = 1;
const THIRTY_MINUTES = 30;
const TWELVE_HOURS = 12;
const THREE_DAYS = 3;

export const generateTripPointDates = (index) => {
  let endDate;
  const startDate = dayjs(`2021-05-05 12:35`).add(index, `day`);
  const caseNumber = index % DENOMINATOR_FOR_THREE_SITUATIONS;
  if (caseNumber === MODULE_ZERO) {
    endDate = startDate.add(THIRTY_MINUTES, `minute`);
  } else if (caseNumber === MODULE_ONE) {
    endDate = startDate.add(TWELVE_HOURS, `hour`);
  } else {
    endDate = startDate.add(THREE_DAYS, `days`);
  }
  return {
    startDate, endDate
  };
};
