"use strict";

// TASK #1 - Guess the number

const challengeGuessEl = document.querySelector(".challenge-guess");
const restartBtn = document.querySelector(".header button");
const numberRevealEl = document.querySelector(".number-square p");
const numberGuessEl = document.querySelector(".guess input");
const checkBtnEl = document.querySelector(".guess button");
const guessCheckMsgEl = document.querySelector(".guess-status");
const scoreEl = document.querySelector(".score span");
const highscoreEl = document.querySelector(".highscore span");

let number = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

checkBtnEl.addEventListener("click", () => {
  // game over condition
  if (score < 2) {
    guessCheckMsgEl.textContent = "😭 Game over! Try again!";
    numberGuessEl.value = "";
    score = 20;
    scoreEl.textContent = 20;
  }
  //   empty input field filter
  if (numberGuessEl.value === "") return;
  //   get user guess and turn into int
  let guess = +numberGuessEl.value;

  //   check user choice against generated number
  //   refactoring example
  if (guess !== number) {
    score--;
    scoreEl.textContent = `${score}`;
    guessCheckMsgEl.textContent = guess > number ? "Too high!" : "Too low!";
  }

  //   if (guess > number) {
  //     score--;
  //     guessCheckMsgEl.textContent = "Too high!";
  //     scoreEl.textContent = `${score}`;
  //   } else if (guess < number) {
  //     score--;
  //     guessCheckMsgEl.textContent = "Too low!";
  //     scoreEl.textContent = `${score}`;
  //   }
  else {
    // update highscore if required
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = `${highscore}`;
    }
    guessCheckMsgEl.textContent = "You got it!";
    numberRevealEl.textContent = `${guess}`;
    challengeGuessEl.classList.remove("bg-dark");
    challengeGuessEl.style.animation = "1s infinite win";
    guessCheckMsgEl.classList.add("win");
    numberGuessEl.value = "";
  }
});

// game reset
restartBtn.addEventListener("click", () => {
  challengeGuessEl.classList.add("bg-dark");
  challengeGuessEl.style.animation = "";
  guessCheckMsgEl.classList.remove("win");
  guessCheckMsgEl.textContent = "<- Choose a number (1-20)";
  numberRevealEl.textContent = "?";
  numberGuessEl.value = "";
  score = 20;
  scoreEl.textContent = 20;
  number = Math.floor(Math.random() * 20) + 1;
});

// *******************************************************************************************************************//

// As the bootstrap modal would conflict with the vanilla modal window, the vanilla one will be commented out;
// // TASK #2 - Modal window
// const modalWindowEl = document.querySelector(".modal-window-vanilla");
// const modalCloseBtn = document.querySelector(".close-modal-btn");
// const overlayEl = document.querySelector(".overlay-el");
// const modalOpenBtns = document.querySelectorAll(".modal-btn");

// // create an arry to handle all modal closing options
// const closeEls = document.querySelectorAll(".close-modal-btn, .overlay-el");

// /**
//  * removes hidden class and adds blur class
//  * @param {} none
//  * @returns void
//  */
// function openModal() {
//   modalWindowEl.classList.remove("hidden-modal-window");
//   overlayEl.classList.remove("hidden-modal-window");
//   document.querySelector("body>a").classList.add("blur");
//   document.querySelector("body>section").classList.add("blur");
// }

// /**
//  * removes blur class and adds hidden class
//  * @param {} none
//  * @returns void
//  */
// function closeModal() {
//   document.querySelector("body>a").classList.remove("blur");
//   document.querySelector("body>section").classList.remove("blur");
//   modalWindowEl.classList.add("hidden-modal-window");
//   overlayEl.classList.add("hidden-modal-window");
// }

// for (let i = 0; i < modalOpenBtns.length; i++) {
//   modalOpenBtns[i].addEventListener("click", openModal);
// }

// closeEls.forEach((elem) => {
//   elem.addEventListener("click", closeModal);
// });

// document.addEventListener("keydown", (e) => {
//   if (
//     e.key === "Escape" &&
//     !modalWindowEl.classList.contains("hidden-modal-window")
//   )
//     closeModal();
// });

// *******************************************************************************************************************//

// TASK # 3 - Pig game
