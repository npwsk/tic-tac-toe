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
};

const board = document.querySelector('.board');
const cells = board.querySelectorAll('[data-cell]');
const endMessage = document.querySelector('.end-message');
const endMessageText = endMessage.querySelector('.end-message__text');
const restartBtns = document.querySelectorAll('.restart-btn');

const switchTurns = () => {
  gameState.turn = gameState.turn === X ? CIRCLE : X;

  board.classList.remove(X, CIRCLE);
  board.classList.add(gameState.turn);
};

const checkWin = () =>
  WINNING_COMBS.some((comb) =>
    comb.every((index) => cells[index].classList.contains(gameState.turn))
  );

const checkDraw = () =>
  [...cells].every((cell) => cell.classList.contains(X) || cell.classList.contains(CIRCLE));

const showEndMessage = (isDraw) => {
  endMessage.classList.add('end-message--active');

  if (isDraw) {
    endMessageText.textContent = 'Draw!';
    return;
  }

  endMessageText.textContent = `${gameState.turn} wins!`;
};

const handleCellClick = (e) => {
  const cell = e.target;
  cell.classList.add(gameState.turn);

  if (checkWin()) {
    showEndMessage(false);
    return;
  }
  if (checkDraw()) {
    showEndMessage(true);
    return;
  }
  switchTurns();
};

const startGame = () => {
  gameState.turn = X;

  board.classList.remove(X, CIRCLE);
  board.classList.add(X);

  cells.forEach((cell) => cell.addEventListener('click', handleCellClick, { once: true }));
};

const handleRestart = () => {
  endMessage.classList.remove('end-message--active');
  cells.forEach((cell) => cell.classList.remove(X, CIRCLE));
  startGame();
};

startGame();

restartBtns.forEach((btn) => btn.addEventListener('click', handleRestart));
