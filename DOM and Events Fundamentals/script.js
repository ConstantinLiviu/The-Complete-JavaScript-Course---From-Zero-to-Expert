"use strict";

// CHALLENGE #1 - Guess the number

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
// // CHALLENGE #2 - Modal window
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

// CHALLENGE # 3 - Pig game

// Btns & img
const newGameBtn = document.querySelector(".new-game-btn");
const rollDiceBtn = document.querySelector(".roll-dice-btn");
const savePointsBtn = document.querySelector(".save-points-btn");
const diceImgEl = document.querySelector("img");

// Scores
let playerScores = [0, 0];
let currentScore = 0;

// Payer related
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const playerArr = document.querySelectorAll(".player");
let activePlayer = 1;

// Planned tasks
// TASK - roll die ✅
// TASK - change die img ✅
// TASK - change current score el ✅
// TASK - save points ✅
// TASK - change saved points el ✅
// TASK - change players ✅
// TASK - award winners ✅
// TASK - block buttons until user starts a new game ✅
// TASK - start a new game ✅

// TASK - roll die
/**
 * Generates a random number representing a die roll
 * @param none;
 * @returns {number} die roll
 */
function dieRoll() {
  let number = Math.floor(Math.random() * 6) + 1;
  return number;
}

// TASK - change die img
/**
 * Matches die image to the die roll
 * @param {number} roll - die roll generated by dieRoll function
 * @returns void
 */
function updateDieImage(roll) {
  diceImgEl.src = `img/dice-${roll}.png`;
}

// TASK - change players
/**
 * Switches to the next player
 * @param {} void
 * @returns resets temp score and temp score element text, toggles current-player classes
 */
function switchPlayers() {
  currentScore = 0;
  document.querySelector(
    `.player${activePlayer} .current-score`
  ).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  playerArr.forEach((player) => {
    player.classList.toggle("current-player");
  });
}

/**
 * Enables or disables the roll and save points buttons
 * @param {string} string
 * @returns sets both buttons' pointer-events property to whatever argument is used (none or auto)
 */
function toggleButtonsState(state) {
  savePointsBtn.style.pointerEvents = `${state}`;
  rollDiceBtn.style.pointerEvents = `${state}`;
}

rollDiceBtn.addEventListener("click", () => {
  let roll = dieRoll();
  updateDieImage(roll);

  if (roll !== 1) {
    // TASK - change current score el
    currentScore += roll;

    document.querySelector(
      `.player${activePlayer} .current-score`
    ).textContent = currentScore;
  } else {
    switchPlayers();
  }
});

// TASK - save points
savePointsBtn.addEventListener("click", () => {
  playerScores[activePlayer - 1] += currentScore;
  console.log(playerScores);
  // TASK - change saved points el
  document.querySelector(`.player${activePlayer} .total-score`).textContent =
    playerScores[activePlayer - 1];

  // TASK - award winners
  if (playerScores[activePlayer - 1] >= 100) {
    document.querySelector(`.player${activePlayer}`).classList.add("winner");
    document.querySelector(".winner h1").textContent = "Winner!";
    toggleButtonsState("none");
  }
  switchPlayers();
});

// TASK - start a new game
newGameBtn.addEventListener("click", () => {
  playerScores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  toggleButtonsState("auto");
  playerArr.forEach((player, i) => {
    player.querySelector("h1").textContent = `player ${i + 1}`;
    player.classList.remove("winner");
    player.querySelector(".total-score").textContent = 0;
    player.querySelector(".current-score").textContent = 0;
    if (i === 0) {
      player.classList.add("current-player");
    } else {
      player.classList.remove("current-player");
    }
  });
});
