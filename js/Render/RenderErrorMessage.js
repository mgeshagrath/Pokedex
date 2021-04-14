import { errorMsgMarkup } from '../Markup/ErrorMessageMarkup.js';
import { cleanAndInsertHTML } from '../Helpers.js';

export const renderErrorMsg = function (err, element) {
  const markup = errorMsgMarkup(err);

  cleanAndInsertHTML(element, markup);
};
