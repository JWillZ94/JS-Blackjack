"use strict;"

// Display Elements ======================================

let modal = document.getElementById('modal');
let modalContent = document.getElementById('modal-content');
let modalMsg = document.getElementById('modal-msg');
let modalBtn1 = document.getElementById('modal-btn-1');
let modalBtn2 = document.getElementById('modal-btn-2');
let betModal = document.getElementById('bet-modal');
let betModalContent = document.getElementById('bet-modal-content');
let betModalMsg = document.getElementById('bet-modal-msg');
let betModalInput = document.getElementById('bet-modal-input');
let betSubmit = document.getElementById('bet-submit');
let dealerHand = document.getElementById('dealer-hand');
let dealerCard1 = document.getElementById('dealer-card-1');
let dealerCard2 = document.getElementById('dealer-card-2');
let playerHand = document.getElementById('player-hand');
let playerCard1 = document.getElementById('player-card-1');
let playerCard2 = document.getElementById('player-card-2');
let splitHand1 = document.getElementById('split-hand-1');
let splitHand2 = document.getElementById('split-hand-2');
let cash = document.getElementById('cash');
let bet = document.getElementById('bet');

// Modals ==============================================


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

// Game data =======================================

let dealerDeck = [];
let playerDeck = [];
let dealerCards = [];
let playerCards = [];
let cashAmt = 1000;
let betAmt = 0;
cash.textContent = `${cashAmt}`;
bet.textContent = `${betAmt}`;

// Game ===============================================

function showModal() {
  modalMsg.textContent = "Want to play BlackJack?";
  modalBtn1.textContent = "Play!";
  modalBtn1.addEventListener("click", startGame, { once: true });
  modal.style.display = "block";
}

const startGame = () => {
  modal.style.display = "none";
  return fetch("cards.json")
    .then(res => res.json())
    .then(deck => {

      class Game {

        placeBet() {
          betModal.style.display = "block";
          betSubmit.addEventListener("click", () => {
            betModal.style.display = "none";
            betAmt = Number(betModalInput.value);
            bet.textContent = `${betAmt}`;
            if (dealerCards.length === 0) {
              game.dealDealerCards();
              game.dealPlayerCards();
              game.checkNatural();
            }
          });
        }

        createDeck() {
          return Object.assign([], deck);
        }

        dealDealerCards() {
          dealerCards.push(dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
          // dealerCards.push(dealerDeck[0]); // for testing purposes
          dealerDeck.splice(dealerDeck.indexOf(dealerCards[0]), 1);
          dealerCards.push(dealerDeck[dealerDeck.length - 1]);
          // dealerCards.push(dealerDeck[10]); // for testing purposes
          dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
          dealerCard1.innerHTML = `
            <img src="${dealerCards[0].img}" width="100">
          `;
          dealerCard2.innerHTML = `
            <img src="${dealerCards[1].img}" width="100">
          `;
        }

        dealPlayerCards() {
          // playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
          playerCards.push(playerDeck[3]); // for testing purposes
          playerDeck.splice(playerDeck.indexOf(playerCards[0]), 1);
          // playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
          playerCards.push(playerDeck[15]); // for testing purposes
          playerDeck.splice(playerDeck.indexOf(playerCards[1]), 1);
          playerCard1.innerHTML = `
            <img src="${playerCards[0].img}" width="100">
          `;
          playerCard2.innerHTML = `
            <img src="${playerCards[1].img}" width="100">
          `;
        }

        checkNatural() {
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
              ? this.bothNatural()
              : this.playerNatural();
          } else if (
            dealerCards[0].name === "Ace" && dealerCards[1].value === 10
            || dealerCards[1].name === "Ace" && dealerCards[0].value === 10
          ) {
            this.dealerNatural();
          } else {
            this.checkPairs();
          }
        }

        bothNatural() {
          modalMsg.textContent = "Both of you have a natural, it's a draw.";
          this.playAgain();
        }

        playerNatural() {
          modalMsg.textContent = "You have a natural, you've won your bet!";
          cashAmt += betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        dealerNatural() {
          modalMsg.textContent = "The dealer has a natural, you've lost your bet.";
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        checkPairs() {
          if (playerCards[0].name === playerCards[1].name) {
            modalMsg.textContent = "Would you like to split your pair?";
            modalBtn1.textContent = "Yes";
            modalBtn1.addEventListener("click", function() {
              modal.style.display = "none";
              game.hitOrStandPairs([playerCards[0]], 1);
            }, { once: true });
            if (modalBtn2.style.display === "") modalBtn2.style.display = "block";
            modalBtn2.textContent = "No"
            modalBtn2.addEventListener("click", function() {
              modal.style.display = "none";

              // this.checkDoubleDown();
            }, { once: true });
            modal.style.display = "block";
          } else {
            // this.checkDoubleDown()
          }
        }

        hitOrStandPairs(arr, num) {
          modal.style.display = "block";
          modalMsg.textContent = "Hit or stand?"
          modalBtn1.textContent = "Hit";
          function addPairHandler() {
            game.addPlayerCardPair(arr, num, addPairHandler);
          }
          modalBtn1.addEventListener('click', addPairHandler);
          if (modalBtn2.style.display === "none") modalBtn2.style.display = "block";
          modalBtn2.textContent = "Stand";
          modalBtn2.addEventListener('click', function () {
            modal.style.display = "none";
            game.flipCard();
            game.dealerPlay(arr, num);
          }, { once: true });
        }

        addPlayerCardPair(arr, num, handler) {
          if (num === 1) {
            arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
            playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
            splitHand1.innerHTML += `
              <div>
                <img src="${arr[arr.length - 1].img}" width="100">
              </div>
            `;
            let playerAddedVals = 0;
            for (let card of arr) {
              playerAddedVals += card.value;
            }
            if (playerAddedVals > 21) {
              modalBtn1.removeEventListener("click", handler);
              game.bustPair(num);
            }
          } else {
            arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
            playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
            splitHand2.innerHTML += `
              <div>
                <img src="${arr[arr.length - 1].img}" width="100">
              </div>
            `;
            let playerAddedVals = 0;
            for (let card of arr) {
              playerAddedVals += card.value;
            }
            if (playerAddedVals > 21) {
              modalBtn1.removeEventListener("click", handler);
              game.bustPair(num);
            }
          }

        }

        bustPair(num) {
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          modal.style.display = "block";
          modalMsg.textContent = "You have a bust! You have lost your bet.";
          modalBtn1.textContent = "Ok";
          modalBtn1.addEventListener('click', function() {
            modal.style.display = "none";
            return num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : (
                modalMsg.textContent = "Would you like to play again?",
                game.playAgain()
              )
          }, { once: true });
          modalBtn2.style.display = "none";
        }

        flipCard() {
          dealerCards.splice(1, 1, dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
          dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
          dealerCard2.innerHTML = `
            <img src="${dealerCards[1].img}" width="100">
          `;
        }

        dealerPlay(arr, num) {
          let dealerAddedVals = 0;
          for (let card of dealerCards) {
            dealerAddedVals += card.value;
          }

          dealerAddedVals <= 16
            ? this.dealerHit(dealerAddedVals, arr, num)
            : this.dealerStand(dealerAddedVals, arr, num);
        }

        dealerHit(dealerAddedVals, arr, num) {
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
          this.dealerStand(dealerAddedVals, arr, num);
        }

        dealerStand(val, arr, num) {
          val <= 21
            ? this.compareDealer(val, arr, num)
            : this.dealerBust();
        }

        compareDealer(val, arr, num) {
          let playerAddedVals = 0;
          for (let card of arr) {
            playerAddedVals += card.value;
          }

          if (num) {
            switch(true) {
              case (playerAddedVals > val):
                this.playerWinsPair(num);
                break;
              case (playerAddedVals < val):
                this.dealerWinsPair(num);
                break;
              case (playerAddedVals === val):
                this.pushPair(num);
                break;
            }
          } else {
            switch(true) {
              case (playerAddedVals > val):
                this.playerWins();
                break;
              case (playerAddedVals < val):
                this.dealerWins();
                break;
              case (playerAddedVals === val):
                this.push();
                break;
            }
          }

        }

        playerWinsPair(num) {
          modalMsg.textContent = "You have more points than the dealer, you win your bet for this hand.";
          modal.style.display = "block";
          cashAmt += betAmt;
          cash.textContent = `${cashAmt}`;
          modalBtn1.textContent = "Ok";
          modalBtn1.addEventListener("click", function() {
            num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : game.playAgain();
          }, { once: true });
        }

        dealerWinsPair(num) {
          modalMsg.textContent = "You have less points than the dealer, you lost your bet for this hand.";
          modal.style.display = "block";
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          modalBtn1.textContent = "Ok";
          modalBtn1.addEventListener("click", function() {
            num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : game.playAgain();
          }, { once: true });
        }

        pushPair(num) {
          modalMsg.textContent = "You and the dealer have the same amount of points, it's a draw for this hand.";
          modal.style.display = "block";
          modalBtn1.textContent = "Ok";
          modalBtn1.addEventListener("click", function() {
            num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : game.playAgain();
          }, { once: true });
        }

        playerWins() {
          modalMsg.textContent = "You have more points than the dealer, you win.";
          cashAmt += betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        dealerWins() {
          modalMsg.textContent = "You have less points than the dealer, you lost.";
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        push() {
          modalMsg.textContent = "You and the dealer have the same amount of points, it's a draw.";
          this.playAgain();
        }

        dealerBust() {
          modalMsg.textContent = "The dealer has a bust, you win.";
          cashAmt += betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        playAgain() {
          modalBtn1.textContent = "Play Again";
          modalBtn1.addEventListener("click", this.newGame);
          if (modalBtn2.style.display === "") modalBtn2.style.display = "block";
          modalBtn2.textContent = "Start Over";
          modalBtn2.addEventListener("click", () => location.reload());
          modal.style.display = "block";
        }

        newGame() {
          modal.style.display = "none";
          dealerCards = [];
          playerCards = [];
          dealerCard1.innerHTML = "";
          dealerCard2.innerHTML = "";
          playerCard1.innerHTML = "";
          playerCard2.innerHTML = "";
          console.log(dealerHand.length);
          while (dealerHand.length > 2) dealerHand.removeChild(this.lastChild);
          while (playerHand.length > 2) playerHand.removeChild(this.lastChild);
          splitHand1.innerHTML = "";
          splitHand2.innerHTML = "";
          dealerDeck = game.createDeck();
          playerDeck = game.createDeck();
          game.placeBet();

        }

      }

      let game = new Game();

      game.placeBet();

      dealerDeck = game.createDeck();
      playerDeck = game.createDeck();

    })
    .catch(err => err);
}
//
//
// function dealCards() {
//
//   checkInsurance();
//
//   // hitOrStand();
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
