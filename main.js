"use strict;"

// Display Elements ======================================

let hand = document.getElementById('hand');
let cashDisplay = document.getElementById('cash');
let betDisplay = document.getElementById('bet');
let dealerHand = document.getElementById('dealer-hand');
let dealerCard1 = document.getElementById('dealer-card-1');
let dealerCard2 = document.getElementById('dealer-card-2');
let playerHand = document.getElementById('player-hand');
let playerCard1 = document.getElementById('player-card-1');
let playerCard2 = document.getElementById('player-card-2');

// Modals ==============================================

let startModal = document.getElementById('start-modal');
let playBtn = document.getElementById('play');

let betModal = document.getElementById('bet-modal');
let betAmt = document.getElementById('bet-amt');
let submitBet = document.getElementById('submit-bet');
let bet;

let chooseModal = document.getElementById('choose-modal');
let question = document.getElementById('question');
let a = document.getElementById('a');
let b = document.getElementById('b');

// Game data =======================================

let dealerDeck = [];
let playerDeck = [];
let dealerCards = [];
let playerCards = [];
let cash = 1000;
let playAgainMsg;

// Initial Assignments =================================
hand.textContent = "Hard";
cashDisplay.textContent = `${cash}`;

// Game ===============================================

function showModal() {
  startModal.style.display = "block";

  playBtn.addEventListener('click', function() {
    startModal.style.display = "none";
    loadCards();
  });
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

    placeBet();
  }

  xhttp.send();
}

function placeBet() {
  betModal.style.display = "block";

  submitBet.addEventListener("click", function() {
    betModal.style.display = "none";
    bet = Number(betAmt.value);
    betDisplay.textContent = `${bet}`;
    dealCards();
  });
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

  checkPairs();

  checkDoubleDown();

  checkInsurance();

  if (!checkNatural() && !checkPairs() && !checkDoubleDown() && !checkInsurance()) {
    hitOrStand();
  }

  // chooseAceVal();
}

// Natural ===========================================================

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
    playAgainMsg = "Both natural, it's a draw. You keep your bet."
  }

  function playerNatural() {
    cash += (bet * 1.5);
    cashDisplay.textContent = `${cash}`;
    playAgain();
    playAgainMsg = "You have a natural, you win your bet amount and a half!"
  }

  function dealerNatural() {
    cash -= bet;
    cashDisplay.textContent = `${cash}`;
    playAgain();
    playAgainMsg = "The dealer has a natural, you've lost your bet."
  }
}

// Split Pairs =======================================

function checkPairs() {
  if (playerCards[0].name === playerCards[1].name) { // if pair
    chooseModal.style.display = "block";
    question.textContent = "Would you like to split your pair?";
    a.textContent = "Yes";
    b.textContent = "No";

    a.addEventListener('click', function() { // if split
      splitModal.style.display = "none";
      bet *= 2;
      betDisplay.textContent = `${bet}`;
      for (let i = 0; i < playerCards.length; i++) {
        playerCards[i] = [playerCards[i]];
        hitOrStandPairs(playerCards[i]); // hit or stand based on pair arr
      }

    });

    b.addEventListener('click', function() {
      splitModal.style.display = "none";
    });
  } else if (playerCards[0].name === "Ace" && playerCards[1].name === "Ace") {
    chooseModal.style.display = "block";
    question.textContent = "Would you like to split your pair?";
    a.textContent = "Yes";
    b.textContent = "No";

    a.addEventListener('click', function() {
      splitModal.style.display = "none";
      bet *= 2;
      betDisplay.textContent = `${bet}`;


    });

    b.addEventListener('click', function() {
      splitModal.style.display = "none";
    });
  }

  function hitOrStandPairs(arr) {
    chooseModal.style.display = "block";
    question.textContent = "Will you hit or stand?";
    a.textContent = "Hit";
    b.textContent = "Stand";

    a.addEventListener('click', function(arr) {

      addPlayerCardPair(arr);

      // chooseAceVal();

      check21Pair(arr);
    });

    b.addEventListener('click', function (arr) {
      if (arr === playerCards[1]) {
        chooseModal.style.display = "none";
      }
      flipCard();
      dealerPlay();
    });
  }

  function addPlayerCardPair(arr) {
    arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
    playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);

    playerHand.innerHTML += `
      <div>
        <img src="${arr[arr.length - 1].img}" width="150">
      </div>
    `;
  }

  function check21Pair(arr) {
    let playerAddedVals = 0;
    for (let card of arr) {
      playerAddedVals += card.value;
    }

    if (playerAddedVals > 21) bustPair();
  }

  function bustPair() {

  }
}

// Double Down =========================================

function checkDoubleDown() {
  let playerAddedVals = 0;
  for (let card of playerCards) {
    playerAddedVals += card.value;
  }

  if (playerAddedVals >= 9 && playerAddedVals <= 11) {
    chooseModal.style.display = "block";
    question.textContent = "Would you like to double down?";
    a.textContent = "Yes";
    b.textContent = "No";

    a.addEventListener("click", function() {
      bet *= 2;
      betDisplay.textContent = `${bet}`;

      addPlayerCard();

      check21();
    });

    b.addEventListener("click", function() {
      doubleModal.style.display = "none";
    });
  }
}

// Insurance =========================================

function checkInsurance() {
  if (dealerCards[0].name === "Ace") {
    earlySurrender();
    chooseInsurance();
  }

  function earlySurrender() {
    chooseModal.style.display = "block";
    question.textContent = "Would you like to surrender?";
    a.textContent = "Yes";
    b.textContent = "No";
    cash -= (bet / 2);
    cashDisplay.textContent = `${cash}`;
  }

  function chooseInsurance() {
    chooseModal.style.display = "block";
    question.textContent = "Would you like insurance?";
    a.textContent = "Yes";
    b.textContent = "No";

    a.addEventListener("click", function() {
      insuranceModal.style.display = "none";

      sideBet();
    });

    b.addEventListener("click", function() {
      insuranceModal.style.display = "none";
    });
  }

  function sideBet() {
    sideBetModal.style.display = "block";

    // bet += sideBet;
    // betDisplay.textContent = `${bet}`;

    // flipCard(); after submitting the side bet

    if (dealerCards[1].value === 10) {
      // bet += sideBet;
      // betDisplay.textContent = `${bet}`;

      checkNatural();
      // playAgain();
    }
  }
}

// Hit or Stand ======================================

function hitOrStand() {
  chooseModal.style.display = "block";
  question.textContent = "Will you hit or stand?";
  a.textContent = "Hit";
  b.textContent = "Stand";

  a.addEventListener('click', function() {

    addPlayerCard();

    // chooseAceVal();

    check21();
  });

  b.addEventListener('click', function () {
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
  cash -= bet;
  cashDisplay.textContent = `${cash}`;
  chooseModal.style.display = "none";
  playAgainMsg = "You have a bust, you've lost your bet.";
  playAgain();
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
  cash += bet;
  cashDisplay.textContent = `${cash}`;
  playAgain();
  playAgainMsg = "You have more points than the dealer, you've won your bet."
}

function dealerWins() {
  cash -= bet;
  cashDisplay.textContent = `${cash}`;
  playAgain();
  playAgainMsg = "You have less points than the dealer, you've lost your bet."
}

function push() {
  playAgain();
  playAgainMsg = "You and the dealer have the same amount of points, you get to keep your bet."
}

function dealerBust() {
  cash += bet;
  cashDisplay.textContent = `${cash}`;
  playAgain();
  playAgainMsg = "The dealer has a bust, you've won your bet."
}

// function chooseAceVal() {
//   for (let card of playerCards) {
//     if (card.name === "Ace") {
//       chooseModal.style.display = "block";
//       question.textContent = "Will the ace be 1 or 11?";
//       a.textContent = "Yes";
//       b.textContent = "No";

//       a.addEventListener("click", function() {
//         playerCards[0].name === "Ace" && playerCards[1].name === "Ace"
//           ? playerCards[0].value = aceVal1(card.value)
//           : (
//               card.value = aceVal1(card.value),
//               hand.textContent = "Soft"
//             );
//       });
//       b.addEventListener("click", function() {
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

// End of game =============================================

function playAgain() {
  chooseModal.style.display = "block";
  question.textContent = playAgainMsg;
  a.textContent = "Play Again";
  b.textContent = "Start Over";

  a.addEventListener("click", function() {
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

  b.addEventListener("click", function() {
    location.reload();
  });
}

function nextRound() {
  // placeBet();
}
