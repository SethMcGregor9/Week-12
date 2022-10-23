class Deck {
    constructor(name) {
        this.name = name;
        this.cards= [];
    }
    addCard(name, cost){
        this.cards.push(new Card(name, cost));
    }
}



class Card {
    constructor(name, cost) {
        this.name = name;
        this.area = cost;
    }
}

class DeckService {
    static url = 'https://6350a3e33e9fa1244e4a076b.mockapi.io/week-12_API/Deck';

    static getAllDecks() {
        return $.get(this.url);
    }

    static getDeck(_id) {
        return $.get(this.url);
    }

    static createDeck(deck) {
        return $.post(this.url, deck);
    }

    static updateDeck(deck) {
        return $.ajax({
            url: this.url + `/${deck._id}`,
            dataType: 'json',
            data: JSON.stringify(deck),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteDeck(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            Type: 'DELETE'
        });
    }
}

class DOMManager {
    static decks;

    static getAllDecks() {
        DeckService.getAllDecks().then(decks => this.render(decks));
    }

    static createDeck(name) {
        DeckService.createDeck(new Deck(name))
        .then(() => {
            return DeckService.getAllDecks();
        })
        .this((decks) => this.render(decks));
    }

    static deleteDeck(id) {
        DeckService.deleteDeck(id) 
        .then(() => {
            return DeckService.getAllDecks();
        })
        .then((decks) => this.render(decks));
    }

static addCard(id) {
    for (let deck of this.decks) {
        if(deck._id == id) {
            deck.cards.push(new Card($(`#${deck._id}-card-name`).val(), $(`#${deck._id}-card-cost`).val()));
            DeckService.updateDeck(house) 
            .then(() =>{
                return DeckService.getAllDecks();
            })
            .then((decks) => this.render(decks));
        }
    }
}

static deleteDeck(deckId, _cardId) {
    for (let deck of this.decks) {
     if (deck._id == deckId) {
      for(let _card of deck.cards) {
       if(card._id == _cardId) {
         deck.cards.splice(deck.cards.indexof(card), 1);
         DeckService.updateDeck(deck)
         .then(() => {
            return DeckService.getAllDecks();
         })
         .then((decks) => this.render(decks));
        }
      }
     }
    }
}

    static render(decks) {
        this.decks = decks;
        $('#app').empty();
        for (let deck of decks) {
            $('#app').prepend(
                `<div id="${deck._id}" class="card">
                <div class="card-header">
                <h2>${deck.name}</h2>
                <button class="btn btn-danger" onclick="DOMManager.deleteDeck('${deck._id}')">Delete</button>
                 </div>
                 <div class="card-body">
                  <div class="card">
                   <div class="row">
                    <div class="col-sm">
                      <input type="text" id=${deck._id}-card-name" class= "form-control" placeholder="Card Name">
                    </div>
                    <div class ="col-sm">
                     <input type="text" id=${deck._id}-card-cost" class= "form-control" placeholder="Card Cost">
                    </div>
                   </div>
                   <button id="${deck._id}-new-card" onclick="DOMManager.addCard('${deck._id}')" class="btn btn-primary form-control">Add</button>
                  </div>
                 </div>
                </div><br>`
            );
            
            }
            for (let card of decks) {
                $(`#${decks._id}`).find('.card-body').append(
                    `<p>
                    <span id="name-${card._id}"><strong>Name: </strong> ${card._name}</span>
                    <span id="cost-${card._id}"><strong>Cost: </strong> ${card._cost}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteCard('${decks._id}', '${card._id}')">Delete Card</button>
                    `
                );
        }
    }
}


$('#create-new-deck').on(() => {
    DOMManager.createDeck($('#new-deck-name').val());
    $('new-deck-name').val('');
});



DOMManager.getAllDecks();