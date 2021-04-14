import { listMarkup, listElementWithLinkMarkup } from '../Helpers.js';

export const detailsMarkup = function (state, typeEmojis) {
  return `
  <header class="pokedex__pokemon">
    <div class="pokedex__sprite">
      <img src="${state.sprite}" alt="${state.name}" class="pokedex__img" />
    </div>
    <div class="pokedex__info">
    <span class="heading-2 pokedex__number">#${state.id}</span>

      <h1 class="heading-1 effect">${state.name}</h1>

      <h3 class="heading-3">Types</h3>
      <ul class="pokedex__types">
        ${listMarkup(state.types, 'basicBorderStyle', typeEmojis)}
      </ul>

      <h3 class="heading-3">Abilities</h3>
      <ul class="pokedex__abilities">
        ${listElementWithLinkMarkup(state.abilities, 'pokedex__ability')}
      </ul>
    </div>
  </header>
`;
};
