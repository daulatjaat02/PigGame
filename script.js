"use strict ";

let score0El = document.getElementById("score0");
let score1El = document.querySelector("#score1");
let player0El = document.getElementById("player0");
let player1El = document.querySelector("#player1");
let current0El = document.getElementById("current0");
let current1El = document.querySelector("#current1");
let diceEl = document.querySelector(".dice ");
let btnNew = document.querySelector(".btnNew");
let btnRoll = document.querySelector(".btnRoll");
let btnHold = document.querySelector(".btnHold");

let scores, currentScore, activePlayer, playing;

let init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add("hidden");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

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

btnRoll.addEventListener("click", () => {
  if (playing) {
    let dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
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
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
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
});

btnNew.addEventListener("click", init);
