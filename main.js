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
let dealerHand = document.getElementById('dealer-hand');
let dealerCards = [];
let playerCards = [];
let aceModal = document.getElementById('ace-modal');
let aceBtn1 = document.getElementById('ace1');
let aceBtn11 = document.getElementById('ace11');
let cashDisplay = document.getElementById('cash');
let cash = 1000;
let chooseModal = document.getElementById('choose-modal');
let playAgainModal = document.getElementById('play-again-modal');
let playAgainBtn = document.getElementById('play-again');
let startOver = document.getElementById('start-over');
let playAgainMsg = document.getElementById('play-again-msg');
let placeBet = document.getElementById('place-bet');
let betDisplay = document.getElementById('bet');

cashDisplay.textContent = `${cash}`;

function showModal() {
  modal.style.display = "block";
}

hand.textContent = "Hard";

playBtn.addEventListener('click', function() {
  modal.style.display = "none";
  loadCards();
});

function loadCards() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "cards.json", true);
  xhttp.onload = function () {
    let cards = JSON.parse(this.responseText);
    for (let c of cards) {
      dealerDeck.push(c);
      playerDeck.push(c);
    }

    dealCards();
  }

  xhttp.send();
}



function dealCards() {
  dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
  dealerDeck.splice(dealerDeck.indexOf(dealerCards[0]), 1);
  dealerCards.push(dealerDeck[dealerDeck.length - 1]);
  dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);

  playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
  // playerCards.push(playerDeck[11]); for testing purposes
  playerDeck.splice(playerDeck.indexOf(playerCards[0]), 1);
  playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
  // playerCards.push(playerDeck[0]); for testing purposes
  playerDeck.splice(playerDeck.indexOf(playerCards[1]), 1);

  dealerCard1.innerHTML += `
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

  checkNatural();

  hitOrStand();

  // chooseAceVal();
}

function checkNatural() {
  if (
    playerCards[0].name === "Ace" && playerCards[1].value === 10
    || playerCards[1].name === "Ace" && playerCards[0].value === 10
  ) {
    dealerCards.splice(1, 1, dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
    dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
    dealerCard2.innerHTML = `
      <img src="${dealerCards[1].img}" width="150">
    `;
    dealerCards[0].name === "Ace" && dealerCards[1].value === 10
    || dealerCards[1].name === "Ace" && dealerCards[0].value === 10
      ? bothNatural()
      : playerNatural();
  } else if (
    dealerCards[0].name === "Ace" && dealerCards[1].value === 10
    || dealerCards[1].name === "Ace" && dealerCards[0].value === 10
  ) dealerNatural();

  function bothNatural() {
    playAgain();
    playAgainMsg.textContent = "Both natural, it's a draw. You keep your bet."
  }

  function playerNatural() {
    // cash += (bet * 1.5)
    playAgain();
    playAgainMsg.textContent = "You have a natural, you win your bet amount and a half!"
  }

  function dealerNatural() {
    // cash -= bet
    playAgain();
    playAgainMsg.textContent = "The dealer has a natural, you've lost your bet."
  }
}

function hitOrStand() {
  chooseModal.style.display = "block";

  hit.addEventListener('click', function() {

    addPlayerCard();

    // chooseAceVal();

    check21();
  });

  stand.addEventListener('click', function () {
    chooseModal.style.display = "none";
    flipCard();
    dealerPlay();
  });

}

function addPlayerCard() {
  playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
  playerDeck.splice(playerDeck.indexOf(playerCards[playerCards.length - 1]), 1);

  playerHand.innerHTML += `
    <div>
      <img src="${playerCards[playerCards.length - 1].img}" width="150">
    </div>
  `;
}

function check21() {
  let playerAddedVals = 0;
  for (let card of playerCards) {
    playerAddedVals += card.value;
  }

  if (playerAddedVals > 21) bust();
}

function bust() {
  // cash -= bet
  chooseModal.style.display = "none";
  playAgain();
  playAgainMsg.textContent = "You have a bust, you've lost your bet."
}

function flipCard() {
  dealerCards.splice(1, 1, dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
  dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
  dealerCard2.innerHTML = `
    <img src="${dealerCards[1].img}" width="150">
  `;
}

function dealerPlay() {
  let dealerAddedVals = 0;
  for (let card of dealerCards) {
    dealerAddedVals += card.value;
  }

  dealerAddedVals <= 16
    ? dealerHit()
    : dealerStand(dealerAddedVals);
}

function dealerHit() {
  dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
  dealerDeck.splice(dealerDeck.indexOf(dealerCards[dealerCards.length - 1]), 1);

  dealerHand.innerHTML += `
    <div>
      <img src="${dealerCards[dealerCards.length - 1].img}" width="150">
    </div>
  `;

  dealerPlay();
}

function dealerStand(val) {
  val <= 21
    ? compareDealer(val)
    : dealerBust();
}

function compareDealer(val) {
  let playerAddedVals = 0;
  for (let card of playerCards) {
    playerAddedVals += card.value;
  }

  switch(true) {
    case (playerAddedVals > val):
      playerWins();
      break;
    case (playerAddedVals < val):
      dealerWins();
      break;
    case (playerAddedVals === val):
      push();
      break;
  }
}

function playerWins() {
  // cash += bet
  playAgain();
  playAgainMsg.textContent = "You have more points than the dealer, you've won your bet."
}

function dealerWins() {
  // cash -= bet
  playAgain();
  playAgainMsg.textContent = "You have less points than the dealer, you've lost your bet."
}

function push() {
  playAgain();
  playAgainMsg.textContent = "You and the dealer have the same amount of points, you get to keep your bet."
}

function dealerBust() {
  // cash += bet
  playAgain();
  playAgainMsg.textContent = "The dealer has a bust, you've won your bet."
}

// function chooseAceVal() {
//   for (let card of playerCards) {
//     if (card.name === "Ace") {
//       aceModal.style.display = "block";
//       aceBtn1.addEventListener("click", function() {
//         playerCards[0].name === "Ace" && playerCards[1].name === "Ace"
//           ? playerCards[0].value = aceVal1(card.value)
//           : (
//               card.value = aceVal1(card.value),
//               hand.textContent = "Soft"
//             );
//       });
//       aceBtn11.addEventListener("click", function() {
//         if (playerCards[0].name === "Ace" && playerCards[1].name === "Ace") playerCards[1].value = aceVal1(card.value);
//         aceVal11(card.value);
//         hand.textContent = "Soft";
//       });
//     }
//   }
//
//   function aceVal1(val) {
//     val = 1;
//     aceModal.style.display = "none";
//     return val;
//   }
//
//   function aceVal11(val) {
//     aceModal.style.display = "none";
//     return val;
//   }
// }

function playAgain(j) {
  // if (j >= 11) {
  //   return console.log('the end');
  // }
  playAgainModal.style.display = "block";

  playAgainBtn.addEventListener("click", function() {
    playAgainModal.style.display = "none";

    while (dealerHand.childNodes.length > 6) {
      dealerHand.removeChild(dealerHand.lastChild);
    }

    while (playerHand.childNodes.length > 6) {
      playerHand.removeChild(playerHand.lastChild);
    }

    dealerCard1 = document.getElementById('dealer-card-1');
    dealerCard2 = document.getElementById('dealer-card-2');
    playerCard1 = document.getElementById('player-card-1');
    playerCard2 = document.getElementById('player-card-2');

    dealerCards = [];
    playerCards = [];

    nextRound();
  });

  startOver.addEventListener("click", function() {
    location.reload();
  });
}

function nextRound() {
  dealCards();
}
