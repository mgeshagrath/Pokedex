import { getJson, getUrl } from '../Helpers.js';

export const getPokemonData = async function (pokemon) {
  try {
    const urlPokemon = getUrl('POKEMON');
    const urlEspecie = getUrl('ESPECIE');

    // prettier-ignore
    const [mainData, secondaryData] = await Promise.all([
    getJson(urlPokemon, pokemon),
    getJson(urlEspecie, pokemon),
  ]);

    const { abilities, id, moves, stats, types, sprites, name } = mainData;
    const { evolution_chain, varieties } = secondaryData;

    const pokemonName = name;
    const pokemonId = id;
    const pokemonSprite = getAnimatedSprite(sprites);
    const pokemonAbilities = removeHyphen(
      getDataFromObjArray(abilities, 'ability', 'name')
    );
    const pokemonMoveset = removeHyphen(
      getDataFromObjArray(moves, 'move', 'name')
    ).sort();

    const [hp, attack, defense, spDef, spAtk, speed] = getDataFromObjArray(
      stats,
      'base_stat'
    );
    const pokemonTypes = getDataFromObjArray(types, 'type', 'name');
    const pokemonVarieties = removeHyphen(
      getDataFromObjArray(varieties, 'pokemon', 'name')
    );
    const { url: evolutionChain } = evolution_chain;

    const { chain } = await getJson(evolutionChain);

    const pokemonEvolutions = getEvolutionTree(chain);

    return {
      sprite: pokemonSprite,
      id: pokemonId,
      name: pokemonName,
      types: pokemonTypes,
      abilities: pokemonAbilities,
      moveset: pokemonMoveset,
      evolutions: pokemonEvolutions,
      varieties: pokemonVarieties,
      // prettier-ignore
      stats: [`HP: ${hp}`, `Attack: ${attack}`,`Defense: ${defense}`,`Special Defense: ${spDef}`,`Special Attack: ${spAtk}`,`Speed: ${speed}`],
    };
  } catch (err) {
    throw err;
  }
};

const getAnimatedSprite = sprite => {
  if (!sprite) return;

  return (
    sprite?.['versions']?.['generation-v']?.['black-white']?.['animated']?.[
      'front_default'
    ] ?? sprite.front_default
  );
};

const getEvolutionTree = function (chain) {
  const pokemonBase = chain.species.name;

  if (pokemonBase === 'eevee')
    return [
      pokemonBase,
      ...chain.evolves_to.map(eeveelution => eeveelution.species.name),
    ];

  const firstEvolution = chain.evolves_to[0]?.species.name ?? '';
  const secondEvolution =
    chain.evolves_to[0]?.evolves_to[0]?.species.name ?? '';

  return [pokemonBase, firstEvolution, secondEvolution]
    .join(' ')
    .trim()
    .split(' ');
};

const getDataFromObjArray = (arr, firstProperty, secondProperty = '') =>
  !secondProperty
    ? arr.map(obj => obj[firstProperty])
    : arr.map(obj => obj[firstProperty][secondProperty]);

const removeHyphen = arr => arr.map(entry => entry.replace(/-/g, ' '));
