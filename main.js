"use strict;"

// Display Elements ======================================

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

let startModal = document.getElementById('start-modal');
let play = document.getElementById('play');

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

let splitHitModal = document.getElementById('split-hit-modal');
let splitHit = document.getElementById('split-hit');
let splitStand = document.getElementById('split-stand');

let splitHandModal = document.getElementById('split-hand-modal');
let splitHandMsg = document.getElementById('split-hand-msg');
let splitHand = document.getElementById('split-hand');

let splitBustModal = document.getElementById('split-bust-modal');
let splitBust = document.getElementById('split-bust');

let hitModal = document.getElementById('hit-modal');
let hit = document.getElementById('hit');
let stand = document.getElementById('stand');

let playAgainModal = document.getElementById('play-again-modal');
let playAgainMsg = document.getElementById('play-again-msg');
let playAgainBtn = document.getElementById('play-again');
let startOver = document.getElementById('start-over');

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
  startModal.style.display = "block";
  play.addEventListener("click", startGame, { once: true });
}

const startGame = () => {
  startModal.style.display = "none";
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
          }, { once: true });
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
          for (let i = 0; i < dealerHand.children.length; i++) {
            dealerHand.children[i].innerHTML = `
              <img src="${dealerCards[i].img}" width="70">
            `;
          }
          dealerCard1.innerHTML = `
            <img src="${dealerCards[0].img}" width="70">
          `;
          dealerCard2.innerHTML = `
            <img src="${dealerCards[1].img}" width="70">
          `;
        }

        dealPlayerCards() {
          // playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
          playerCards.push(playerDeck[1]); // for testing purposes
          playerDeck.splice(playerDeck.indexOf(playerCards[0]), 1);
          // playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
          playerCards.push(playerDeck[13]); // for testing purposes
          playerDeck.splice(playerDeck.indexOf(playerCards[1]), 1);
          for (let i = 0; i < playerHand.children.length; i++) {
            playerHand.children[i].innerHTML = `
              <img src="${playerCards[i].img}" width="70">
            `;
          }
          playerCard1.innerHTML = `
            <img src="${playerCards[0].img}" width="70">
          `;
          playerCard2.innerHTML = `
            <img src="${playerCards[1].img}" width="70">
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
              <img src="${dealerCards[1].img}" width="70">
            `;
            dealerCards[0].name === "Ace" && dealerCards[1].value === 10
            || dealerCards[1].name === "Ace" && dealerCards[0].value === 10
              ? this.bothNatural()
              : this.playerNatural();
          } else if (
            dealerCards[0].name === "Ace" || dealerCards[0].value === 10
          ) {
            this.flipCard();
            if (dealerCards[0].name === "Ace" && dealerCards[1].value === 10
            || dealerCards[1].name === "Ace" && dealerCards[0].value === 10) {
              for (let i = 1; i < dealerHand.children.length; i++) {
                dealerHand.children[i].innerHTML = `
                  <img src="${dealerCards[i].img}" width="70">
                `;
              }
              dealerCard2.innerHTML = `
                <img src="${dealerCards[1].img}" width="70">
              `;
              this.dealerNatural();
            } else {
              this.checkPairs();
            }
          } else {
            this.checkPairs();
          }
        }

        bothNatural() {
          playAgainMsg.textContent = "Both of you have a natural, it's a draw.";
          this.playAgain();
        }

        playerNatural() {
          playAgainMsg.textContent = "You have a natural, you've won your bet!";
          cashAmt += (betAmt * 1.5);
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        dealerNatural() {
          playAgainMsg.textContent = "The dealer has a natural, you've lost your bet.";
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        checkPairs() {
          if (playerCards[0].name === playerCards[1].name) {
            splitModal.style.display = "block";
            split.addEventListener("click", function() {
              splitModal.style.display = "none";
              game.hitOrStandPairs([playerCards[0]], 1);
            }, { once: true });
            noSplit.addEventListener("click", function() {
              splitModal.style.display = "none";
              game.checkDoubleDown();
            }, { once: true });
          } else {
            this.checkDoubleDown();
          }
        }

        checkDoubleDown() {
          let playerAddedVals = 0;
          for (let card of playerCards) {
            playerAddedVals += card.value;
          }

          if (playerAddedVals >= 9 && playerAddedVals <= 11) {
            doubleModal.style.display = "block";

            double.addEventListener("click", function() {
              doubleModal.style.display = "none";
              betAmt *= 2;
              bet.textContent = `${betAmt}`;
              game.addPlayerCard();
              game.flipCard();
              game.dealerPlay(playerCards);
            }, { once: true });

            noDouble.addEventListener("click", function() {
              doubleModal.style.display = "none";
              game.checkInsurance();
            }, { once: true });
          } else {
            game.checkInsurance();
          }
        }

        checkInsurance() {
          if (dealerCards[0].name === "Ace") {
            earlySurrender();
          } else {
            game.hitOrStand();
          }

          function earlySurrender() {
            surrenderModal.style.display = "block";

            surrender.addEventListener("click", function() {
              surrenderModal.style.display = "none";
              cashAmt -= betAmt;
              cash.textContent = `${cashAmt}`;
              playAgainMsg.textContent = "You surrendered, you lost.";
              game.playAgain();
            }, { once: true });

            noSurrender.addEventListener("click", function() {
              surrenderModal.style.display = "none";
              chooseInsurance();
            }, { once: true });
          }

          function chooseInsurance() {
            insuranceModal.style.display = "block";

            insurance.addEventListener("click", function() {
              insuranceModal.style.display = "none";
              sideBet();
            }, { once: true });

            noInsurance.addEventListener("click", function() {
              insuranceModal.style.display = "none";
              dealerFlipNoInsurance();
            }, { once: true });
          }

          function sideBet() {
            betModal.style.display = "block";
            betSubmit.addEventListener("click", () => {
              betModal.style.display = "none";
              let sideBet = Number(betModalInput.value);
              game.flipCard();
              if (dealerCards[1].value === 10) {
                for (let i = 1; i < dealerHand.children.length; i++) {
                  dealerHand.children[i].innerHTML = `
                    <img src="${dealerCards[i].img}" width="70">
                  `;
                }
                dealerCard2.innerHTML = `
                  <img src="${dealerCards[1].img}" width="70">
                `;
                cashAmt += sideBet;
                cashAmt -= betAmt;
                cash.textContent = `${cashAmt}`;
                playAgainMsg.textContent = "The dealer has a blackjack, you lost. However, you have insurance.";
                game.playAgain();
              } else {
                game.hitOrStand();
              }
            }, { once: true });
          }

          function dealerFlipNoInsurance() {
            game.flipCard();
            if (dealerCards[1].value === 10) {
              for (let i = 1; i < dealerHand.children.length; i++) {
                dealerHand.children[i].innerHTML = `
                  <img src="${dealerCards[i].img}" width="70">
                `;
              }
              dealerCard2.innerHTML = `
                <img src="${dealerCards[1].img}" width="70">
              `;
              cashAmt -= betAmt;
              cash.textContent = `${cashAmt}`;
              playAgainMsg.textContent = "The dealer has a blackjack, you lost.";
              game.playAgain();
            } else {
              game.hitOrStand();
            }
          }

        }

        hitOrStand() {
          hitModal.style.display = "block";

          hit.addEventListener('click', playerHitHandler);

          function playerHitHandler() {
            game.addPlayerCard();
            game.check21(playerHitHandler);
          }

          stand.addEventListener('click', function () {
            hitModal.style.display = "none";
            hit.removeEventListener('click', playerHitHandler);
            game.flipCard();
            game.dealerPlay(playerCards);
          }, { once: true });
        }

        check21(handler) {
          let playerAddedVals = 0;
          for (let card of playerCards) {
            playerAddedVals += card.value;
          }
          if (playerAddedVals > 21) return game.bust(handler);
        }

        bust(handler) {
          hitModal.style.display = "none";
          hit.removeEventListener('click', handler);
          playAgainMsg.textContent = "You have a bust, you lost.";
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        addPlayerCard() {
          playerCards.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
          playerDeck.splice(playerDeck.indexOf(playerCards[playerCards.length - 1]), 1);

          playerHand.innerHTML += `
            <div>
              <img src="${playerCards[playerCards.length - 1].img}" width="70">
            </div>
          `;
        }

        hitOrStandPairs(arr, num) {
          splitHitModal.style.display = "block";
          function standPairHandler() {
            splitHitModal.style.display = "none";
            game.flipCard();
            game.dealerPlay(arr, num, addPairHandler, standPairHandler);
          }
          function addPairHandler() {
            game.addPlayerCardPair(arr, num, addPairHandler, standPairHandler);
          }
          splitHit.addEventListener('click', addPairHandler);
          splitStand.addEventListener('click', standPairHandler, { once: true });
        }

        addPlayerCardPair(arr, num, handler, handler2) {
          if (num === 1) {
            arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
            playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
            splitHand1.innerHTML += `
              <div>
                <img src="${arr[arr.length - 1].img}" width="70">
              </div>
            `;
            let playerAddedVals = 0;
            for (let card of arr) {
              playerAddedVals += card.value;
            }
            if (playerAddedVals > 21) {
              splitHitModal.style.display = "none";
              splitHit.removeEventListener("click", handler);
              splitStand.removeEventListener("click", handler2);
              game.bustPair(num);
            }
          } else {
            arr.push(playerDeck[Math.floor(Math.random() * (playerDeck.length - 1))]);
            playerDeck.splice(arr.indexOf(arr[arr.length - 1]), 1);
            splitHand2.innerHTML += `
              <div>
                <img src="${arr[arr.length - 1].img}" width="70">
              </div>
            `;
            let playerAddedVals = 0;
            for (let card of arr) {
              playerAddedVals += card.value;
            }
            if (playerAddedVals > 21) {
              splitHitModal.style.display = "none";
              splitHit.removeEventListener("click", handler);
              splitStand.removeEventListener("click", handler2);
              game.bustPair(num);
            }
          }

        }

        bustPair(num) {
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          splitBustModal.style.display = "block";
          splitBust.addEventListener('click', function() {
            splitBustModal.style.display = "none";
            return num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : (
                playAgainMsg.textContent = "Would you like to play again?",
                game.playAgain()
              )
          }, { once: true });
        }

        flipCard() {
          if (dealerCards[1].name === "facedown") {
            dealerCards.splice(1, 1, dealerDeck[Math.floor(Math.random() * (dealerDeck.length - 1))]);
            dealerDeck.splice(dealerDeck.indexOf(dealerCards[1]), 1);
          }
        }

        dealerPlay(arr, num, handler, handler2) {
          splitHit.removeEventListener("click", handler);
          splitStand.removeEventListener("click", handler2);
          for (let i = 1; i < dealerHand.children.length; i++) {
            dealerHand.children[i].innerHTML = `
              <img src="${dealerCards[i].img}" width="70">
            `;
          }
          dealerCard2.innerHTML = `
            <img src="${dealerCards[1].img}" width="70">
          `;
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
                <img src="${dealerCards[dealerCards.length - 1].img}" width="70">
              </div>
            `;

            dealerAddedVals += dealerCards[dealerCards.length - 1].value;
          }
          this.dealerStand(dealerAddedVals, arr, num);
        }

        dealerStand(val, arr, num) {
          val <= 21
            ? this.compareDealer(val, arr, num)
            : this.dealerBust(num);
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
          splitHandMsg.textContent = "You have more points than the dealer, you've won your bet for this hand.";
          splitHandModal.style.display = "block";
          cashAmt += betAmt;
          cash.textContent = `${cashAmt}`;
          splitHand.addEventListener("click", function() {
            splitHandModal.style.display = "none";
            playAgainMsg.textContent = "Would you like to play again?";
            num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : game.playAgain();
          }, { once: true });
        }

        dealerWinsPair(num) {
          splitHandMsg.textContent = "You have less points than the dealer, you lost your bet for this hand.";
          splitHandModal.style.display = "block";
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          splitHand.addEventListener("click", function() {
            splitHandModal.style.display = "none";
            playAgainMsg.textContent = "Would you like to play again?";
            num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : game.playAgain();
          }, { once: true });
        }

        pushPair(num) {
          splitHandMsg.textContent = "You and the dealer have the same amount of points, it's a draw for this hand.";
          splitHandModal.style.display = "block";
          splitHand.addEventListener("click", function() {
            splitHandModal.style.display = "none";
            playAgainMsg.textContent = "Would you like to play again?";
            num === 1
              ? game.hitOrStandPairs([playerCards[1]], 2)
              : game.playAgain();
          }, { once: true });
        }

        playerWins() {
          playAgainMsg.textContent = "You have more points than the dealer, you win.";
          cashAmt += betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        dealerWins() {
          playAgainMsg.textContent = "You have less points than the dealer, you lost.";
          cashAmt -= betAmt;
          cash.textContent = `${cashAmt}`;
          this.playAgain();
        }

        push() {
          playAgainMsg.textContent = "You and the dealer have the same amount of points, it's a draw.";
          this.playAgain();
        }

        dealerBust(num) {
          if (num) {
            splitHandMsg.textContent = "The dealer has a bust, you win this hand.";
            splitHandModal.style.display = "block";
            cashAmt += betAmt;
            cash.textContent = `${cashAmt}`;
            splitHand.addEventListener("click", function() {
              splitHandModal.style.display = "none";
              return num === 1
                ? game.hitOrStandPairs([playerCards[1]], 2)
                : (
                  playAgainMsg.textContent = "Would you like to play again?",
                  game.playAgain()
                )
            }, { once: true });
          } else {
            playAgainMsg.textContent = "The dealer has a bust, you win.";
            cashAmt += betAmt;
            cash.textContent = `${cashAmt}`;
            this.playAgain();
          }
        }

        playAgain() {
          if (cashAmt <= 0) {
            playAgainMsg.textContent = "You ran out of cash. You must start over.";
            playAgainBtn.style.display = "none";
          }
          playAgainModal.style.display = "block";
          playAgainBtn.addEventListener("click", this.newGame, { once: true });
          startOver.addEventListener("click", () => location.reload());
        }

        newGame() {
          playAgainModal.style.display = "none";
          dealerCards = [];
          playerCards = [];
          while (dealerHand.children.length > 2) dealerHand.removeChild(dealerHand.lastChild);
          while (playerHand.children.length > 2) playerHand.removeChild(playerHand.lastChild);
          for (let child of dealerHand.children) {
            child.innerHTML = "";
          }
          for (let child of playerHand.children) {
            child.innerHTML = "";
          }
          dealerCard1.innerHTML = "";
          dealerCard2.innerHTML = "";
          playerCard1.innerHTML = "";
          playerCard2.innerHTML = "";
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
