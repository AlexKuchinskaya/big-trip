import dayjs from "dayjs";
import * as durationPlugin from "dayjs/plugin/duration";
dayjs.extend(durationPlugin);

const formatIntegerWithTwoDigits = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};


export const getTimeDifferenceInMs = (startDate, endDate) => {
  console.log(`endDate`, endDate)
  console.log(`startDate`, startDate)
  if (startDate === null) {
    startDate = 0;
  }
  if (endDate === null) {
    endDate = 0;
  }
  return endDate.diff(startDate);
};

const formatTimeDifference = (timeDifferenceInMs) => {
  const duration = dayjs.duration(timeDifferenceInMs);
  const formattedDays = formatIntegerWithTwoDigits(duration.days());
  const formattedHours = formatIntegerWithTwoDigits(duration.hours());
  const formattedMinutes = formatIntegerWithTwoDigits(duration.minutes());
  if (duration.asHours() < 1) {
    return `${formattedMinutes}M`;
  }
  if (duration.asDays() < 1) {
    return `${formattedHours}H ${formattedMinutes}M`;
  }
  return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
};

export const formatTimeDifferenceBetweenDates = (startDate, endDate) => {
  const diffInMs = getTimeDifferenceInMs(startDate, endDate);
  return formatTimeDifference(diffInMs);
};

export const getDurationInDays = (startDate, endDate) => {
  // const duration = dayjs.duration(endDate.diff(startDate));
  // return diffInMs.duration.asDays();
  return endDate.diff(startDate, `day`);
};

export const formatTime = (date) => {
  return date.format(`HH:mm`);
};

export const formatDate = (date) => {
  return date.format(`MMM D`);
};

export const formatDatePointEditing = (date) => {
  return dayjs(date).format(`DD/MM/YYYY HH:mm`);
};
