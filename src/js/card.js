// This will be a card that will contain an image and a title. This will be a class that will be rendered to the page.

export default class Card {
    constructor(image, title, id, link) {
        this.image = image;
        this.title = title;
        this.id = id;
        this.link = link;
    }
    
     render() {
       

        return `
        <div class="card" style="cursor: pointer;" onclick="console.log('This will navigate to pokemon page with id in the future')">
            <a href="${this.link}">
                <h5>#${this.id} ${this.title}</h5>
                    <img src="${this.image}" alt="${this.title}" />
            </a>
        </div>

       `

    }

}
export {Card};

