'use strict';

const Pokedex = class {
  #API_URL = 'https://pokeapi.co/api/v2/';
  #name;
  #sprite;
  #number;
  #abilities;
  #types;
  #color;
  #stats;
  #evolutions;
  #alternativeForms;
  #moves;

  async getPokemonData(poke) {
    try {
      /////////////////////////////////
      //Pokemon DATA

      // prettier - ignore;
      const [basicData, specificData] = await Promise.all([
        fetch(`${this.#API_URL}pokemon-species/${poke}/`).then(response => {
          if (!response.ok) throw new Error(response.url);
          return response.json();
        }),
        fetch(`${this.#API_URL}pokemon/${poke}/`).then(response => {
          if (!response.ok) throw new Error(response.url);
          return response.json();
        }),
      ]);

      /////////////////////////////////
      //Evolution DATA

      const evolutionResponse = await fetch(basicData.evolution_chain.url);
      const { chain } = await evolutionResponse.json();

      /////////////////////////////////
      // Moves DATA

      const moveUrls = specificData.moves.slice(0, 6).map(obj => obj.move.url);

      const movesData = await Promise.all(
        moveUrls.map(url => fetch(url).then(response => response.json()))
      );

      /////////////////////////////////
      // Storing DATA
      this.#name = specificData.name;
      this.#sprite = specificData.sprites.front_default;
      this.#number = specificData.id;
      this.#color = basicData.color.name;
      this.#abilities = this._getAbilities(specificData.abilities);
      this.#types = this._getTypes(specificData.types);
      this.#alternativeForms = this._getAlternativeForms(basicData.varieties);
      this.#evolutions = this._isEevee(chain);
      this.#stats = this._getStats(specificData.stats);
      this.#moves = this._getMoves(movesData);

      return {
        name: this.#name,
        sprite: this.#sprite,
        number: this.#number,
        abilities: this.#abilities,
        types: this.#types,
        color: this.#color,
        stats: this.#stats,
        evolutions: this.#evolutions,
        alternativeForms: this.#alternativeForms,
        moves: this.#moves,
      };
    } catch (err) {
      throw err;
    }
  }

  _isEevee(chain) {
    const [evolutions] = chain.evolves_to;
    return this.#name !== 'eevee'
      ? [
          chain.species.name,
          evolutions?.species.name ?? '',
          evolutions?.evolves_to[0]?.species.name ?? '',
        ]
          .join(' ')
          .trim()
          .split(' ')
      : [chain.species.name, ...chain.evolves_to.map(evo => evo.species.name)];
  }

  _getAbilities(abilities) {
    return abilities.map(obj => obj.ability.name);
  }

  _getTypes(types) {
    return types.map(obj => obj.type.name);
  }

  _getAlternativeForms(forms) {
    return forms
      .reduce(
        (arr, poke) =>
          poke.pokemon.name !== this.#name ? [...arr, poke.pokemon.name] : arr,
        []
      )
      .slice(0, 3);
  }

  _getStats(stats) {
    const [
      { base_stat: hp },
      { base_stat: atk },
      { base_stat: def },
      { base_stat: spDef },
      { base_stat: spAtk },
      { base_stat: spd },
    ] = stats;

    return [
      ['HP', hp],
      ['Attack', atk],
      ['Special Atk', spAtk],
      ['Defense', def],
      ['Special Def', spDef],
      ['Speed', spd],
    ];
  }

  _getMoves(moves) {
    return moves.map(movInfo => {
      const { name, type, power, damage_class: dmgType } = movInfo;

      return {
        name: name,
        type: type.name,
        power: power ? power : '--',
        dmgType: dmgType.name,
      };
    });
  }
};

const pokedex = new Pokedex();

const App = class {
  #pokedex = document.querySelector('.pokedex');
  #form = document.querySelector('.form');
  #input = document.querySelector('.form__input');
  #button = document.querySelector('.form__button');
  #pokeInfo = document.querySelector('.pokedex__pokemon');
  #pokeName = document.querySelector('.heading-1');
  #pokeTypes = document.querySelector('.pokedex__types');
  #pokeAbilities = document.querySelector('.pokedex__abilities');
  #pokeEvolutions = document.querySelector('.pokedex__evolutions');
  #pokeAltForms = document.querySelector('.pokedex__altForms');
  #pokeStats = document.querySelector('.pokedex__stats');
  #pokeMoveset = document.querySelector('.pokedex__moveset');
  #pokemon;
  //prettier-ignore
  #types = {
    normal: '🐵', fighting: '🥊', flying: '🌪', poison: '🍄', ground: '🏜', rock: '🪨', bug: '🐛', ghost: '👻', steel: '⛓', fire: '🔥', water: '💧', grass: '🌱', electric: '⚡️', psychic: '🔮', ice: '❄️', dragon: '🐉', fairy: '🧚‍♂️', dark: '🦉',
  };

  constructor() {
    this.searchHandler();
  }

  searchHandler() {
    this.#form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();

        this.resultHandler();
      }.bind(this)
    );
  }

  getInputValue() {
    const inputValue = this.#input.value.toLowerCase().trim();

    if (!inputValue.match(/^[a-z0-9]+$/)) return;

    this.#input.value = '';
    this.#input.blur();
    return inputValue;
  }

  renderSpinner() {
    this.#pokedex.innerHTML = '';

    const markup = `
    <div class="spinner">
      <svg>
        <use href="img/icons.svg#icon-loader"></use>
      </svg>
    </div>
    `;

    this.#pokedex.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMessage(message) {
    this.#pokedex.innerHTML = '';

    const markup = `
    <div class="message message__error">
      <div class="message__img">
      <img
      src="img/pikachu.svg"
      alt="Pikachu"
      class="message__pikachuImg"
      />
    </div>
      <p>${message}</p>
      <p>Please, try again. :)</p>
    </div>
    `;

    this.#pokedex.insertAdjacentHTML('afterbegin', markup);
  }

  async resultHandler() {
    try {
      this.renderSpinner();

      const pokemonId = this.getInputValue();
      this.#pokemon = await pokedex.getPokemonData(pokemonId);

      this.updateCssColors();
      this.renderPokedex(this.#pokemon);
    } catch (err) {
      const message = err.message.includes('undefined')
        ? `405: Input can not include symbols or be empty`
        : `404: Can not find that pokemon`;

      this.renderErrorMessage(message);
    }
  }

  renderPokedex(pokemon) {
    this.#pokedex.innerHTML = '';

    const markup = `

      <header class="pokedex__pokemon">
      ${this.renderPokemonInfo(pokemon)}
      </header>

      <section class="pokedex__description">
        <h2 class="heading-2 effectTitles pokedex__description-title">
          Evolution Chain
        </h2>

        <ul class="pokedex__forms pokedex__evolutions">
          ${this.renderEvolutions(pokemon)}
        </ul>

        <h2 class="heading-2 effectTitles pokedex__description-title">
          Alternative Forms
        </h2>

        <ul class="pokedex__forms pokedex__altForms">
          ${this.renderAlternativeForm(pokemon)}
        </ul>
      </section>

      <section class="pokedex__stadistics">
        <h2 class="heading-2 effectTitles">Base Stats</h2>
        <ul class="pokedex__stats">
          ${this.renderPokemonStats(this.#pokemon)}
        </ul>
      </section>

      <section class="pokedex__moves">
        <h2 class="heading-2 effectTitles">Moveset</h2>
        <ul class="pokedex__moveset">
          ${this.renderMoveset(this.#pokemon)}
        </ul>

    `;

    this.#pokedex.insertAdjacentHTML('afterbegin', markup);
  }

  renderPokemonInfo(pokemon) {
    const markup = `
      <div class="pokedex__sprite">
        <img src="${this.#pokemon.sprite}" alt="${
      this.#pokemon.name
    }" class="pokedex__img" />
      </div>
      <div class="pokedex__info">
      <span class="heading-2 pokedex__number">#${this.#pokemon.number}</span>
        <h1 class="heading-1 effect">${this.firstLetterUpper(
          this.#pokemon.name
        )}</h1>
        <h3 class="heading-3">Types</h3>
        <ul class="pokedex__types">
          ${this.renderType(this.#pokemon.types)}
        </ul>
        <h3 class="heading-3">Abilities</h3>
        <ul class="pokedex__abilities">
          ${this.renderAbility(this.#pokemon.abilities)}
        </ul>
      </div>
    `;

    return markup;
  }

  renderType(types) {
    return types
      .map(
        type =>
          `<li class="pokedex__type">${this.firstLetterUpper(type)} ${
            this.#types[type]
          }</li>`
      )
      .join('');
  }

  renderAbility(abilities) {
    return abilities
      .map(
        ability =>
          `<li class="pokedex__ability">${this.firstLetterUpper(
            ability.replace(/-/g, ' ')
          )}</li>`
      )
      .join('');
  }

  renderPokemonStats(pokemon) {
    //prettier-ignore
    const markup = this.#pokemon.stats
      .map(stat => `<li class="pokedex__stat"><span class="bold">${stat.slice(0,1)}: </span>${stat.slice(1)}</li>`)
      .join('');

    return markup;
  }

  renderEvolutions(pokemon) {
    const markup =
      this.#pokemon.evolutions.length === 1
        ? `<li class="pokedex__alternative">This Pokemon do not evolve!</li>`
        : this.#pokemon.evolutions
            .map(
              evolution =>
                `<li class="pokedex__alternative">${this.firstLetterUpper(
                  evolution
                )}</li>`
            )
            .join('');

    return markup;
  }

  renderAlternativeForm(pokemon) {
    const markup =
      this.#pokemon.alternativeForms.length === 0
        ? `<li class="pokedex__alternative">This Pokemon do not have others forms!</li>`
        : this.#pokemon.alternativeForms
            .map(
              form =>
                `<li class="pokedex__alternative">${this.firstLetterUpper(
                  form.replace(/-/g, ' ')
                )}</li>`
            )
            .join('');
    return markup;
  }

  renderMoveset(pokemon) {
    const dmgType = {
      physical: '💥',
      special: '✨',
      status: '🦠',
    };

    const markup =
      this.#pokemon.moves.length !== 0
        ? this.#pokemon.moves
            .map(move => {
              return `
      <li class="pokedex__move">
        <span class='pokedex__move--name'><span class="bold">Name: </span>${this.firstLetterUpper(
          move.name.replace(/-/g, ' ')
        )}</span>
        <span class='pokedex__move--dmgType'><span class="bold">Class: </span>${
          dmgType[move.dmgType]
        }</span>
        <span class='pokedex__move--type'><span class="bold">Type: </span>${
          this.#types[move.type]
        }</span>
        <span class='pokedex__move--power'><span class="bold">Power: </span>${
          move.power
        }</span>
      </li>
      `;
            })
            .join('')
        : `<li class="pokedex__alternative">Sorry, we do not have moves from this Pokemon yet.</li>`;

    return markup;
  }

  updateCssColors() {
    const hexColor = (primary, primaryDark) => ({
      primary: primary,
      primaryDark: primaryDark,
      primaryLight: `${primary}4d`,
    });

    const setCssProperty = (cssVariable, value) =>
      document.documentElement.style.setProperty(cssVariable, value);

    const colors = {
      bug: hexColor('#afd275', '#1164466'),
      dark: hexColor('#564f6f', '#2d283E'),
      dragon: hexColor('#9fedd7', '#026670'),
      electric: hexColor('#fbe8a6', '#ffbb00'),
      fairy: hexColor('#ffcb9a4', '#edc7b7'),
      fighting: hexColor('#c3073f', '#950740'),
      fire: hexColor('#ff585f', '#501b1d'),
      flying: hexColor('#8ee4af', '#8ee4af'),
      ghost: hexColor('#2f2fa2', '#242582'),
      grass: hexColor('#5ec576', '#4bbb7d'),
      ground: hexColor('#f4e4c1', '#e4c580'),
      ice: hexColor('#3feee6', '#55BCC9'),
      normal: hexColor('#97aabd', '#97aabd'),
      poison: hexColor('#190061', '#0c0032'),
      psychic: hexColor('#f070a1', '#d83f87'),
      rock: hexColor('#8590aa', '#687864'),
      steel: hexColor('#a8d0e6', '#6b6E70'),
      water: hexColor('#90ccf4', '#5da2d5'),
    };

    const pokemonColor = colors[this.#pokemon.types.slice(0, 1).join('')];

    setCssProperty('--color-primary', pokemonColor.primary);
    setCssProperty('--color-primary-dark', pokemonColor.primaryDark);
    setCssProperty('--color-primary-30', pokemonColor.primaryLight);
  }

  firstLetterUpper(str) {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
  }
};

const app = new App();
