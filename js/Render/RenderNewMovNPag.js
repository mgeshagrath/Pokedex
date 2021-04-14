import { cleanAndInsertHTML } from '../Helpers.js';
import { newMovesetAndPaginationMarkup } from '../Markup/NewMovNPagMarkup.js';

// prettier-ignore
export const renderNewMoveSetAndPagination = function (pokemonState, movesetWrapper, paginationWrapper) {
    return function (e) {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      cleanAndInsertHTML(movesetWrapper, newMovesetAndPaginationMarkup(pokemonState, goToPage, 'MOVESET'));
      cleanAndInsertHTML(paginationWrapper, newMovesetAndPaginationMarkup(pokemonState, goToPage, 'PAGINATION'));
    };
  };
