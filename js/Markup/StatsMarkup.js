import { listMarkup } from '../Helpers.js';

export const statsMarkup = function (state) {
  return `
  <section class="pokedex__stadistics">
    <h2 class="heading-2 effectTitles">Base Stats</h2>
    <ul class="pokedex__stats">
      ${listMarkup(state.stats, 'pokedex__stat')}
    </ul>
  </section>

`;
};
