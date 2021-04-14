import { movesetData } from '../Data/MovesetData.js';

import { renderPopup } from './RenderPopup.js';
import { renderSpinner } from './RenderSpinner.js';

import { showPopup, handleCssClass } from '../Helpers.js';

export const renderMovePopup = function (popup, popupBackground) {
  return async function (e) {
    e.preventDefault();
    try {
      const flag = 'MOVESET';
      const getElement = e.target.closest('.pokedex__move');

      if (!getElement) return;

      renderSpinner(popup);
      // prettier-ignore
      handleCssClass(popup, 'popup__moveset-position', 'popup__abilities-position')
      showPopup(popup, popupBackground);

      const query = getElement.dataset.goto;
      const movesetState = await Object.freeze(movesetData(query, flag));

      renderPopup(movesetState, popup, flag);
    } catch (err) {
      throw err;
    }
  };
};
