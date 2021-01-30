import Abstract from "./abstract.js";
import {MenuItem} from "../const/const.js";
const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn" href="#" name="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" name="${MenuItem.STATS}">Stats</a>
  </nav>`;
};

export default class SiteMenu extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    // const itemsMenu = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    // itemsMenu.forEach((element) => {
    //   element.classList.add(`trip-tabs__btn--active`);
    // });
    this._callback.menuClick(evt.target.name);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[name=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
