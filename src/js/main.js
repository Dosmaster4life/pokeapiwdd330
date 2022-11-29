// run the api service function to get the list of pokemon

import {getAllPokemon} from './pokeapiService/apiService.js';
import {getPokemon} from './pokeapiService/apiService.js';

// run the api service function to get the list of pokemon
getAllPokemon().then((pokemonList) => {
console.log(pokemonList);

});

 //get a pokemons data
 getPokemon('pikachu').then((pokemonStats) => {
     console.log(pokemonStats);
 });