let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true;

// used to create card gamme on page load
window.onload = () => {
    buildDeck();
    shuffle();
    startGame();
}

// used to build deck 
const buildDeck = () => {
    let values = ['A', '2','3','4','5','6','7','8','9','10', 'J','Q', 'K'];
    let types = ['C','D','H','S'];
    deck = []
    for (t = 0; t < types.length; t++) {
        for (v = 0; v < values.length; v++) {
            deck.push(`${values[v]}-${types[t]}`)
        }
    }
}

// function used to start new game 
const startGame = () => {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkForAce(hidden);

    console.log(hidden);
    console.log(dealerSum);

    while (dealerSum < 17) {
        let cardImage = document.createElement('img');
        let card = deck.pop();
        cardImage.src = `./cards/${card}.png`;
        dealerSum += getValue(card);
        dealerAceCount += checkForAce(card);
        document.getElementById('dealer-cards').append(cardImage)
    }

    for (i = 0; i < 2; i++) {
        let cardImage = document.createElement('img');
        let card = deck.pop();
        cardImage.src = `./cards/${card}.png`;
        yourSum += getValue(card);
        yourAceCount += checkForAce(card);
        document.getElementById('your-cards').append(cardImage)
    }
    document.getElementById('hit').addEventListener('click', onHit);
    document.getElementById('stand').addEventListener('click', onstand)
}

// function used to add card to players hand 
const onHit = () => {
    if(!canHit) return;

    let cardImage = document.createElement('img');
    let card = deck.pop();
    cardImage.src = `./cards/${card}.png`;
    yourSum += getValue(card);
    yourAceCount += checkForAce(card);
    document.getElementById('your-cards').append(cardImage)

    if (aceReducer(yourSum, yourAceCount) > 21) {
        canHit = false;
        document.getElementById('hit').disabled = true;
        document.getElementById('hit').style.background = '#FFCCCB';
    }
}

// function to shuffle cards at the beginging of the gamwe
const shuffle = () => {
    for(i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp
    }
}

//function used to finsih game and show results
const onstand = () => {
    yourSum = aceReducer(yourSum, yourAceCount);
    
    canHit = false;
    document.getElementById('hidden').src = `./cards/${hidden}.png`

    let message = '';
    if( yourSum > 21 ) {
        message = "Bust!"
    } else if ( dealerSum > 21 ) {
        message = "You have won!!"
    }else if ( yourSum === dealerSum ) {
        message = "Its a Tie!!"
    } else if (yourSum > dealerSum) {
        message = "You have won!!"
    } else if (yourSum < dealerSum) {
        message = "Bust!"
    }

    document.getElementById('your-sum').innerText = yourSum;
    document.getElementById('dealer-sum').innerText = dealerSum;
    document.getElementById('results').innerText = message;
}

// function used to check value of card 
const getValue = (card) => {
    let data = card.split('-');
    let value = data[0];

    if(isNaN(value)) {
        if ( value === 'A' ) return 11;
        return 10;
    }
    return parseInt(value);
}

//function used to check for an ace card
const checkForAce = ( card ) => {
    if( card[0] === 'A' ) return 1;
    return 0;
}


//fuction used to make ace = 1 || 11
const aceReducer = (sum, aceCount) => {
    while ( sum > 21 && aceCount > 0 ) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}

