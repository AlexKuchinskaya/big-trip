import Abstract from "./abstract";
import {replace} from "../utils/render.js";

export default class SmartView extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(newData, justDataUpdating) {
    if (!newData) {
      return;
    }
    this._data = Object.assign(
        {},
        this._data,
        newData
    );
    if (justDataUpdating) {
      return;
    }
    this.updateElement();
  }

  updateElement() {
    const previousElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(newElement, previousElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
