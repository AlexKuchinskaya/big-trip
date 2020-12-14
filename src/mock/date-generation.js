import dayjs from "dayjs";

export const generateTripPointDates = (index) => {
  let endDate;
  const startDate = dayjs(`2021-05-05 12:35`).add(index, `day`);
  const caseNumber = index % 3;
  if (caseNumber === 0) {
    endDate = startDate.add(30, `minute`);
  } else if (caseNumber === 1) {
    endDate = startDate.add(12, `hour`);
  } else {
    endDate = startDate.add(3, `days`);
  }
  return {
    startDate, endDate
  };
};
