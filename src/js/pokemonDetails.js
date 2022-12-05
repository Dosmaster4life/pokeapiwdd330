import {getPokemon, getSpecies} from './pokeapiService/apiService.js';

export default class PokeDetails {
    constructor(id) {
        this.pokemonId = id;
        this.pokemon;
        this.species;
    }
    
    async init() {
        this.getPokemonDetails();
        this.getPokemonSpecies();
        document.querySelector('main').innerHTML = this.renderPokemonDetails();
    }
    
    getPokemonDetails () {
        return getPokemon(this.pokemonId)
            .then((pokemon) => {
            
            this.pokemon = pokemon;
            console.log(this.pokemon);
        })
    }

    getPokemonSpecies () {
        getSpecies(this.pokemonId).then((species) => {
            this.species = species;
            console.log(this.species);
        })
    }


    renderPokemonDetails() {
        // const flavor_text_entries = this.species.flavor_text_entries;
        // console.log(flavor_text_entries);
        const flavor_text = this.species.flavor_text_entries[0].flavor_text;
        // const htmlEntry = flavor_text.replace(u'\f',       u'\n')
        //     .replace(u'\u00ad\n', u'')
        //     .replace(u'\u00ad',   u'')
        //     .replace(u' -\n',     u' - ')
        //     .replace(u'-\n',      u'-') 
        //     .replace(u'\n',       u' ') 
        return `<section class="poke-card">
            <div class="poke-card__title">
                <h2 class="poke-card__name">${this.pokemon.name}</h2>
                <p class="poke-card__id">${this.pokemon.id}</p>
                <p class="poke-card__type">${this.pokemon.types[0].type.name}</p>
            </div>
            <div class="poke-card__image">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId}" alt="Image of <span class="poke-card__name">${this.pokemon.name}</span> />
            </div>
            <div class="poke-card__info">
                <p class="poke-card__entry">${flavor_text}</p>
                <ul class="poke-card__moves">
                    <!-- <li class="poke-card__move">${this.pokemon.moves[0].move.name}</li> -->
                </ul>
            </div>
        </section>`
    }


}