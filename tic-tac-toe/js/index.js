const X = 'x';
const CIRCLE = 'circle';

const WINNING_COMBS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameState = {
  turn: X,
  movesCount: 0,
  results: [],
};

const board = document.querySelector('.board');
const cells = board.querySelectorAll('[data-cell]');
const endMessage = document.querySelector('.end-message');
const endMessageText = endMessage.querySelector('.end-message__text');
const endMessageMovesTotal = endMessage.querySelector('.end-message__moves-total');
const restartBtns = document.querySelectorAll('.restart-btn');
const scoreboard = document.querySelector('.scoreboard');
const scoreboardXWins = scoreboard.querySelector('.x-wins-count');
const scoreboardOWins = scoreboard.querySelector('.o-wins-count');
const scoreboardDraws = scoreboard.querySelector('.draws-count');
const currentTurn = document.querySelector('.current-turn__turn');

const setLocalStorage = () => {
  const { results } = gameState;
  localStorage.setItem('results', JSON.stringify(results.slice(-10)));
};

const getLocalStorage = () => {
  const results = localStorage.getItem('results');
  gameState.results = results ? JSON.parse(results) : [];
};

const updateScoreboard = () => {
  const { results } = gameState;
  const xWinsCount = results.filter((res) => res === X).length;
  const oWinsCount = results.filter((res) => res === CIRCLE).length;
  const drawsCount = results.filter((res) => res === 'draw').length;
  scoreboardXWins.textContent = xWinsCount;
  scoreboardOWins.textContent = oWinsCount;
  scoreboardDraws.textContent = drawsCount;
};

const updateTurn = () => {
  currentTurn.textContent = gameState.turn;
};

const switchTurns = () => {
  gameState.turn = gameState.turn === X ? CIRCLE : X;

  board.classList.remove(X, CIRCLE);
  board.classList.add(gameState.turn);

  updateTurn();
};

const checkWin = () =>
  WINNING_COMBS.some((comb) =>
    comb.every((index) => cells[index].classList.contains(gameState.turn))
  );

const checkDraw = () =>
  [...cells].every((cell) => cell.classList.contains(X) || cell.classList.contains(CIRCLE));

const countResult = (currentResult) => {
  gameState.results = [...gameState.results, currentResult].slice(-10);
};

const showEndMessage = (isDraw) => {
  endMessage.classList.add('end-message--active');
  const { movesCount } = gameState;

  endMessageMovesTotal.textContent = `Game ended in ${movesCount} step${movesCount < 2 ? '' : 's'}`;

  if (isDraw) {
    endMessageText.textContent = 'Draw!';
    return;
  }

  endMessageText.textContent = `${gameState.turn} wins!`;
};

const handleCellClick = (e) => {
  const cell = e.target;
  cell.classList.add(gameState.turn);

  gameState.movesCount += 1;

  if (checkWin()) {
    countResult(gameState.turn);
    updateScoreboard();
    showEndMessage(false);
    return;
  }
  if (checkDraw()) {
    countResult('draw');
    updateScoreboard();
    showEndMessage(true);
    return;
  }

  switchTurns();
};

const startGame = () => {
  gameState.movesCount = 0;
  gameState.turn = X;

  updateTurn();

  board.classList.remove(X, CIRCLE);
  board.classList.add(X);

  cells.forEach((cell) => cell.addEventListener('click', handleCellClick, { once: true }));
};

const handleRestart = () => {
  endMessage.classList.remove('end-message--active');
  cells.forEach((cell) => cell.classList.remove(X, CIRCLE));
  startGame();
};

window.addEventListener('load', () => {
  getLocalStorage();
  updateScoreboard();
  startGame();
});

window.addEventListener('beforeunload', setLocalStorage);
restartBtns.forEach((btn) => btn.addEventListener('click', handleRestart));
