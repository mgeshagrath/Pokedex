import { listMarkup, getListOfMoves, toUpperCase } from '../Helpers.js';
import { MAX_RESULTS_PER_PAGE } from '../config.js';

export const movesetMarkup = function (state) {
  const firstPage = 1;
  const moveMarkup = state.moveset.length
    ? listMarkup(
        getListOfMoves(state.moveset, firstPage),
        'basicBorderStyle pokedex__move'
      )
    : `<li class="basicBorderStyle">${toUpperCase(
        'There is no data available from this pokemon yet'
      )}</li>`;

  return `
    <section class="pokedex__moves">
      <h2 class="heading-2 effectTitles">Moveset</h2>
      <ul class="pokedex__moveset">
      ${moveMarkup}
      </ul>
      <div class='pagination'>
      ${paginationMarkup(state.moveset, firstPage)}
      </div>
    </section>
  `;
};

export const paginationMarkup = function (
  movesArr,
  currentPage,
  maxResultsPerPage = MAX_RESULTS_PER_PAGE
) {
  const numPages = Math.ceil(movesArr.length / maxResultsPerPage);

  if (currentPage === 1 && numPages > 1) {
    return `
      <button data-goto="${
        currentPage + 1
      }" class="pagination__btn pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="pagination__btn-icon">
          <use href="img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  // last page

  if (currentPage === numPages && numPages > 1) {
    return `
      <button data-goto="${
        currentPage - 1
      }" class="pagination__btn pagination__btn--prev">
        <svg class="pagination__btn-icon">
          <use href="img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>

    `;
  }

  // other page

  if (currentPage < numPages) {
    return `
      <button data-goto="${
        currentPage + 1
      }" class="pagination__btn pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="pagination__btn-icon">
          <use href="img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
      <button data-goto="${
        currentPage - 1
      }" class="pagination__btn pagination__btn--prev">
        <svg class="pagination__btn-icon">
          <use href="img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>

`;
  }

  return '';
};
