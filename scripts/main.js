// "use strict;"
//
// // let test = require('./test');
//
// // Display Elements ======================================
//
// let dealerHand = document.getElementById('dealer-hand');
// let dealerCard1 = document.getElementById('dealer-card-1');
// let dealerCard2 = document.getElementById('dealer-card-2');
// let playerHand = document.getElementById('player-hand');
// let playerCard1 = document.getElementById('player-card-1');
// let playerCard2 = document.getElementById('player-card-2');
//
// // Modals ==============================================
//
//
//
// let doubleModal = document.getElementById('double-modal');
// let double = document.getElementById('double');
// let noDouble = document.getElementById('no-double');
//
// let surrenderModal = document.getElementById('surrender-modal');
// let surrender = document.getElementById('surrender');
// let noSurrender = document.getElementById('no-surrender');
//
// let insuranceModal = document.getElementById('insurance-modal');
// let insurance = document.getElementById('insurance');
// let noInsurance = document.getElementById('no-insurance');
//
// let splitModal = document.getElementById('split-modal');
// let split = document.getElementById('split');
// let noSplit = document.getElementById('no-split');
//
// let splitHitModal = document.getElementById('split-hit-modal');
// let splitHit = document.getElementById('split-hit');
// let splitStand = document.getElementById('split-stand');
// let splitHand1 = document.getElementById('split-hand-1');
// let splitHand2 = document.getElementById('split-hand-2');
// let splitBustModal = document.getElementById('split-bust-modal');
// let splitBust = document.getElementById('split-bust');
//
// let hitModal = document.getElementById('hit-modal');
// let hit = document.getElementById('hit');
// let stand = document.getElementById('stand');
//
// let playAgainModal = document.getElementById('play-again-modal');
// let playAgainMsg = document.getElementById('play-again-msg');
// let playAgainBtn = document.getElementById('play-again');
// let startOver = document.getElementById('start-over');
//
// let restartModal = document.getElementById('no-cash-modal');
// let noCashStartOver = document.getElementById('no-cash-start-over');
//
// // Game data =======================================
//
// let dealerDeck = [];
// let playerDeck = [];
// let dealerCards = [];
// let playerCards = [];
//
// // Game ===============================================
//
//
//
// function loadCards() {
//   let xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "cards.json", true);
//   xhttp.onload = function () {
//     let cards = JSON.parse(this.responseText);
//     for (let c of cards) {
//       dealerDeck.push(c);
//       playerDeck.push(c);
//     }
//
//     dealCards();
//   }
//
//   xhttp.send();
// }
//
// function dealCards() {
//   dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
//   dealerDeck.splice(dealerDeck.indexOf(dealerCards[0]), 1);
//   dealerCards.push(dealerDeck[dealerDeck.length - 1]);
//   dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
//
//   // playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//   playerCards.push(playerDeck[5]); // for testing purposes
//   playerDeck.splice(playerDeck.indexOf(playerCards[0]), 1);
//   // playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//   playerCards.push(playerDeck[17]); // for testing purposes
//   playerDeck.splice(playerDeck.indexOf(playerCards[1]), 1);
//
//   dealerCard1.innerHTML += `
//     <img src="${dealerCards[0].img}" width="100">
//   `;
//   dealerCard2.innerHTML = `
//     <img src="${dealerCards[1].img}" width="100">
//   `;
//   playerCard1.innerHTML = `
//     <img src="${playerCards[0].img}" width="100">
//   `;
//   playerCard2.innerHTML = `
//     <img src="${playerCards[1].img}" width="100">
//   `;
//
//   checkNatural();
//
//   checkPairs();
//
//
//
//   checkInsurance();
//
//   // hitOrStand();
//
// }
//
// // Natural ===========================================================
//
// function checkNatural() {
//   if (
//     playerCards[0].name === "Ace" && playerCards[1].value === 10
//     || playerCards[1].name === "Ace" && playerCards[0].value === 10
//   ) {
//     dealerCards.splice(1, 1, dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
//     dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
//     dealerCard2.innerHTML = `
//       <img src="${dealerCards[1].img}" width="100">
//     `;
//     dealerCards[0].name === "Ace" && dealerCards[1].value === 10
//     || dealerCards[1].name === "Ace" && dealerCards[0].value === 10
//       ? bothNatural()
//       : playerNatural();
//   } else if (
//     dealerCards[0].name === "Ace" && dealerCards[1].value === 10
//     || dealerCards[1].name === "Ace" && dealerCards[0].value === 10
//   ) dealerNatural();
//
//   function bothNatural() {
//     playAgainMsg.textContent = "Both of you have a natural, it's a draw.";
//     playAgain();
//   }
//
//   function playerNatural() {
//     playAgainMsg.textContent = "You have a natural, you win!";
//     playAgain();
//   }
//
//   function dealerNatural() {
//     playAgainMsg.textContent = "The dealer has a natural, you lost.";
//     playAgain();
//   }
// }
//
// // Split Pairs =======================================
//
// function checkPairs() {
//   if (playerCards[0].name === playerCards[1].name) {
//     splitModal.style.display = "block";
//
//     split.addEventListener("click", function() {
//       splitModal.style.display = "none";
//
//       checkPairCount(1);
//     });
//
//     noSplit.addEventListener("click", function() {
//       splitModal.style.display = "none";
//
//       checkDoubleDown();
//     });
//
//   }
//
//   function checkPairCount(count) {
//     if (count === 1) {
//       hitOrStandPairs([playerCards[0]]);
//     } else {
//       hitOrStandPairs2([playerCards[1]]);
//     }
//   }
//
//   splitHand1.prototype = {
//     addPlayerCardPair(arr) {
//       arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//       playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
//
//       splitHand1.innerHTML += `
//         <div>
//           <img src="${arr[arr.length - 1].img}" width="100">
//         </div>
//       `;
//       return arr;
//     }
//   };
//
//   splitHand2.prototype = {
//     addPlayerCardPair2(arr) {
//       arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//       playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
//
//       splitHand2.innerHTML += `
//         <div>
//           <img src="${arr[arr.length - 1].img}" width="100">
//         </div>
//       `;
//       return arr;
//     }
//   };
//
//   function hitOrStandPairs(arr) {
//     splitHitModal.style.display = "block";
//
//     splitHit.addEventListener('click', function() {
//       splitHand1.prototype.addPlayerCardPair(arr);
//       check21Pair(arr);
//     });
//
//     splitStand.addEventListener('click', function () {
//       if (arr === playerCards[1]) {
//         splitHitModal.style.display = "none";
//       }
//       flipCard();
//       dealerPlay();
//     });
//   }
//
//   // function addPlayerCardPair(arr) {
//   //   arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//   //   playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
//   //
//   //   splitHand1.innerHTML += `
//   //     <div>
//   //       <img src="${arr[arr.length - 1].img}" width="100">
//   //     </div>
//   //   `;
//   //
//   // }
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
//     splitBustModal.style.display = "block";
//
//     splitBust.addEventListener('click', function() {
//       splitBustModal.style.display = "none";
//
//       checkPairCount(2);
//
//     });
//   }
//
//   function hitOrStandPairs2(arr) {
//     splitHitModal.style.display = "block";
//
//     splitHit.addEventListener('click', function() {
//       splitHand2.prototype.addPlayerCardPair2(arr);
//       check21Pair2(arr);
//     });
//
//     splitStand.addEventListener('click', function () {
//       if (arr === playerCards[1]) {
//         splitHitModal.style.display = "none";
//       }
//       flipCard();
//       dealerPlay();
//     });
//   }
//
//   // function addPlayerCardPair2(arr) {
//   //   arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//   //   playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
//   //
//   //   splitHand2.innerHTML += `
//   //     <div>
//   //       <img src="${arr[arr.length - 1].img}" width="100">
//   //     </div>
//   //   `;
//   //
//   // }
//
//   function check21Pair2(arr) {
//     let playerAddedVals = 0;
//     for (let card of arr) {
//       playerAddedVals += card.value;
//     }
//
//     if (playerAddedVals > 21) bustPair2();
//   }
//
//   function bustPair2() {
//     splitBustModal.style.display = "block";
//
//     splitBust.addEventListener('click', function() {
//       splitBustModal.style.display = "none";
//
//       playAgain();
//
//     });
//   }
// }
//
// // Double Down =========================================
//
// function checkDoubleDown() {
//   let playerAddedVals = 0;
//   for (let card of playerCards) {
//     playerAddedVals += card.value;
//   }
//
//   if (playerAddedVals >= 9 && playerAddedVals <= 11) {
//     doubleModal.style.display = "block";
//
//     double.addEventListener("click", function() {
//
//       addPlayerCard();
//       flipCard();
//       dealerPlay();
//     });
//
//     noDouble.addEventListener("click", function() {
//       doubleModal.style.display = "none";
//     });
//   }
// }
//
// // Insurance =========================================
//
// function checkInsurance() {
//   if (dealerCards[0].name === "Ace") {
//     earlySurrender();
//     chooseInsurance();
//   }
//
//   function earlySurrender() {
//     surrenderModal.style.display = "block";
//
//     surrender.addEventListener("click", function() {
//       surrenderModal.style.display = "none";
//       playAgainMsg.textContent = "You surrendered, you lost.";
//       playAgain();
//     });
//
//     noSurrender.addEventListener("click", function() {
//       surrenderModal.style.display = "none";
//     });
//   }
//
//   function chooseInsurance() {
//     insuranceModal.style.display = "block";
//
//     insurance.addEventListener("click", function() {
//       insuranceModal.style.display = "none";
//       sideBet();
//     });
//
//     noInsurance.addEventListener("click", function() {
//       insuranceModal.style.display = "none";
//     });
//   }
//
//   function sideBet() {
//
//     flipCard();
//
//     if (dealerCards[1].value === 10) {
//       playAgainMsg.textContent = "The dealer has a blackjack, you lost.";
//       playAgain();
//     }
//   }
// }
//
// // Hit or Stand ======================================
//
// function hitOrStand() {
//   hitModal.style.display = "block";
//
//   hit.addEventListener('click', function() {
//
//     addPlayerCard();
//
//     check21();
//   });
//
//   stand.addEventListener('click', function () {
//     hitModal.style.display = "none";
//     flipCard();
//     dealerPlay();
//   });
//
// }
//
// function addPlayerCard() {
//   playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
//   playerDeck.splice(playerDeck.indexOf(playerCards[playerCards.length - 1]), 1);
//
//   playerHand.innerHTML += `
//     <div>
//       <img src="${playerCards[playerCards.length - 1].img}" width="100">
//     </div>
//   `;
// }
//
// function check21() {
//   let playerAddedVals = 0;
//   for (let card of playerCards) {
//     playerAddedVals += card.value;
//   }
//
//   if (playerAddedVals > 21) return bust();
// }
//
// function bust() {
//   hitModal.style.display = "none";
//   playAgainMsg.textContent = "You have a bust, you lost.";
//   playAgain();
// }
//
// function flipCard() {
//   dealerCards.splice(1, 1, dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
//   dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
//   dealerCard2.innerHTML = `
//     <img src="${dealerCards[1].img}" width="100">
//   `;
// }
//
// function dealerPlay() {
//   let dealerAddedVals = 0;
//   for (let card of dealerCards) {
//     dealerAddedVals += card.value;
//   }
//
//   dealerAddedVals <= 16
//     ? dealerHit(dealerAddedVals)
//     : dealerStand(dealerAddedVals);
// }
//
// function dealerHit(dealerAddedVals) {
//   while (dealerAddedVals <= 16) {
//     dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
//     dealerDeck.splice(dealerDeck.indexOf(dealerCards[dealerCards.length - 1]), 1);
//
//     dealerHand.innerHTML += `
//       <div>
//         <img src="${dealerCards[dealerCards.length - 1].img}" width="100">
//       </div>
//     `;
//
//     dealerAddedVals += dealerCards[dealerCards.length - 1].value;
//   }
//   dealerStand(dealerAddedVals);
// }
//
// function dealerStand(val) {
//   val <= 21
//     ? compareDealer(val)
//     : dealerBust();
// }
//
// function compareDealer(val) {
//   let playerAddedVals = 0;
//   for (let card of playerCards) {
//     playerAddedVals += card.value;
//   }
//
//   switch(true) {
//     case (playerAddedVals > val):
//       playerWins();
//       break;
//     case (playerAddedVals < val):
//       dealerWins();
//       break;
//     case (playerAddedVals === val):
//       push();
//       break;
//   }
// }
//
// function playerWins() {
//   playAgainMsg.textContent = "You have more points than the dealer, you win.";
//   playAgain();
// }
//
// function dealerWins() {
//   playAgainMsg.textContent = "You have less points than the dealer, you lost.";
//   playAgain();
// }
//
// function push() {
//   playAgainMsg.textContent = "You and the dealer have the same amount of points, it's a draw.";
//   playAgain();
// }
//
// function dealerBust() {
//   playAgainMsg.textContent = "The dealer has a bust, you win.";
//   playAgain();
// }
//
// // End of game =============================================
//
// function playAgain() {
//   playAgainModal.style.display = "block";
//   hitModal.style.display = "none";
//
//   startOver.addEventListener("click", function() {
//     location.reload();
//   });
// }
