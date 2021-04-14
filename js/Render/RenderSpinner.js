import { cleanAndInsertHTML } from '../Helpers.js';

export const renderSpinner = function (element) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="img/icons.svg#icon-loader"></use>
      </svg>
    </div>
    `;

  cleanAndInsertHTML(element, markup);
};
