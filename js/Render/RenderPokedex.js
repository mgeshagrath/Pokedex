import { detailsMarkup } from '../Markup/DetailsMarkup.js';
import { statsMarkup } from '../Markup/StatsMarkup.js';
import { varietiesMarkup } from '../Markup/VarietiesMarkup.js';
import { movesetMarkup } from '../Markup/MovNPagMarkup.js';

import { cleanAndInsertHTML } from '../Helpers.js';

export const renderPokedex = function (pokemonState, pokedex, typeEmojis) {
  const markup = `
      ${detailsMarkup(pokemonState, typeEmojis)}
      ${varietiesMarkup(pokemonState)}
      ${statsMarkup(pokemonState)}
      ${movesetMarkup(pokemonState)}
    `;
  cleanAndInsertHTML(pokedex, markup);
};
