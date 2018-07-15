"use strict;"

/*
  click play
  each side has their own deck
  cards slide out, only 1 dealer card is out
  hit or stand
  if stand, dealer card is flipped over and is compared to players cards
  if hit, another card is added to players hand
*/

let modal = document.getElementById('modal');
let playBtn = document.getElementById('play');
let dealerDeck = [];
let playerDeck = [];
let dealerCard1 = document.getElementById('dealer-card-1');
let dealerCard2 = document.getElementById('dealer-card-2');
let playerCard1 = document.getElementById('player-card-1');
let playerCard2 = document.getElementById('player-card-2');
let hand = document.getElementById('hand');
let hit = document.getElementById('hit');
let stand = document.getElementById('stand');
let playerHand = document.getElementById('player-hand');
let dealerCards = [];
let playerCards = [];
let aceModal = document.getElementById('ace-modal');
let aceBtn1 = document.getElementById('ace1');
let aceBtn11 = document.getElementById('ace11');

function showModal() {
  modal.style.display = "block";
}

hand.textContent = "Hard";

playBtn.addEventListener('click', function() {
  startGame();
});

function startGame() {
  modal.style.display = "none";
  loadCards();
}

function loadCards() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "cards.json", true);
  xhttp.onload = function () {
    let cards = JSON.parse(this.responseText);
    for (let c of cards) {
      dealerDeck.push(c);
      playerDeck.push(c);
    }

    dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
    dealerDeck.splice(dealerDeck.indexOf(dealerCards[0]), 1);
    dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
    dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);

    playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
    playerDeck.splice(playerDeck.indexOf(playerCards[0]), 1);
    playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
    playerDeck.splice(playerDeck.indexOf(playerCards[1]), 1);

    chooseAceVal();

    dealerCard1.innerHTML = `
      <img src="${dealerCards[0].img}" width="150">
    `;
    dealerCard2.innerHTML = `
      <img src="${dealerCards[1].img}" width="150">
    `;
    playerCard1.innerHTML = `
      <img src="${playerCards[0].img}" width="150">
    `;
    playerCard2.innerHTML = `
      <img src="${playerCards[1].img}" width="150">
    `;

    hit.addEventListener('click', function() {
      playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
      playerDeck.splice(playerDeck.indexOf(playerCards[playerCards.length - 1]), 1);

      playerHand.innerHTML += `
        <div>
          <img src="${playerCards[playerCards.length - 1].img}" width="150">
        </div>
      `;

      chooseAceVal();
    });

    stand.addEventListener('click', check21);

    function check21() {
      let dealerAddedVals = dealerCards.reduce((total, val) => total.value + val.value);
      let playerAddedVals = 0;
      for (let card of playerCards) {
        playerAddedVals += card.value;
      }

      console.log("Dealer: " + dealerAddedVals);
      console.log("Player: " + playerAddedVals);

      switch (true) {
        case (playerAddedVals > 21):
          console.log("bust, you lose");
          break;
        case (playerAddedVals === 21 && playerCards.length === 2):
          console.log("a natural, you win");
          break;
        case (playerAddedVals < 21 && playerCards.length >= 2):
          compareDealer(playerAddedVals, dealerAddedVals);
          break;
      }
    }

    function compareDealer(playerAddedVals, dealerAddedVals) {
      if (dealerAddedVals > playerAddedVals) {
        return console.log("dealer wins");
      } else if (dealerAddedVals < playerAddedVals) {
        return console.log("player wins");
      }
    }

    function chooseAceVal() {
      for (let card of playerCards) {
        if (card.name === "Ace") {
          aceModal.style.display = "block";
          aceBtn1.addEventListener("click", function() {
            playerCards[0].name === "Ace" && playerCards[1].name === "Ace"
              ? playerCards[0].value = aceVal1(card.value)
              : (
                  card.value = aceVal1(card.value),
                  hand.textContent = "Soft"
                );
          });
          aceBtn11.addEventListener("click", function() {
            if (playerCards[0].name === "Ace" && playerCards[1].name === "Ace") playerCards[1].value = aceVal1(card.value);
            aceVal11(card.value);
            hand.textContent = "Soft";
          });
        }
      }
    }

    function aceVal1(val) {
      val = 1;
      aceModal.style.display = "none";
      return val;
    }

    function aceVal11(val) {
      aceModal.style.display = "none";
      return val;
    }

  // End of game logic
  }
  xhttp.send();
}
