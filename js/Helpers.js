export const getUrl = function (flag) {
  const URL = 'https://pokeapi.co/api/v2/';
  const POKEMON = 'POKEMON';
  const ESPECIE = 'ESPECIE';
  const ABILITY = 'ABILITY';
  const MOVESET = 'MOVESET';

  if (flag === POKEMON) return `${URL}pokemon/`;
  if (flag === ESPECIE) return `${URL}pokemon-species/`;
  if (flag === ABILITY) return `${URL}ability/`;
  if (flag === MOVESET) return `${URL}move/`;
};

export const getJson = async function (url, request = '') {
  try {
    const response = await fetch(`${url}${request}`);

    if (!response.ok) throw new Error(response.url);
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const getInputValue = function (input) {
  const value = input.value.toLowerCase().trim();

  if (!value.match(/^[a-z0-9]+$/)) return;

  input.value = '';
  input.blur();

  return value;
};

export const showPopup = (popup, popupbkg) => {
  popup.classList.remove('hidden');
  popupbkg.classList.remove('hidden');
};

export const hidePopup = (popup, popupbkg) => {
  popup.classList.add('hidden');
  popupbkg.classList.add('hidden');
};

export const listMarkup = (
  arr,
  className = 'basicBorderStyle',
  emojiObj = ''
) =>
  arr
    .map(
      entry =>
        `<li class="${className}" data-goto='${entry}'>${entry} ${
          emojiObj?.[entry] ?? ''
        }</li>`
    )
    .join('');

export const listElementWithLinkMarkup = function (
  state,
  className = '',
  flag = ''
) {
  return state
    .map(
      entry =>
        `<li class="basicBorderStyle "><a href='${flag}${entry}' class='linkReset ${className}' data-goto='${entry}'>${entry}</a></li>`
    )
    .join('');
};

export const addHypen = str => str.replaceAll(' ', '-');
export const removeHypenStr = str => str.replaceAll('-', ' ');
export const toUpperCase = str => str.toUpperCase();

export const cleanAndInsertHTML = function (
  element,
  markup,
  position = 'afterbegin'
) {
  element.innerHTML = '';

  element.insertAdjacentHTML(position, markup);
};

export const getListOfMoves = function (
  movesArr,
  currentPage,
  maxResultsPerPage = 9
) {
  const start = (currentPage - 1) * maxResultsPerPage; // 0;
  const end = currentPage * maxResultsPerPage; // 9;

  return movesArr.slice(start, end);
};

export const handleCssClass = function (element, classToAdd, classToRemove) {
  element.classList.add(classToAdd);
  element.classList.remove(classToRemove);
};

export const updateCssColors = function (pokemonType) {
  const colorPalette = (primary, primaryDark) => ({
    primary,
    primaryDark,
    primaryLight: `${primary}4d`,
  });

  const setCssProperty = (cssVariable, value) =>
    document.documentElement.style.setProperty(cssVariable, value);

  const type = pokemonType.slice(0, 1).join('');

  const colors = {
    bug: colorPalette('#afd275', '#afd275'),
    dark: colorPalette('#564f6f', '#2d283E'),
    dragon: colorPalette('#9fedd7', '#026670'),
    electric: colorPalette('#fbe8a6', '#ffbb00'),
    fairy: colorPalette('#f070a1', '#d83f87'),
    fighting: colorPalette('#c3073f', '#950740'),
    fire: colorPalette('#ff585f', '#501b1d'),
    flying: colorPalette('#8ee4af', '#8ee4af'),
    ghost: colorPalette('#2f2fa2', '#242582'),
    grass: colorPalette('#5ec576', '#4bbb7d'),
    ground: colorPalette('#f4e4c1', '#e4c580'),
    ice: colorPalette('#3feee6', '#55BCC9'),
    normal: colorPalette('#97aabd', '#97aabd'),
    poison: colorPalette('#190061', '#0c0032'),
    psychic: colorPalette('#f070a1', '#d83f87'),
    rock: colorPalette('#8590aa', '#687864'),
    steel: colorPalette('#a8d0e6', '#6b6E70'),
    water: colorPalette('#90ccf4', '#5da2d5'),
  };

  const pokemonColor = colors[type];

  setCssProperty('--color-primary', pokemonColor.primary);
  setCssProperty('--color-primary-dark', pokemonColor.primaryDark);
  setCssProperty('--color-primary-30', pokemonColor.primaryLight);

  if (type === 'dark' || type === 'poison' || type === 'ghost')
    setCssProperty('--popup-font-color', '#fff');
  else setCssProperty('--popup-font-color', '#000');
};
