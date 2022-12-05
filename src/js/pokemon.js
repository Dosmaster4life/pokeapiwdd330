import PokeDetails from './pokemonDetails.js';

import { loadHeaderFooter, getParam } from './utils.js';

loadHeaderFooter();

const pokemonId = getParam('id');

const pokeDetails = new PokeDetails(pokemonId);
pokeDetails.init();