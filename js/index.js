const X = 'x';
const CIRCLE = 'circle';
const MODE_HUMAN = 'human';
const MODE_COMPUTER = 'computer';

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
  isFinished: false,
  turn: X,
  movesCount: 0,
  results: [],
  board: [...new Array(9)],
  mode: {
    name: MODE_COMPUTER,
    computerMark: CIRCLE,
  },
};

const boardElem = document.querySelector('.board');
const cells = [...boardElem.querySelectorAll('[data-cell]')];
const endMessage = document.querySelector('.end-message');
const endMessageText = endMessage.querySelector('.end-message__text');
const endMessageMovesTotal = endMessage.querySelector('.end-message__moves-total');
const restartBtns = document.querySelectorAll('.restart-btn');
const scoreboard = document.querySelector('.scoreboard');
const scoreboardXWins = scoreboard.querySelector('.x-wins-count');
const scoreboardOWins = scoreboard.querySelector('.o-wins-count');
const scoreboardDraws = scoreboard.querySelector('.draws-count');
const currentTurnIcon = document.querySelector('.current-turn__turn-icon');
const settingsBtn = document.querySelector('.settings-btn');
const settingsModal = document.querySelector('.settings-modal');
const modeCheckbox = settingsModal.querySelector('.mode-switch__checkbox');
const markRadioBtns = [...document.querySelectorAll('.mark-toggle__input')];
const markXRadio = markRadioBtns.find((btn) => btn.dataset.mark === X);
const markORadio = markRadioBtns.find((btn) => btn.dataset.mark === CIRCLE);

const setLocalStorage = () => {
  const { results } = gameState;
  localStorage.setItem('results', JSON.stringify(results.slice(-10)));
};

const getLocalStorage = () => {
  const results = localStorage.getItem('results');
  gameState.results = results ? JSON.parse(results) : [];
};

const setInitSettings = () => {
  const isModeComputer = gameState.mode.name === MODE_COMPUTER;
  const isUserMarkX = gameState.mode.computerMark === CIRCLE;

  modeCheckbox.checked = isModeComputer;
  markXRadio.checked = isUserMarkX;
  markORadio.checked = !isUserMarkX;

  markRadioBtns.forEach((btn) => {
    btn.disabled = gameState.mode.name === MODE_HUMAN;
  });
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

const showEndMessage = (isDraw) => {
  endMessage.classList.add('modal--active');
  const { movesCount } = gameState;

  endMessageText.classList.remove(X, CIRCLE);
  endMessageMovesTotal.textContent = `Game was finished in ${movesCount} step${
    movesCount < 2 ? '' : 's'
  }`;

  if (isDraw) {
    endMessageText.textContent = 'Draw!';
    return;
  }

  endMessageText.classList.add(gameState.turn);
  endMessageText.innerHTML = `wins!`;
};

const closeModal = (e) => {
  const modalElem = e.target.closest('.modal');

  if (e.target.classList.contains('modal__close-btn')) {
    modalElem.classList.remove('modal--active');
    return;
  }

  if (!e.target.closest('.modal__inner')) {
    modalElem.classList.remove('modal--active');
  }
};

const showSettingsModal = () => {
  settingsModal.classList.add('modal--active');
};

const updateTurn = () => {
  currentTurnIcon.classList.remove(X, CIRCLE);
  currentTurnIcon.classList.add(gameState.turn);
};

const switchTurns = () => {
  gameState.turn = gameState.turn === X ? CIRCLE : X;

  boardElem.classList.remove(X, CIRCLE);
  boardElem.classList.add(gameState.turn);

  updateTurn();
};

const checkWin = (board, player) =>
  WINNING_COMBS.some((comb) => comb.every((index) => board[index] === player));

const getEmptyCellsIndexes = (board) =>
  board.map((_el, index) => index).filter((index) => !board[index]);

const checkDraw = (board) => getEmptyCellsIndexes(board).length === 0;

const countResult = (currentResult) => {
  gameState.results = [...gameState.results, currentResult].slice(-10);
};

const minimax = (board, isMaximizer) => {
  const boardCopy = board.slice();
  const player = isMaximizer ? X : CIRCLE;

  if (checkWin(boardCopy, X)) {
    return { score: 10 };
  }
  if (checkWin(boardCopy, CIRCLE)) {
    return { score: -10 };
  }
  if (checkDraw(boardCopy)) {
    return { score: 0 };
  }

  const availableSpots = getEmptyCellsIndexes(boardCopy);
  const moves = [];

  availableSpots.forEach((index) => {
    const move = { index };
    boardCopy[index] = player;
    const { score } = minimax(boardCopy, !isMaximizer);
    move.score = score;
    boardCopy[index] = null;
    moves.push(move);
  });

  let bestMove = { index: -1 };

  if (isMaximizer) {
    let bestScore = -1000;
    moves.forEach((move) => {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    });
  } else {
    let bestScore = 1000;
    moves.forEach((move) => {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    });
  }

  return bestMove;
};

const findBestMove = (board, player) => {
  const bestMove = minimax(board, player === X);
  return bestMove.index;
};

const checkGameOver = () => checkWin(gameState.board, gameState.turn) || checkDraw(gameState.board);

const finishGame = () => {
  gameState.isFinished = true;

  if (checkWin(gameState.board, gameState.turn)) {
    countResult(gameState.turn);
    updateScoreboard();
    showEndMessage(false);
    return;
  }
  if (checkDraw(gameState.board)) {
    countResult('draw');
    updateScoreboard();
    showEndMessage(true);
  }
};

const makeMove = (player, index) => {
  gameState.board[index] = player;
  cells[index].classList.add(gameState.turn);

  gameState.movesCount += 1;

  const isGameOver = checkGameOver();

  return isGameOver;
};

const makeBestMove = () => {
  const bestMoveIndex = findBestMove(gameState.board, gameState.turn);
  const isGameOver = makeMove(gameState.turn, bestMoveIndex);

  return isGameOver;
};

const handleCellClick = (e) => {
  if (gameState.isFinished) return;

  const cell = e.target;
  const cellIndex = cells.indexOf(cell);
  switch (gameState.mode.name) {
    case MODE_HUMAN: {
      const isGameOver = makeMove(gameState.turn, cellIndex);

      if (isGameOver) {
        finishGame();
        return;
      }
      switchTurns();
      return;
    }
    case MODE_COMPUTER: {
      let isGameOver = makeMove(gameState.turn, cellIndex);
      if (isGameOver) {
        finishGame();
        return;
      }
      switchTurns();

      const bestMoveIndex = findBestMove(gameState.board, gameState.turn);
      cells[bestMoveIndex].removeEventListener('click', handleCellClick);

      isGameOver = makeMove(gameState.turn, bestMoveIndex);

      if (isGameOver) {
        finishGame();
        return;
      }
      switchTurns();
      return;
    }
    default:
      throw new Error(`Unknown mode name: ${gameState.mode.name}`);
  }
};

const startGame = () => {
  gameState.isFinished = false;
  gameState.board = [...new Array(9)];
  gameState.movesCount = 0;
  gameState.turn = X;

  updateTurn();

  boardElem.classList.remove(X, CIRCLE);
  boardElem.classList.add(X);

  if (gameState.mode.name === MODE_COMPUTER && gameState.mode.computerMark === X) {
    makeBestMove();
    switchTurns();
  }

  getEmptyCellsIndexes(gameState.board).forEach((index) =>
    cells[index].addEventListener('click', handleCellClick, { once: true })
  );
};

const restartGame = () => {
  cells.forEach((cell) => cell.classList.remove(X, CIRCLE));
  startGame();
};

const handleRestart = () => {
  endMessage.classList.remove('modal--active');
  restartGame();
};

const handleModeChange = (e) => {
  const checkbox = e.target;
  gameState.mode.name = checkbox.checked ? MODE_COMPUTER : MODE_HUMAN;
  markRadioBtns.forEach((btn) => {
    btn.disabled = gameState.mode.name === MODE_HUMAN;
  });
  restartGame();
};

const handleMarkChange = (e) => {
  const markRadioBtn = e.target;
  if (markRadioBtn.checked) {
    const isUserMarkX = markRadioBtn.dataset.xMark;
    gameState.mode.computerMark = isUserMarkX ? CIRCLE : X;
    restartGame();
  }
};

window.addEventListener('load', () => {
  getLocalStorage();
  updateScoreboard();
  setInitSettings();

  window.addEventListener('beforeunload', setLocalStorage);
  restartBtns.forEach((btn) => btn.addEventListener('click', handleRestart));
  settingsBtn.addEventListener('click', showSettingsModal);
  settingsModal.addEventListener('click', closeModal);
  endMessage.addEventListener('click', closeModal);
  modeCheckbox.addEventListener('input', handleModeChange);
  markRadioBtns.forEach((radioBtn) => radioBtn.addEventListener('input', handleMarkChange));

  startGame();
});
