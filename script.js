"use strict ";

let score0El = document.querySelector("#score0");
let score1El = document.querySelector("#score1");
let current0El = document.querySelector("#current0");
let current1El = document.querySelector("#current1");
let player0El = document.querySelector(".player0");
let player1El = document.querySelector(".player1");
let diceEl = document.querySelector(".dice");

let btnNew = document.querySelector(".btnNew");
let btnRoll = document.querySelector(".btnRoll");
let btnHold = document.querySelector(".btnHold");

let score, currentScore, activePlayer, playing;

// Initialize
let init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // hide the dice
  diceEl.classList.add("hidden");

  // set all scores to 0
  score0El.textContent =
    score1El.textContent =
    current0El.textContent =
    current1El.textContent =
      0;

  // Remove the winner class from both players , add active class to player 0 and remove from player 1
  player0El.classList.remove("playerWinner");
  player1El.classList.remove("playerWinner");
  player0El.classList.add("playerActive");
  player1El.classList.remove("playerActive");
};
init();

let switchPlayer = () => {
  document.getElementById(`current${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("playerActive");
  player1El.classList.toggle("playerActive");
};

let roll = function () {
  if (playing) {
    let dice = +Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `Imgs/${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

let hold = function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add("playerWinner");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("playerActive");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
};
btnHold.addEventListener("click", hold);
btnRoll.addEventListener("click", roll);
btnNew.addEventListener("click", init);
