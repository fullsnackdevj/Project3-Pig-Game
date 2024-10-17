'use strict';

//selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // starting conditions

  //   starting total scores
  score0El.textContent = 0;
  score1El.textContent = 0;

  //   starting current scores
  current0El.textContent = 0;
  current1El.textContent = 0;

  // starting dice state which is hidden
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0; // cannot be inside the function btnRoll because it'll reset every click.
  activePlayer = 0;

  // state variable if players still playing
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      // currentScore = currentScore + dice; long Hand
      currentScore += dice; // short hand
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score

    scores[activePlayer] += currentScore;
    //   scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is > = 100

    if (scores[activePlayer] >= 20) {
      // finish the game

      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. switch to the next player.
      switchPlayer();
    }
  }
});

//resetting the game
btnNew.addEventListener('click', () => {
  if (!playing) {
    init();
  }
});
/*
This way, the condition if (!playing) is checked when the button is clicked, and if playing is false, it will execute the init() function. Let me know if you encounter any other issues!
*/
