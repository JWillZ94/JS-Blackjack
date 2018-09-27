"use strict;"

function loadCards() {
  return fetch("cards.json")
    .then(res => res.json())
    .then(cards => cards)
    .catch(err => err);
}

let deck = loadCards();
console.log(deck);

class Game {
  constructor() {

  }

  createDeck() {
    return deck;
  }
}

let game = new Game();
console.log(game.createDeck());


// class Modal {
//   constructor(msg, btns) {
//     this.msg = msg;
//     this.btns = btns;
//   }
//
//   show() {
//     let h = document.createElement(
//       "div"
//     );
//     let t = document.createTextNode(this.msg);
//     h.appendChild(t);
//     return h;
//   }
// }
//
// let newModal = new Modal("new modal hea", ['btn1', 'btn2']);
// console.log(newModal.show());

let startModal = document.getElementById('start-modal');
let playBtn = document.getElementById('play');

class Deck {
  constructor(cards) {
    this.cards = cards;
  }

  add() {
    console.log("add");
  }
}

let modal = document.getElementById('modal');
let modalContent = document.getElementById('modal-content');
let modalMsg = document.getElementById('modal-msg');

function showModal() {
  modalMsg.textContent = "Want to play BlackJack?";
  const playBtn = document.createElement("button");
  const playBtnTxt = document.createTextNode("Play!");
  playBtn.append(playBtnTxt);
  modalContent.appendChild(playBtn);
  playBtn.addEventListener("click", function() {
    console.log("playin");


  });
  modal.style.display = "block";

  // modals.style.display = "block";

  // playBtn.addEventListener('click', function() {
  //   startModal.style.display = "none";
  //   let playerDeck1 = new Deck([1, 2, 3]);
  //   let dealerDeck1 = new Deck([4, 5, 6]);
  //   console.log(playerDeck1);
  //   console.log(dealerDeck1);
  //   // loadCards();
  // });

}
