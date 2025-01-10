<# PowerShell Script to Setup Lo-QOS Developer Quantum Demo with Game Type Selector #>

# Set up project folder
$PROJECT_ROOT = Join-Path $PWD "QgamingX"
Write-Host "Creating project in $PROJECT_ROOT"

# Create the project structure
New-Item -ItemType Directory -Path "$PROJECT_ROOT\js" -Force | Out-Null
Write-Host "Directories created."

# Create index.html
@"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lo-QOS Developer Quantum Demo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Lo-QOS Developer Quantum Demo</h1>
  <div id="gameTypeSelector">
    <label for="gameType">Select a Game Type:</label>
    <select id="gameType">
      <option value="fps">First-Person Shooter</option>
      <option value="rpg">Role-Playing Game</option>
      <option value="puzzle">Puzzle</option>
      <option value="simulation">Simulation</option>
      <option value="strategy">Strategy</option>
    </select>
    <button id="startGame">Start Game</button>
  </div>
  <div id="gameCanvasWrapper" style="display:none;">
    <canvas id="gameCanvas"></canvas>
  </div>
  <script type="module" src="js/main.js"></script>
</body>
</html>
"@ | Set-Content -Path "$PROJECT_ROOT\index.html"
Write-Host "index.html created."

# Create styles.css
@"
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #222;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  margin-bottom: 20px;
}

#gameTypeSelector {
  margin-bottom: 20px;
}

#gameCanvas {
  border: 1px solid #fff;
  background: #000;
}
"@ | Set-Content -Path "$PROJECT_ROOT\styles.css"
Write-Host "styles.css created."

# Create JavaScript modules
@"
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
"@ | Set-Content -Path "$PROJECT_ROOT\js\main.js"

@"
export class Game {
  constructor(type) {
    this.type = type;
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;
  }

  start() {
    console.log(`Starting a ${this.type} game.`);
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
"@ | Set-Content -Path "$PROJECT_ROOT\js\game.js"

Write-Host "Lo-QOS Developer Quantum Demo with Game Type Selector setup completed in $PROJECT_ROOT"
