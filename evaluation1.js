"use strict";
class Eights {
    constructor() {
        this.player1 = [];
        this.player2 = [];
        this.drawPile = [];
        this.discardPile = [];
        this.deck = [];
    }
    shuffle() {

        for (let i = 0; i < 52; i++) {
            let randomLoction = Math.floor((Math.random() * (this.deck.length - i) + this.deck.length));
            let tmp = this.deck[i];
    
            this.deck[i] = this.deck[randomLoction];
            this.deck[randomLoction] = tmp;
        }
    }
    createDeck() {
        let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let suits = ["diamonds", "hearts", "spades", "clubs"];
        
        for(let i = 0; i < suits.length; i++) {
            for(let x = 0; x < cards.length; x++) {
                let card = {Value: cards[x], Suit: suits[i]};
                this.deck.push(card);
            }
        }
    
        return this.deck;
    }

    distributeCard() {
    
        for (let i = 0; i <= 5; i++){
            this.player1.push(this.deck[i]);
            let distCard = this.deck[i];
            this.deck = this.deck.filter(each => each !== distCard);
        }
        for (let i = 0; i <= 5; i++){
            this.player2.push(this.deck[i]);
            let distCard = this.deck[i];
            this.deck = this.deck.filter(each => each !== distCard);
        }
    } 
    makeDrawPile() {
        this.drawpile = this.discardPile;
        
        for (let i = 0; i < 52; i++) {
            let randomLoction = Math.floor((Math.random() * (this.drawpile.length - i) + this.drawpile.length));
            let tmp = this.drawpile[i];
    
            this.drawpile[i] = this.drawpile[randomLoction];
            this.drawpile[randomLoction] = tmp;
        }
    }
    playGame() {
        this.createDeck();
        this.shuffle();
        this.distributeCard();
        this.discardPile[0] = this.deck[0];
        this.deck = this.deck.filter(each => each !== this.deck[0]);
        this.drawPile = this.deck;
        
        if (this.player1.length<0 || this.player2.length<0)
        {
            this.play1();
            this.play2();
        }
        else this.result();
    }
    play1() {
        for (let i = 0; i <= this.player1.length; i++) {
            let l = this.discardPile.length-1;
            if(this.player1[i.Value] === this.discardPile[l.Value] || this.player1[i.suit] === this.discardPile[l.suit]) {
                this.discardPile[i+1] = this.player1[i];
                this.player1 = this.player1.filter(each => each!== this.player1[i]);
                return;
            }
            else {
                if(this.drawpile.length === 0)
                {
                    this.makeDrawPile();
                }
                this.player1.push(this.drawpile.shift());
            }
            continue;
        }
    }
    play2() {
        for (let i = 0; i <= this.player2.length; i++) {
            let l = this.discardPile.length-1;
            if(this.player2[i.Value] === this.discardPile[l.Value] || this.player2[i.suit] === this.discardPile[l.suit]) {
                this.discardPile[i+1] = this.player1[i];
                this.player2 = this.player2.filter(each => each!== this.player2[i]);
                return;
            }
            else {
                if(this.drawpile.length === 0)
                {
                    this.makeDrawPile();
                }
                this.player2.push(this.drawpile.shift());
            }
            continue;
        }
    }
    result() {
        if (this.player1.length === 0 ) {
            console.log("player1 wins");
            let penalty = 0;
            for ( let i of this.player2) {
                if (this.player2[i.Value] === ("A" || "J" || "Q" || "K")) {
                    penalty +=10;
                }
                else penalty += i.Suit;
            }
            console.log("player2 has penalty" + penalty);
        }
        if (this.player2.length === 0 ) {
            console.log("player2 wins");
            let penalty = 0;
            for ( let i of this.player1) {
                if (this.player1[i.Value] === ("A" || "J" || "Q" || "K")) penalty +=10;
                else penalty += i.Suit;
}
            console.log("player1 has penalty" + penalty);
        }
    }

} 


function main() {
    const game = Eights;
    game.playGame();
}

main();