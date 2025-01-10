import { Game } from './game.js';

const gameTypeSelector = document.getElementById('gameTypeSelector');
const startButton = document.getElementById('startGame');
const gameCanvasWrapper = document.getElementById('gameCanvasWrapper');

startButton.addEventListener('click', () => {
  const selectedType = document.getElementById('gameType').value;
  gameTypeSelector.style.display = 'none';
  gameCanvasWrapper.style.display = 'block';

  const game = new Game(selectedType);
  game.start();
});
