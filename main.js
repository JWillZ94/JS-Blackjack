"use strict;"

// Display Elements ======================================

// let hand = document.getElementById('hand');
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

let doubleModal = document.getElementById('double-modal');
let double = document.getElementById('double');
let noDouble = document.getElementById('no-double');

let surrenderModal = document.getElementById('surrender-modal');
let surrender = document.getElementById('surrender');
let noSurrender = document.getElementById('no-surrender');

let insuranceModal = document.getElementById('insurance-modal');
let insurance = document.getElementById('insurance');
let noInsurance = document.getElementById('no-insurance');

let splitModal = document.getElementById('split-modal');
let split = document.getElementById('split');
let noSplit = document.getElementById('no-split');

let hitModal = document.getElementById('hit-modal');
let hit = document.getElementById('hit');
let stand = document.getElementById('stand');

let playAgainModal = document.getElementById('play-again-modal');
let playAgainMsg = document.getElementById('play-again-msg');
let playAgainBtn = document.getElementById('play-again');
let startOver = document.getElementById('start-over');

let restartModal = document.getElementById('no-cash-modal');
let noCashStartOver = document.getElementById('no-cash-start-over');

// Game data =======================================

let dealerDeck = [];
let playerDeck = [];
let dealerCards = [];
let playerCards = [];
let cash = 1000;

// Initial Assignments =================================

// hand.textContent = "Hard";
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
  // playerCards.push(playerDeck[5]); // for testing purposes
  playerDeck.splice(playerDeck.indexOf(playerCards[0]), 1);
  playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
  // playerCards.push(playerDeck[17]); // for testing purposes
  playerDeck.splice(playerDeck.indexOf(playerCards[1]), 1);

  dealerCard1.innerHTML += `
    <img src="${dealerCards[0].img}" width="100">
  `;
  dealerCard2.innerHTML = `
    <img src="${dealerCards[1].img}" width="100">
  `;
  playerCard1.innerHTML = `
    <img src="${playerCards[0].img}" width="100">
  `;
  playerCard2.innerHTML = `
    <img src="${playerCards[1].img}" width="100">
  `;

  checkNatural();

  // checkPairs();

  checkDoubleDown();

  checkInsurance();

  hitOrStand();

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
      <img src="${dealerCards[1].img}" width="100">
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
    playAgainMsg.textContent = "Both natural, it's a draw. You keep your bet.";
    playAgain();
  }

  function playerNatural() {
    cash += (bet * 1.5);
    cashDisplay.textContent = `${cash}`;
    playAgainMsg.textContent = "You have a natural, you win your bet amount and a half!";
    playAgain();
  }

  function dealerNatural() {
    cash -= bet;
    cashDisplay.textContent = `${cash}`;
    playAgainMsg.textContent = "The dealer has a natural, you've lost your bet.";
    playAgain();
  }
}

// Split Pairs =======================================

// function checkPairs() {
//   if (playerCards[0].name === playerCards[1].name) {
//     splitModal.style.display = "block";
//
//     split.addEventListener("click", function() {
//       splitModal.style.display = "none";
//       bet *= 2;
//       betDisplay.textContent = `${bet}`;
//       for (let i = 0; i < playerCards.length; i++) {
//         playerCards[i] = [playerCards[i]];
//
//         hitOrStandPairs(playerCards[i]);
//       }
//     });
//
//     noSplit.addEventListener("click", function() {
//       splitModal.style.display = "none";
//     });
//
//   } else if (playerCards[0].name === "Ace" && playerCards[1].name === "Ace") {
//     splitModal.style.display = "block";
//
//     split.addEventListener('click', function() {
//       splitModal.style.display = "none";
//       bet *= 2;
//       betDisplay.textContent = `${bet}`;
//
//
//     });
//
//     noSplit.addEventListener('click', function() {
//       splitModal.style.display = "none";
//     });
//   }
//
//   function hitOrStandPairs(arr) {
//     chooseModal.style.display = "block";
//     question.textContent = "Will you hit or stand?";
//     a.textContent = "Hit";
//     b.textContent = "Stand";
//
//     a.addEventListener('click', function(arr) {
//
//       addPlayerCardPair(arr);
//
//       // chooseAceVal();
//
//       check21Pair(arr);
//     });
//
//     b.addEventListener('click', function (arr) {
//       if (arr === playerCards[1]) {
//         chooseModal.style.display = "none";
//       }
//       flipCard();
//       dealerPlay();
//     });
//   }
//
//   function addPlayerCardPair(arr) {
//     arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//     playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
//
//     playerHand.innerHTML += `
//       <div>
//         <img src="${arr[arr.length - 1].img}" width="150">
//       </div>
//     `;
//   }
//
//   function check21Pair(arr) {
//     let playerAddedVals = 0;
//     for (let card of arr) {
//       playerAddedVals += card.value;
//     }
//
//     if (playerAddedVals > 21) bustPair();
//   }
//
//   function bustPair() {
//
//   }
// }

// Double Down =========================================

function checkDoubleDown() {
  let playerAddedVals = 0;
  for (let card of playerCards) {
    playerAddedVals += card.value;
  }

  if (playerAddedVals >= 9 && playerAddedVals <= 11) {
    doubleModal.style.display = "block";

    double.addEventListener("click", function() {
      bet *= 2;
      betDisplay.textContent = `${bet}`;

      addPlayerCard();
      flipCard();
      dealerPlay();
    });

    noDouble.addEventListener("click", function() {
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
    surrenderModal.style.display = "block";

    surrender.addEventListener("click", function() {
      surrenderModal.style.display = "none";
      cash -= (bet / 2);
      cashDisplay.textContent = `${cash}`;
      playAgainMsg.textContent = "You surrendered, you lost half your bet.";
      playAgain();
    });

    noSurrender.addEventListener("click", function() {
      surrenderModal.style.display = "none";
    });
  }

  function chooseInsurance() {
    insuranceModal.style.display = "block";

    insurance.addEventListener("click", function() {
      insuranceModal.style.display = "none";
      sideBet();
    });

    noInsurance.addEventListener("click", function() {
      insuranceModal.style.display = "none";
    });
  }

  function sideBet() {
    bet += (bet / 2);
    betDisplay.textContent = `${bet}`;

    flipCard();

    if (dealerCards[1].value === 10) {
      bet += (bet / 2);
      betDisplay.textContent = `${bet}`;
      cash -= (bet / 2);
      cashDisplay.textContent = `${cash}`;
      playAgainMsg.textContent = "The dealer has a blackjack, but since you have insurance, you don't lose cash.";
      playAgain();
    }
  }
}

// Hit or Stand ======================================

function hitOrStand() {
  hitModal.style.display = "block";

  hit.addEventListener('click', function() {

    addPlayerCard();

    // chooseAceVal();

    check21();
  });

  stand.addEventListener('click', function () {
    hitModal.style.display = "none";
    flipCard();
    dealerPlay();
  });

}

function addPlayerCard() {
  playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
  playerDeck.splice(playerDeck.indexOf(playerCards[playerCards.length - 1]), 1);

  playerHand.innerHTML += `
    <div>
      <img src="${playerCards[playerCards.length - 1].img}" width="100">
    </div>
  `;
}

function check21() {
  let playerAddedVals = 0;
  for (let card of playerCards) {
    playerAddedVals += card.value;
  }

  if (playerAddedVals > 21) return bust();
}

function bust() {
  cash -= bet;
  cashDisplay.textContent = `${cash}`;
  hitModal.style.display = "none";
  playAgainMsg.textContent = "You have a bust, you've lost your bet.";
  playAgain();
}

function flipCard() {
  dealerCards.splice(1, 1, dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
  dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
  dealerCard2.innerHTML = `
    <img src="${dealerCards[1].img}" width="100">
  `;
}

function dealerPlay() {
  let dealerAddedVals = 0;
  for (let card of dealerCards) {
    dealerAddedVals += card.value;
  }

  dealerAddedVals <= 16
    ? dealerHit(dealerAddedVals)
    : dealerStand(dealerAddedVals);
}

function dealerHit(dealerAddedVals) {
  while (dealerAddedVals <= 16) {
    dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
    dealerDeck.splice(dealerDeck.indexOf(dealerCards[dealerCards.length - 1]), 1);

    dealerHand.innerHTML += `
      <div>
        <img src="${dealerCards[dealerCards.length - 1].img}" width="100">
      </div>
    `;

    dealerAddedVals += dealerCards[dealerCards.length - 1].value;
  }
  dealerStand(dealerAddedVals);
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
  playAgainMsg.textContent = "You have more points than the dealer, you've won your bet.";
  playAgain();
}

function dealerWins() {
  cash -= bet;
  cashDisplay.textContent = `${cash}`;
  playAgainMsg.textContent = "You have less points than the dealer, you've lost your bet.";
  playAgain();
}

function push() {
  playAgainMsg.textContent = "You and the dealer have the same amount of points, you get to keep your bet.";
  playAgain();
}

function dealerBust() {
  cash += bet;
  cashDisplay.textContent = `${cash}`;
  playAgainMsg.textContent = "The dealer has a bust, you've won your bet.";
  playAgain();
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
  playAgainModal.style.display = "block";
  hitModal.style.display = "none";

  playAgainBtn.addEventListener("click", function() {
    playAgainModal.style.display = "none";

    if (cash <= 0) {
      restartModal.style.display = "block";
      noCashStartOver.addEventListener("click", function() {
        location.reload();
      });
    }

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

    document.getElementById('dealer-card-1').innerHTML = "";
    document.getElementById('dealer-card-2').innerHTML = "";
    document.getElementById('player-card-1').innerHTML = "";
    document.getElementById('player-card-2').innerHTML = "";

    dealerCards = [];
    playerCards = [];

    nextRound();
  });

  startOver.addEventListener("click", function() {
    location.reload();
  });
}

function nextRound() {
  // placeBet();
}
