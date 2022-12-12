// This will be a grid view of 25 cards per page that contain an image and a title. This will be in javascript and will be a class that will be used to create a grid view of cards. This will be used to display the results of the search.

// Path: src/js/card.js
// init the gridView
import { getAllPokemon, getKantoPokemonList, getJohtoPokemonList, getHoennPokemonList, getSinnohPokemonList, getUnovaPokemonList, getKalosPokemonList, getAlolaPokemonList, getGalarPokemonList } from "./pokeapiService/apiService";
import {Card} from './card.js';

export default class gridView {
        // get the pokemon names and images from the api call
    constructor(offset = 0) {
        this.cards = [];
        this.offset = offset;
        this.data;
        this.maxCard = 898;
        this.setRegion = false;
    }
    // render should pass in the constructors from using an api call from the pokemon api
    createCard() {
        
        return `<div class="grid-view">
        ${this.cards.map(card => card.render()).join('')}
    </div>`
    }
    setKanto() {
        this.offset = 0;
        this.maxCard = 151;
    }
    setJohto() {
        this.offset = 151;
        this.maxCard = 251;
    }
    setHoenn() {
        this.offset = 251;
        this.maxCard = 386;
    }
    setSinnoh() {
        this.offset = 386;
        this.maxCard = 493;
    }
    setUnova() {
        this.offset = 493;
        this.maxCard = 649;
    }
    setKalos() {
        this.offset = 649;
        this.maxCard = 721;
    }
    setAlola() {
        this.offset = 721;
        this.maxCard = 809;
    }
    setGalar() {
        this.offset = 809;
        this.maxCard = 898;
    }

    getAllPokemon() {
        getAllPokemon().then((data) => {
            this.data = data;
            this.render();
        })
    }
    getCards() {
        let pokemonNames = this.data;
       
        for(let i = this.offset; i < 25 + this.offset; i++) 
        {
            if(i + 1  > this.maxCard) {
                break;
            }
            // extract id from data.results[i].url
            try {
                let id = pokemonNames[i].url.split('/')[6];
        
                // get the pokemon image from the api call

                // create link to pokemon page using id
                let link = `../pokemon/index.html?id=${id}`;
                
                    // create a new card with the pokemon image and name, raw string of "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/id.png"
                    let card = new Card(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`, pokemonNames[i].name,id,link);
                   // let card = new Card(, pokemonNames[i].name);
    
                    // add the card to the grid view, this.cards.push is causing an error
                    this.cards.push(card);
    
                    // render the grid view
                    document.getElementById('grid-view').innerHTML = this.createCard();
            }catch(e) {

            }
           
               
            
        }    
        
    }
    render(region = 'all') {
        if(!this.setRegion) {
        switch(region) {
            case 'kanto':
                this.setKanto();
                break;
            case 'johto':
                this.setJohto();
                break;
            case 'hoenn':
                this.setHoenn();
                break;
            case 'sinnoh':
                this.setSinnoh();
                break;
            case 'unova':
                this.setUnova();
                break;
            case 'kalos':
                this.setKalos();
                break;
            case 'alola':
                this.setAlola();
                break;
            case 'galar':
                this.setGalar();
                break;
            case 'all':
                this.offset = 0;
                this.maxCard = 898;
                break;
        }
        this.setRegion = true;
    }


    
       
        if(this.data === undefined) {
            this.getAllPokemon();
            
        }else {
            this.getCards();
        }
      
        window.addEventListener('scroll', () => {
        
            
            // get the scroll position
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            // if the scroll position is at the bottom of the page, load more cards
            if (clientHeight + scrollTop >= scrollHeight - 5) {
                this.offset += 25;
                this.getCards();
            }
            
          
        });
    
        
       

        
       
        // get the pokemon names and images from the api call
    
    
           
            // on scroll event, load more cards
            
            


       
    
}
}export {gridView};

