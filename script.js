'use strict';

// Selecting player background elements
let player1Background = document.querySelector('.player0');
let player2Background = document.querySelector('.player1');

// Selecting player name elements
const play1Name = document.getElementById('name--0');
const play2Name = document.getElementById('name--1');

// Selecting dice and setting its initial visibility
const dice = document.querySelector('.dice');
let imgDice = (document.querySelector('img').style.visibility = 'hidden');

// Selecting score elements for both players
let score1 = document.getElementById('score--0');
let score2 = document.getElementById('score--1');

// Selecting buttons for new game, roll dice, and hold
const newGamebtn = document.querySelector('.btnnew');
const rollDicebtn = document.querySelector('.btnroll');
const holdbtn = document.querySelector('.btnhold');

// Array to store scores for both players
const scores = [0, 0];
// Variable to store the current score during a player's turn
let currentScore = 0;
// Variable to track the active player (0 or 1)
let activePlayer = 0;
// Variable to control whether the game is still in progress
let playing = true;

// Function to switch to the next player's turn
const switchPlayer = function () {
  // Resetting the current score for the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Toggling the active player indicator
  activePlayer = activePlayer == 0 ? 1 : 0;
  player1Background.classList.toggle('player--active');
  player2Background.classList.toggle('player--active');
};

// Event listener for the "Roll Dice" button
rollDicebtn.addEventListener('click', function () {
  // Checking if the game is still in progress
  if (playing) {
    // Generating a random number between 1 and 6 for the dice
    const randomNr = Math.trunc(Math.random() * 6) + 1;
    // Displaying the corresponding dice image
    dice.src = `dice-${randomNr}.png`;
    // Making the dice image visible
    imgDice = document.querySelector('img').style.visibility = 'visible';

    if (randomNr != 1) {
      // If the rolled number is not 1, update the current score
      currentScore += randomNr;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If the rolled number is 1, switch to the next player's turn
      switchPlayer();
    }
  }
});

// Event listener for the "Hold" button
holdbtn.addEventListener('click', function () {
  // Checking if the game is still in progress
  if (playing) {
    // Adding the current score to the active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Checking if the active player has won
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Adding winner class and updating text for the winner
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER';
      // Hiding the dice image
      imgDice = document.querySelector('img').style.visibility = 'hidden';
    }

    // Switching to the next player's turn
    switchPlayer();
  }
});

// Event listener for the "New Game" button
newGamebtn.addEventListener('click', function () {
  // Reloading the page to start a new game
  location.reload();
});
