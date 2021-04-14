import { abilityData } from '../Data/AbilityData.js';

import { renderPopup } from './RenderPopup.js';
import { renderSpinner } from './RenderSpinner.js';

import { addHypen, showPopup, handleCssClass } from '../Helpers.js';

export const renderAbilityPopup = function (popup, popupBackground, state) {
  return async function (e) {
    e.preventDefault();
    try {
      const flag = 'ABILITY';

      const getElement = e.target.closest('.pokedex__ability');
      if (!getElement) return;

      renderSpinner(popup);
      handleCssClass(
        popup,
        'popup__abilities-position',
        'popup__moveset-position'
      );
      showPopup(popup, popupBackground);

      const query = addHypen(getElement.getAttribute('href'));
      const abilityState = await Object.freeze(
        abilityData(query, state.name, flag)
      );

      renderPopup(abilityState, popup, flag);
    } catch (err) {
      throw err;
    }
  };
};
