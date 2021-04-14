import { appHandler } from './APP.js';

import { getInputValue, hidePopup } from './Helpers.js';

const form = document.querySelector('.form');
const pokedex = document.querySelector('.pokedex');
const popup = document.querySelector('.popup');
const popupBackground = document.querySelector('.popup__background');

const submitEvent = function (e) {
  e.preventDefault();

  const formInput = document.querySelector('.form__input');
  const query = getInputValue(formInput);

  appHandler(query, pokedex, popup, popupBackground);
};

const loadAndHashchangeEvent = function (e) {
  const pokemonName = e.currentTarget.location.hash.slice(1);

  if (!pokemonName) return;
  appHandler(pokemonName, pokedex, popup, popupBackground);
};

const hidePopupEvent = e => {
  if (e.key !== 'Escape') return;

  popup.classList.add('hidden');
  popupBackground.classList.add('hidden');
};

/////////////////////
// EVENTS

['hashchange', 'load', 'keydown'].forEach(ev =>
  window.addEventListener(
    ev,
    ev === 'keydown' ? hidePopupEvent : loadAndHashchangeEvent
  )
);

form.addEventListener('submit', submitEvent);

popupBackground.addEventListener(
  'click',
  e => e.target && hidePopup(popup, popupBackground)
);
