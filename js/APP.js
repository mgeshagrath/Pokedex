import { getPokemonData } from './Data/PokemonData.js';

import { renderPokedex } from './Render/RenderPokedex.js';
import { renderSpinner } from './Render/RenderSpinner.js';
import { renderNewMoveSetAndPagination } from './Render/RenderNewMovNPag.js';
import { renderErrorMsg } from './Render/RenderErrorMessage.js';
import { renderAbilityPopup } from './Render/RenderAbilityPopup.js';
import { renderMovePopup } from './Render/RenderMovePopup.js';

import { handleCssClass, updateCssColors } from './Helpers.js';

export const appHandler = async function (pokemon, ...elements) {
  const [pokedex, popup, popupBackground] = elements;
  try {
    //prettier-ignore
    const emojiTypeObj = Object.freeze({
    normal: '⚪️', fighting: '🥊', flying: '🌪', poison: '🍄', ground: '🏜', rock: '⛰', bug: '🐛', ghost: '👻', steel: '⛓', fire: '🔥', water: '💧', grass: '🌱', electric: '⚡️', psychic: '🔮', ice: '❄️', dragon: '🐉', fairy: '🧚‍♂️', dark: '🦉',
    });

    renderSpinner(pokedex);

    const pokemonState = await Object.freeze(getPokemonData(pokemon));

    updateCssColors(pokemonState.types);
    renderPokedex(pokemonState, pokedex, emojiTypeObj);

    const ability = document.querySelector('.pokedex__abilities');
    const movesPagination = document.querySelector('.pagination');
    const movesetWrapper = document.querySelector('.pokedex__moveset');

    !pokemonState.moveset.length &&
      handleCssClass(movesetWrapper, 'display-block', 'pokedex__moveset');

    //prettier-ignore
    ability.addEventListener('click', renderAbilityPopup(popup, popupBackground, pokemonState));

    // prettier-ignore
    movesPagination.addEventListener('click', renderNewMoveSetAndPagination(pokemonState, movesetWrapper, movesPagination));

    // prettier-ignore
    movesetWrapper.addEventListener('click', renderMovePopup(popup, popupBackground));
  } catch (err) {
    renderErrorMsg(err, pokedex);
  }
};
