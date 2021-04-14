import { getJson, getUrl, addHypen } from '../Helpers.js';

export const movesetData = async function (query, flag) {
  try {
    const moveQuery = addHypen(query).toLowerCase();

    const {
      accuracy,
      damage_class: damageClass,
      effect_entries: effectEntries,
      power,
      pp,
      priority,
      stat_changes: statChanges,
      type,
      target,
      name,
    } = await getJson(getUrl(flag), moveQuery);

    const effect = getEffectDescription(effectEntries);

    return {
      name,
      effect,
      accuracy,
      power,
      pp,
      priority,
      statChanges,
      type: type.name,
      target: target.name,
      damageClass: damageClass.name,
    };
  } catch (err) {
    throw err;
  }
};

const getEffectDescription = function (arr) {
  const flag = ' $effect_chance% ';
  const [data] = arr.filter(entry => entry.language.name === 'en');

  return data.short_effect.replaceAll(flag, ' ');
};
