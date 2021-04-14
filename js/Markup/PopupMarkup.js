import { removeHypenStr } from '../Helpers.js';

export const popupMarkup = function (state, flag, emojiObj = '') {
  const ABILITY = 'ABILITY';
  const MOVESET = 'MOVESET';

  if (flag === ABILITY)
    return `
  <h3 class="popup__name">
    ${removeHypenStr(state.name)} <span class="popup__hidden">${
      state.ishidden ? 'Hidden' : ''
    }</span>
  </h3>

  <h4>Short Effect</h4>
  <p class="popup__info">${state.shortEffect}</p>
  
  <h4>Effect</h4>
  <p class="popup__specificinfo">
   ${state.effect}
  </p>
`;

  if (flag === MOVESET) {
    const objClassType = { physical: '💥', status: '🦠', special: '💫' };
    const className = 'popup__move-info';

    return `
  <h3 class="popup__name">
    ${removeHypenStr(state.name)}</h3>

  <h4>Effect</h4>
  <p class="popup__info">${state.effect}</p>
  
  <h4>Information</h4>
    <ul class="popup__move-data">
      <li class="${className}">Power: ${state?.power ?? '--'}</li>
      <li class="${className}">Class: ${objClassType[state.damageClass]}</li>
      <li class="${className}">PP: ${state.pp}</li>
      <li class="${className}">Type: ${state.type}</li>
      <li class="${className}">Accuracy: ${state?.accuracy ?? '--'}</li>
      <li class="${className}">Target: ${removeHypenStr(state.target)}</li>
    </ul>
`;
  }
};
