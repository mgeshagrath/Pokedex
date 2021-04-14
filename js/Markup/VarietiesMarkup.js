import { listElementWithLinkMarkup, toUpperCase } from '../Helpers.js';

export const varietiesMarkup = function (state) {
  return `
    <section class="pokedex__description">
      <h2 class="heading-2 effectTitles pokedex__description-title">
        Evolution Chain
      </h2>

      <ul class="pokedex__forms pokedex__evolutions">
        ${
          state.evolutions.length !== 1
            ? listElementWithLinkMarkup(
                state.evolutions,
                'pokedex__evolution',
                '#'
              )
            : chainValidator('EVOLUTION')
        }
      </ul>

      <h2 class="heading-2 effectTitles pokedex__description-title">
        Alternative Forms
      </h2>

      <ul class="pokedex__forms pokedex__altForms">
      ${
        state.varieties.length !== 1
          ? differentFormsMarkup(state)
          : chainValidator('VARIETY')
      }
      </ul>
    </section>
  `;
};

const differentFormsMarkup = function (state) {
  return state.varieties
    .slice(0, 4)
    .filter(poke => poke !== state.name)
    .map(poke => `<li class="basicBorderStyle">${poke}</li>`)
    .join('');
};

const chainValidator = function (flag) {
  const EVOLUTION = 'EVOLUTION';
  const VARIETY = 'VARIETY';

  if (flag === EVOLUTION)
    return `<li class="basicBorderStyle">${toUpperCase(
      'This is a non-evolving pokemon!'
    )}</li>`;

  if (flag === VARIETY)
    return `<li class="basicBorderStyle">${toUpperCase(
      'This pokemon is unique!'
    )}</li>`;
};
