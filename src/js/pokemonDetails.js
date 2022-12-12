import {getPokemon, getSpecies, getEvolutionChain} from './pokeapiService/apiService.js';

export default class PokeDetails {
    constructor(id) {
        this.pokemonId = id;
        this.pokemon;
        this.species;
        this.evolution;
    }
    
    init() {
        let i=0;
        try {
            this.getPokemonDetails();
            this.getPokemonSpecies();
            console.log (this.pokemon);
            if (this.pokemon || this.species == undefined) {
                i++;
                throw 'Error fetching content - please reload the page and try again.';
            }
        } catch (e) {
            if (i === 2) {
                throw 'Error fetching content - please reload the page and try again.';
            }
            document.querySelector('main').innerHTML = `<div class="poke-card__error"><p>${e}</p></div>`;
        }
            
        // this.getPokemonDetails();
        // this.getPokemonSpecies();
    }

    getPokemonDetails () {
        return getPokemon(this.pokemonId)
            .then((pokemon) => {           
            this.pokemon = pokemon;
            console.log(this.pokemon);
        })
    }
    
    getEvolution () {
        return getEvolutionChain(this.species.evolution_chain.url)
            .then((evolutionChain) => {
                this.evolution = evolutionChain;
                console.log(this.evolution);
            })
    }

    getPokemonSpecies () {
        getSpecies(this.pokemonId).then((species) => {
            this.species = species;
            console.log(this.species);
            console.log(this.species.flavor_text_entries)
        })
        .finally(() => {
            this.getEvolution();
            var titleName = `${this.pokemon.name}`;
            titleName = titleName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            document.title = `Pokemon Details | ${titleName}`;
            document.querySelector('main').innerHTML = this.renderPokemonDetails();
            document.getElementById('poke-card__moves_expand').addEventListener('click', this.getMoreMoves.bind(this));
            console.log("Pokemon Details Page Loaded");
        })
    }

    getPokemonType () {
        let type = '';
        if (this.pokemon.types[0].type.name === 'grass') {
            type = 'Grass';
        } if (this.pokemon.types[0].type.name === 'normal') {
            type = 'Normal';
        } if (this.pokemon.types[0].type.name === 'fire') {
            type = 'Fire';
        } if (this.pokemon.types[0].type.name === 'water') {
            type = 'Water';
        } if (this.pokemon.types[0].type.name === 'electric') {
            type = 'Electric';
        } if (this.pokemon.types[0].type.name === 'ice') {
            type = 'Ice';
        } if (this.pokemon.types[0].type.name === 'fighting') {
            type = 'Fighting';
        } if (this.pokemon.types[0].type.name === 'poison') {
            type = 'Poison';
        } if (this.pokemon.types[0].type.name === 'ground') {
            type = 'Ground';
        } if (this.pokemon.types[0].type.name === 'flying') {
            type = 'Flying';
        } if (this.pokemon.types[0].type.name === 'psychic') {
            type = 'Psychic';
        } if (this.pokemon.types[0].type.name === 'bug') {
            type = 'Bug';
        } if (this.pokemon.types[0].type.name === 'rock') {
            type = 'Rock';
        } if (this.pokemon.types[0].type.name === 'ghost') {
            type = 'Ghost';
        } if (this.pokemon.types[0].type.name === 'dragon') {
            type = 'Dragon';
        } if (this.pokemon.types[0].type.name === 'dark') {
            type = 'Dark';
        } if (this.pokemon.types[0].type.name === 'steel') {
            type = 'Steel';
        } if (this.pokemon.types[0].type.name === 'fairy') {
            type = 'Fairy';
        } if (this.pokemon.types[0].type.name === 'ground') {
            type = 'Ground';
        }
        return type;   
    }

    getFirstMoves() {
        const moves = this.pokemon.moves;
        const firstMoves = moves.slice(0, 6);
        let movesList = '';
        firstMoves.forEach((move) => {
            move = move.move.name;
            movesList += `<li>${move}</li>`;
        });
        return movesList;
    }

    getMoreMoves() {
        const moves = this.pokemon.moves;
        const length = moves.length;
        const moreMoves = moves.slice(6, (length - 1));
        let movesList = '';
        moreMoves.forEach((move) => {
            move = move.move.name;
            movesList += `<li>${move}</li>`;
        });
        document.getElementById('poke-card__moves_expand').classList.add('hidden');
        document.querySelector('.poke-card__moves_expand_list').innerHTML = movesList;
    }

    renderPokemonDetails() {
        // const flavor_text_entries = this.species.flavor_text_entries;
        // console.log(flavor_text_entries);
        const type = this.getPokemonType();
        //get english flavor text
        const flavor_text_entries = this.species.flavor_text_entries.filter((entry) => {
            return entry.language.name === 'en';
        });
        const flavor_text = flavor_text_entries[0].flavor_text;

        //const flavor_text = this.species.flavor_text_entries[0].flavor_text;
        console.log(this.species.flavor_text_entries);
        const genera = this.species.genera.filter((entry) => {
            return entry.language.name === 'en';
        });
        const genus = genera[0].genus;
        console.log(genus);
        const height = (this.pokemon.height * 3.93701).toFixed(2);
        const weight = (this.pokemon.weight * 0.220462).toFixed(2);

        const firstMoves = this.getFirstMoves();
        
        console.log(this.evolution);
               
        return `<section class="poke-card">
            <div class="poke-card__title">
                <h1 class="poke-card__name">${this.pokemon.name}</h1>
                <p class="poke-card__hp"><span class="poke-card__hp_text">HP</span> ${this.pokemon.stats[0].base_stat}</p>
                <img class="poke-card__type" src="../images/type-icons/Pokemon_Type_Icon_${type}.png" alt="${type} icon from https://www.deviantart.com/lugia-sea/art/Pokemon-Type-Icons-Vector-869706864">   
            </div>
            <div class="poke-card__image_container">
                <img class="poke-card__image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId}.png" alt="Image of ${this.pokemon.name}">
            </div>
            <div class="poke-card__stats_container">
                <div class="poke-card__stats">
                    <p class="poke-card__id">NO. ${this.pokemonId}</p>
                    <p class="poke-card__genus">${genus}</p>
                    <p class="poke-card__height">HT: ${height} in</p>
                    <p class="poke-card__weight">WT: ${weight} lbs</p>
                    <p class="poke-card__ability">Ability: ${this.pokemon.abilities[0].ability.name}</p>
                </div>
                <div class="poke-card__stats_alignment">
                </div>
            </div>
            <div class="poke-card__info">
                <p class="poke-card__entry">${flavor_text}</p>
                <h4 class="poke-card__moves_title">Moves:</h4>
                <ul class="poke-card__moves">
                    ${firstMoves}
                </ul>
                <div class="button-container">
                    <button id="poke-card__moves_expand">See More</button>
                </div>
                <ul class="poke-card__moves_expand_list">
                    <!-- expanded moves list -->
                </ul>
                <!-- <h4 class="poke-card__evolution_title">Evolves To: </h4> -->
            </div>
        </section>`
    }


}