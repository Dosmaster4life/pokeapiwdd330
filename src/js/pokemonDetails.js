import {getPokemon, getSpecies, getEvolutionChain} from './pokeapiService/apiService.js';
import {getAllPokemon} from './pokeapiService/apiService.js';
import { getParam } from './utils.js';
export default class PokeDetails {
    constructor(id) {
        this.pokemonId = id;
        this.pokemon;
        this.species;
        this.evolution;
    }
    
  
  async init() {
    
  
    const data  = getAllPokemon().then((pokemonList) => {
        // get id or pokemon name from url and check if it is a number or a string in pokemonList
       // get the url
         const url = window.location.href;
            // get the id from the url which is all following the ?id=
           let id = getParam('id');
        
            // check if id is a number
            if (isNaN(id)) {
              
                // if id is a string
                // get the pokemon name from the url
                const pokemonName = id;
                // check if pokemon name is in the pokemonList array
                // pokemonlist is an array of objects with a name property and url property, so we need to get the name property from each object in the array and compare it to the pokemonName
                if ( pokemonList.some(pokemon => pokemon.name === pokemonName)) {
                  

                    this.getData();
               
                    // set timeout 500ms for this.getinfo
                   
                        this.timeoutRun();
                    
                    // if pokemon name is in the pokemonList
                    // if id is a number between 1 and 898
                    
                }else {
                    document.querySelector('main').innerHTML = `<div class="poke-card__error"><p>Pokemon not found, click the pokeball to go the home screen.</p></div>`;
                }
            }else if(id >= 1 && id <= 898) {
                   
                    this.getData();
               
                    // set timeout 500ms for this.getinfo
                   
                      this.timeoutRun();
                }
                else {
                    document.querySelector('main').innerHTML = `<div class="poke-card__error"><p>Invalid pokemon id, click the pokeball to go to the home page.</p></div>`;
                 
                   
                }
            
            
       
        
    

            });
           


   


  
    
      
    }
     timeoutRun(count = 0) {
        
        setTimeout(() => {
            if(this.pokemon !== undefined & this.pokemon !== null & this.species !== undefined & this.species !== null) {
                this.getinfo();
                return
            }else {
                if(count > 5) {
                    document.querySelector('main').innerHTML = `<div class="poke-card__error"><p>Internal server error, refresh the page or try again later.</p></div>`;
                }
                this.timeoutRun(count + 1);
                return
            }
           
        },500);
    }
    
    getinfo(){
       // var titleName = `${this.pokemon.name}`;
      //  titleName = titleName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
       //     return letter.toUpperCase();
      //  });
      //  document.title = `Pokemon Details | ${titleName}`;
        document.querySelector('main').innerHTML = this.renderPokemonDetails();
        document.getElementById('poke-card__moves_expand').addEventListener('click', this.getMoreMoves.bind(this));
        

    }
    getData()  {
        let i=0;
        try {
           this.getPokemonDetails();
          this.getPokemonSpecies();
         

          
        
            if (this.pokemon || this.species == undefined) {
                i++;
              //  throw 'Error fetching content - please reload the page and try again.';
            }
        } catch (e) {
            if (i === 2) {
                //throw 'Error fetching content - please reload the page and try again.';
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
          
        })
    }
    
    getEvolution () {
        return getEvolutionChain(this.species.evolution_chain.url)
            .then((evolutionChain) => {
                this.evolution = evolutionChain;
             
            })
    }

    getPokemonSpecies () {
        getSpecies(this.pokemonId).then((species) => {
            this.species = species;
          
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
        
        const type = this.getPokemonType();
        //get english flavor text
        const flavor_text_entries = this.species.flavor_text_entries.filter((entry) => {
            return entry.language.name === 'en';
        });
        const flavor_text = flavor_text_entries[0].flavor_text;

        //const flavor_text = this.species.flavor_text_entries[0].flavor_text;
   
        const genera = this.species.genera.filter((entry) => {
            return entry.language.name === 'en';
        });
        const genus = genera[0].genus;
       
        const height = (this.pokemon.height * 3.93701).toFixed(2);
        const weight = (this.pokemon.weight * 0.220462).toFixed(2);

        const firstMoves = this.getFirstMoves();
        // get numberic id of pokemon from api url
        const id = this.pokemon.id

        
       
               
        return `<section class="poke-card">
            <div class="poke-card__title">
                <h1 class="poke-card__name">${this.pokemon.name}</h1>
                <p class="poke-card__hp"><span class="poke-card__hp_text">HP</span> ${this.pokemon.stats[0].base_stat}</p>
                <img class="poke-card__type" src="../images/type-icons/Pokemon_Type_Icon_${type}.png" alt="${type} icon from https://www.deviantart.com/lugia-sea/art/Pokemon-Type-Icons-Vector-869706864">   
            </div>
            <div class="poke-card__image_container">
                <img class="poke-card__image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="Image of ${this.pokemon.name}">
            </div>
            <div class="poke-card__stats_container">
                <div class="poke-card__stats">
                    <p class="poke-card__id">NO. ${this.pokemon.id}</p>
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