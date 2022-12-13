// run the api service function to get the list of pokemon

import {getAllPokemon} from './pokeapiService/apiService.js';
import {getPokemon} from './pokeapiService/apiService.js';
import {getSpecies} from './pokeapiService/apiService.js';
import { loadHeaderFooter } from './utils.js';
loadHeaderFooter();

// run the api service function to get the list of pokemon
getAllPokemon().then((pokemonList) => {


});

 //get a pokemons data
 getPokemon('pikachu').then((pokemonStats) => {
     
 });

//get a pokemons species data
getSpecies('25').then((pokemonStats) => {
    
});
