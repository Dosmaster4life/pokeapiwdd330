// This will be a grid view of 25 cards per page that contain an image and a title. This will be in javascript and will be a class that will be used to create a grid view of cards. This will be used to display the results of the search.

// Path: src/js/card.js
// init the gridView
import { getAllPokemon } from "./pokeapiService/apiService";
import {Card} from './card.js';

class gridView {
        // get the pokemon names and images from the api call
    constructor(offset = 0) {
        this.cards = [];
        this.offset = offset;
    }
    // render should pass in the constructors from using an api call from the pokemon api
    createCard() {
        return `<div class="grid-view">
        ${this.cards.map(card => card.render()).join('')}
    </div>`
    }
    render() {
       
        // get the pokemon names and images from the api call
        getAllPokemon().then((data) => {
        
            let pokemonNames = data;
            for(let i = 0; i < 25; i++) 
            {
                // extract id from data.results[i].url
                let id = pokemonNames[i].url.split('/')[6];
            
                // get the pokemon image from the api call
                
                    // create a new card with the pokemon image and name, raw string of "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/id.png"
                    let card = new Card(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`, pokemonNames[i].name,id);
                   // let card = new Card(, pokemonNames[i].name);

                    // add the card to the grid view, this.cards.push is causing an error
                    this.cards.push(card);

                    // render the grid view
                    document.getElementById('grid-view').innerHTML = this.createCard();
                   
                
            }

       
    })
}
}

const grid = new gridView();
// next page button or previous page button in html render



grid.render(25);