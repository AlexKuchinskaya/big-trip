import Abstract from "./abstract";

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
    let previousELement = this.getElement();
    const parent = previousELement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, previousELement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
