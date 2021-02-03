import Observer from "../utils/observer.js";
import {FilterType} from "../const/const.js";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
    console.log(`this._activeFilter`, this._activeFilter)
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}

