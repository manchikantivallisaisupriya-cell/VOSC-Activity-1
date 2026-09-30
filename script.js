/**
 * ================================================================
 *  NEON TIC-TAC-TOE ARENA  —  script.js
 *  VOSC Activity-1
 *  Pure Vanilla JavaScript — No libraries, no frameworks.
 * ================================================================
 *
 *  Sections:
 *    A. Constants & State
 *    B. DOM References
 *    C. Initialisation
 *    D. Cell Click Handler
 *    E. Win / Draw Detection
 *    F. Game-Over Handling (Win & Draw)
 *    G. UI Update Helpers
 *    H. Button Handlers
 *    I. Keyboard Accessibility
 *    J. Bootstrap
 */

'use strict';

/* ================================================================
   A.  CONSTANTS & STATE
   ================================================================ */

/** All 8 possible winning combinations (cell index triples). */
const WIN_COMBOS = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // col 1
  [1, 4, 7], // col 2
  [2, 5, 8], // col 3
  [0, 4, 8], // diagonal ↘
  [2, 4, 6], // diagonal ↙
];

/**
 * board[i] — '' | 'X' | 'O'
 * Tracks what symbol (if any) occupies each of the 9 cells.
 */
let board         = Array(9).fill('');
let currentPlayer = 'X';    // 'X' always starts a new round
let gameActive    = false;  // set true once initRound() runs

/** Scoreboard data (survives New Round, reset by RESET SCORE). */
const scores = { X: 0, O: 0, Draw: 0 };

/* ================================================================
   B.  DOM REFERENCES
   ================================================================ */
const cells         = document.querySelectorAll('.cell');
const boardEl       = document.getElementById('board');
const turnDot       = document.getElementById('turn-dot');
const turnText      = document.getElementById('turn-text');
const resultBanner  = document.getElementById('result-banner');
const resultText    = document.getElementById('result-text');
const xScoreEl      = document.getElementById('x-score');
const oScoreEl      = document.getElementById('o-score');
const drawScoreEl   = document.getElementById('draw-score');
const scoreXBlock   = document.getElementById('score-x-block');
const scoreOBlock   = document.getElementById('score-o-block');
const newRoundBtn   = document.getElementById('new-round-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');

/* ================================================================
   C.  INITIALISATION  (called on page-load and after New Round)
   ================================================================ */

/**
 * initRound — Resets the board state and UI for a fresh round.
 * Player X always goes first.
 */
function initRound() {
  board         = Array(9).fill('');
  currentPlayer = 'X';
  gameActive    = true;

  // Clear every cell's text and styling
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className   = 'cell';          // strips x / o / taken / win / pop
    cell.setAttribute('aria-label', `Cell ${+cell.dataset.index + 1}`);
  });

  // Unlock the board
  boardEl.classList.remove('locked');

  // Hide the result banner
  hideResultBanner();

  // Reset turn indicator to X
  setTurnIndicator('X');

  // Highlight X's score card as "active"
  highlightActiveScoreCard();
}

/* ================================================================
   D.  CELL CLICK HANDLER
   ================================================================ */

/**
 * handleCellClick — Fired when a user clicks (or presses Enter/Space
 * via keyboard) on a board cell.
 */
function handleCellClick(event) {
  const cell  = event.currentTarget;
  const index = parseInt(cell.dataset.index, 10);

  // Guard: ignore if game over or cell already taken
  if (!gameActive || board[index] !== '') return;

  // Place the symbol
  placeSymbol(cell, index);
}

/**
 * placeSymbol — Updates state & DOM, then checks for win / draw.
 */
function placeSymbol(cell, index) {
  const player = currentPlayer;

  // Update logical board
  board[index] = player;

  // Update cell appearance
  cell.textContent = player;
  cell.classList.add(player.toLowerCase(), 'taken', 'pop');
  cell.setAttribute('aria-label', `Cell ${index + 1}: ${player}`);

  // Remove the pop class after animation so it can retrigger if needed
  cell.addEventListener('animationend', () => cell.classList.remove('pop'), { once: true });

  // --- Check results ---
  const winningCombo = getWinningCombo();

  if (winningCombo) {
    handleWin(winningCombo);
  } else if (isDraw()) {
    handleDraw();
  } else {
    switchPlayer();
  }
}

/* ================================================================
   E.  WIN / DRAW DETECTION
   ================================================================ */

/**
 * getWinningCombo — Loops through all 8 combos.
 * Returns the matching index-triple if found, otherwise null.
 */
function getWinningCombo() {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return combo; // winning trio found
    }
  }
  return null; // no winner yet
}

/**
 * isDraw — Returns true when all 9 cells are filled (no winner).
 */
function isDraw() {
  return board.every(cell => cell !== '');
}

/* ================================================================
   F.  GAME-OVER HANDLING
   ================================================================ */

/**
 * handleWin — Stops the game, highlights winning cells,
 * updates score, and shows winner banner.
 */
function handleWin(combo) {
  gameActive = false;
  boardEl.classList.add('locked');

  // Highlight the three winning cells
  const winClass = currentPlayer === 'X' ? 'win-x' : 'win-o';
  combo.forEach(index => cells[index].classList.add(winClass));

  // Update score
  scores[currentPlayer]++;
  updateScoreDisplay();

  // Turn off active player highlight
  clearActiveScoreCard();

  // Show result banner
  const bannerClass = currentPlayer === 'X' ? 'win-x-banner' : 'win-o-banner';
  showResultBanner(`🏆 Player ${currentPlayer} Wins!`, bannerClass);

  // Turn strip message
  setTurnText(`Player ${currentPlayer} Wins! 🎉`);
}

/**
 * handleDraw — Stops the game, updates draw count,
 * shows draw banner and a subtle shake animation.
 */
function handleDraw() {
  gameActive = false;
  boardEl.classList.add('locked');

  scores.Draw++;
  updateScoreDisplay();
  clearActiveScoreCard();

  showResultBanner("🤝 It's a Draw!", 'draw-banner');
  setTurnText("It's a Draw!");
}

/* ================================================================
   G.  UI UPDATE HELPERS
   ================================================================ */

/** switchPlayer — Flips between X and O and updates the turn UI. */
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setTurnIndicator(currentPlayer);
  highlightActiveScoreCard();
}

/** setTurnIndicator — Updates the dot colour and text for the current player. */
function setTurnIndicator(player) {
  // Dot colour
  if (player === 'O') {
    turnDot.classList.add('o-turn');
  } else {
    turnDot.classList.remove('o-turn');
  }
  setTurnText(`${player}'s Turn`);
}

/** setTurnText — Just updates the text inside the turn strip. */
function setTurnText(message) {
  turnText.textContent = message;
}

/** showResultBanner — Reveals the banner with the given CSS class. */
function showResultBanner(message, cssClass) {
  resultText.textContent = message;
  resultBanner.className = `result-banner ${cssClass}`; // removes 'hidden'
}

/** hideResultBanner — Hides the result banner. */
function hideResultBanner() {
  resultBanner.className = 'result-banner hidden';
  resultText.textContent = '';
}

/** updateScoreDisplay — Syncs the score DOM elements with the scores object. */
function updateScoreDisplay() {
  xScoreEl.textContent    = scores.X;
  oScoreEl.textContent    = scores.O;
  drawScoreEl.textContent = scores.Draw;
}

/** highlightActiveScoreCard — Adds 'active' class to current player's card. */
function highlightActiveScoreCard() {
  scoreXBlock.classList.toggle('active', currentPlayer === 'X');
  scoreOBlock.classList.toggle('active', currentPlayer === 'O');
}

/** clearActiveScoreCard — Removes 'active' from both cards (game over). */
function clearActiveScoreCard() {
  scoreXBlock.classList.remove('active');
  scoreOBlock.classList.remove('active');
}

/* ================================================================
   H.  BUTTON HANDLERS
   ================================================================ */

/** New Round — clears the board, starts fresh. Scores are kept. */
newRoundBtn.addEventListener('click', () => {
  initRound();
});

/** Reset Score — zeroes all counters, then starts a new round. */
resetScoreBtn.addEventListener('click', () => {
  scores.X    = 0;
  scores.O    = 0;
  scores.Draw = 0;
  updateScoreDisplay();
  initRound();
});

/* ================================================================
   I.  KEYBOARD ACCESSIBILITY
   ================================================================ */

/**
 * Allow keyboard users (Tab to focus, Enter/Space to click)
 * to interact with board cells.
 */
cells.forEach(cell => {
  cell.addEventListener('click',   handleCellClick);
  cell.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();       // prevent page scroll on Space
      handleCellClick(event);
    }
  });
});

/* ================================================================
   J.  BOOTSTRAP — Start the game on page load
   ================================================================ */
initRound();
