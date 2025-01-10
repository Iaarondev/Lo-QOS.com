export class Game {
  constructor(type) {
    this.type = type;
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;
  }

  start() {
    console.log(Starting a  game.);
    this.initializeGame();
  }

  initializeGame() {
    switch (this.type) {
      case 'fps':
        this.startFPSGame();
        break;
      case 'rpg':
        this.startRPGGame();
        break;
      case 'puzzle':
        this.startPuzzleGame();
        break;
      case 'simulation':
        this.startSimulationGame();
        break;
      case 'strategy':
        this.startStrategyGame();
        break;
      default:
        console.error('Unknown game type');
    }
  }

  startFPSGame() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('FPS Game Starting...', 10, 50);
  }

  startRPGGame() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('RPG Game Starting...', 10, 50);
  }

  startPuzzleGame() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('Puzzle Game Starting...', 10, 50);
  }

  startSimulationGame() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('Simulation Game Starting...', 10, 50);
  }

  startStrategyGame() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('Strategy Game Starting...', 10, 50);
  }
}
