import { listMarkup, getListOfMoves } from '../Helpers.js';
import { paginationMarkup } from './MovNPagMarkup.js';

export const newMovesetAndPaginationMarkup = function (state, goToPage, flag) {
  if (flag === 'MOVESET')
    return listMarkup(
      getListOfMoves(state.moveset, goToPage),
      'basicBorderStyle pokedex__move'
    );

  if (flag === 'PAGINATION') return paginationMarkup(state.moveset, goToPage);
};
