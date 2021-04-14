import { popupMarkup } from '../Markup/PopupMarkup.js';
import { cleanAndInsertHTML } from '../Helpers.js';

export const renderPopup = function (state, popup, flag) {
  const markup = popupMarkup(state, flag);

  cleanAndInsertHTML(popup, markup);
};
