import { getJson, getUrl } from '../Helpers.js';

export const abilityData = async function (query, curPokeName, flag) {
  try {
    const { effect_entries, pokemon: hiddenValue, name } = await getJson(
      getUrl(flag),
      query
    );

    const { effect, shortEffect } = getEffectsData(effect_entries);
    const ishidden = hiddenChecker(hiddenValue, curPokeName);

    return {
      name,
      shortEffect,
      effect,
      ishidden,
    };
  } catch (err) {
    throw err;
  }
};

const getEffectsData = function (arr, language = 'en') {
  return arr.reduce(
    (obj, entry) =>
      entry.language.name === language
        ? {
            ...obj,
            effect: entry.effect,
            shortEffect: entry.short_effect,
          }
        : obj,
    {}
  );
};

const hiddenChecker = function (arr, curPokeName) {
  return arr.reduce(
    (boolean, entry) =>
      entry.pokemon.name === curPokeName && entry.is_hidden
        ? !boolean
        : boolean,
    false
  );
};
