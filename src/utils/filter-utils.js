
import {FilterType} from "../const/const.js";
import dayjs from "dayjs";
const today = dayjs(new Date());

export const filter = {
  [FilterType.EVERYTHING]: (trips) => {
    return trips;
  },
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => trip.startDate.isAfter(today)),
  [FilterType.PAST]: (trips) => trips.filter((trip) => trip.endDate.isBefore(today))
}
