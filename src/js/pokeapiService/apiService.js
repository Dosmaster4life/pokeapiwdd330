// This file contains all of the pokeapi service functions using the fetch api


// get a single pokemon from the pokeapi
export const getPokemon = (pokemon) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
        return data;
        });
    }
    
export const getSpecies = (pokemon) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
        return data;
        });
    }

export const getKantoPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((response) => response.json())
        .then((data) => {
        return data.results;
        });
    }
// get all the pokemon from the hoenn region
export const getHoennPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=386&offset=151')
        .then((response) => response.json())
        .then((data) => {
        return data.results;
        });
    }
// get all the pokemon from the sinnoh region
export const getSinnohPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=493&offset=386')
        .then((response) => response.json())
        .then((data) => {
        return data.results;
        });
    }
// get all the pokemon from the unova region
export const getUnovaPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=649&offset=493')
        .then((response) => response.json())    
        .then((data) => {
        return data.results;
        });
    }
// get all the pokemon from the kalos region
export const getKalosPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=721&offset=649')
        .then((response) => response.json())
        .then((data) => {
        return data.results;
        });
    }
// get all the pokemon from the alola region
export const getAlolaPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=807&offset=721')
        .then((response) => response.json())
        .then((data) => {
        return data.results;
        });
    }
// get all the pokemon from the galar region
export const getGalarPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=898&offset=807')
        .then((response) => response.json())
        .then((data) => {
        return data.results;
        });
    }
// get all pokemon from the pokeapi
export const getAllPokemon = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
        .then((response) => response.json())
        .then((data) => {
        return data.results;
        });
    }







