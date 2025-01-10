let canvas, ctx;
let playerState = 0.5; // Player starts at 0.5
let obstacles = [];
let gameInterval;
let isRunning = false;

function startGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Reset game
  playerState = 0.5;
  obstacles = [];
  isRunning = true;
  document.getElementById("game-status").textContent =
    "Game On! Avoid the obstacles!";

  // Start game loop
  gameInterval = setInterval(updateGame, 50);
}

function endGame() {
  isRunning = false;
  clearInterval(gameInterval);
  document.getElementById("game-status").textContent =
    "Game Over! Press 'Start' to play again.";
}

function updateGame() {
  if (!isRunning) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  drawPlayer();

  // Generate obstacles
  if (Math.random() < 0.02) {
    generateObstacle();
  }

  // Move and draw obstacles
  moveObstacles();

  // Check for collisions
  if (checkCollision()) {
    endGame();
  }
}

function drawPlayer() {
  const x = 50; // Fixed X position
  const y = canvas.height - playerState * canvas.height; // Quantum state on Y-axis

  ctx.fillStyle = "#4CAF50";
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();

  // Draw quantum state label
  ctx.fillStyle = "#000";
  ctx.font = "12px Arial";
  ctx.fillText(`|ψ⟩: ${playerState}`, x - 15, y - 15);
}

function generateObstacle() {
  const entangledState = Math.random() < 0.5 ? 0 : 1; // Entangled quantum state (0 or 1)
  obstacles.push({
    x: canvas.width,
    y: canvas.height - entangledState * canvas.height,
    state: entangledState,
  });
}

function moveObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 5; // Move left

    // Draw obstacle
    ctx.fillStyle = "#FF5722";
    ctx.beginPath();
    ctx.arc(obstacles[i].x, obstacles[i].y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw state label
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.fillText(
      `|ψ⟩: ${obstacles[i].state}`,
      obstacles[i].x - 15,
      obstacles[i].y - 15
    );
  }

  // Remove obstacles that go off screen
  obstacles = obstacles.filter((obs) => obs.x > 0);
}

function checkCollision() {
  for (let obs of obstacles) {
    const playerY = canvas.height - playerState * canvas.height;
    if (Math.abs(obs.x - 50) < 15 && Math.abs(obs.y - playerY) < 15) {
      return true; // Collision detected
    }
  }
  return false;
}

// Handle player movement
document.addEventListener("keydown", (e) => {
  if (!isRunning) return;

  if (e.key === "ArrowUp" && playerState < 1) {
    playerState += 0.5;
  } else if (e.key === "ArrowDown" && playerState > 0) {
    playerState -= 0.5;
  }
});
