let canvas, ctx;
let particles = [];
const QUANTUM_STATES = [0, 0.5, 1];
let playerState = 0.5;
let obstacles = [];
let gameInterval;
let isRunning = false;
let score = 0;
let energy = 100;
let isSuperposed = false;
let activePowerUps = new Set();

function startGame() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    
    // Initialize quantum field
    initializeQuantumField();
    
    // Reset game state
    playerState = 0.5;
    obstacles = [];
    score = 0;
    energy = 100;
    isRunning = true;
    activePowerUps.clear();
    
    document.getElementById("game-status").textContent = "Quantum Entanglement Engaged!";
    gameInterval = setInterval(updateGame, 16);
}

function initializeQuantumField() {
    // Create quantum particle effects
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            alpha: Math.random() * 0.5
        });
    }
}

function updateGame() {
    if (!isRunning) return;

    ctx.fillStyle = 'rgba(11, 13, 25, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawQuantumField();
    drawPlayer();
    handleObstacles();
    handlePowerUps();
    updateQuantumState();
    checkCollisions();
    updateHUD();
    
    score++;
    energy = Math.min(energy + 0.1, 100);
}

function drawQuantumField() {
    // Draw background particles
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76, 175, 80, ${p.alpha})`;
        ctx.fill();
    });
}

function drawPlayer() {
    const x = 50;
    const y = canvas.height - playerState * canvas.height;
    
    // Draw probability cloud
    ctx.save();
    ctx.shadowColor = '#4CAF50';
    ctx.shadowBlur = 20;
    ctx.globalCompositeOperation = 'lighter';
    
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(76, 175, 80, 0.2)';
    ctx.fill();
    
    // Draw player core
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#4CAF50';
    ctx.fill();
    
    ctx.restore();
}

function handleObstacles() {
    // Generate entangled particles
    if (Math.random() < 0.02) {
        generateQuantumObstacle();
    }

    // Update obstacle positions
    obstacles.forEach(obs => {
        obs.x -= 5 + score/100;
        drawObstacle(obs);
    });

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obs => obs.x > -50);
}

function generateQuantumObstacle() {
    const baseState = QUANTUM_STATES[Math.floor(Math.random() * QUANTUM_STATES.length)];
    const obstacle = {
        x: canvas.width,
        y: canvas.height - baseState * canvas.height,
        state: baseState,
        phase: 0,
        amplitude: 1,
        type: Math.random() < 0.1 ? 'powerup' : 'obstacle'
    };
    
    if (obstacle.type === 'powerup') {
        obstacle.powerType = ['superposition', 'tunneling', 'entanglement'][Math.floor(Math.random()*3)];
    }
    
    obstacles.push(obstacle);
}

function drawObstacle(obs) {
    ctx.save();
    ctx.shadowColor = obs.type === 'powerup' ? '#FFC107' : '#FF5722';
    ctx.shadowBlur = 15;
    
    // Draw wave function
    ctx.beginPath();
    ctx.arc(obs.x, obs.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = obs.type === 'powerup' ? 
        `hsla(${obs.powerType === 'superposition' ? 120 : 60}, 70%, 50%, 0.3)` : 
        'rgba(255, 87, 34, 0.3)';
    ctx.fill();
    
    // Draw core particle
    ctx.beginPath();
    ctx.arc(obs.x, obs.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = obs.type === 'powerup' ? '#FFC107' : '#FF5722';
    ctx.fill();
    
    ctx.restore();
}

function handlePowerUps() {
    obstacles.filter(obs => obs.type === 'powerup').forEach(obs => {
        if (distance(obs.x, obs.y, 50, canvas.height - playerState * canvas.height) < 25) {
            activatePowerUp(obs.powerType);
            obstacles.splice(obstacles.indexOf(obs), 1);
        }
    });
}

function activatePowerUp(type) {
    activePowerUps.add(type);
    energy = Math.min(energy + 25, 100);
    
    setTimeout(() => {
        activePowerUps.delete(type);
    }, 5000);
}

function updateQuantumState() {
    if (activePowerUps.has('superposition')) {
        playerState = 0.5 + Math.sin(Date.now()/100) * 0.5;
    }
}

function checkCollisions() {
    for (let obs of obstacles.filter(o => o.type === 'obstacle')) {
        const playerY = canvas.height - playerState * canvas.height;
        const d = distance(obs.x, obs.y, 50, playerY);
        
        if (activePowerUps.has('tunneling')) {
            if (d < 15) energy -= 10;
        } else {
            if (d < 20) endGame();
        }
        
        if (energy <= 0) endGame();
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

function updateHUD() {
    ctx.fillStyle = '#FFF';
    ctx.font = '16px QuantumFont';
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Energy: ${Math.round(energy)}%`, 10, 40);
    
    // Draw active power-ups
    let yPos = 60;
    activePowerUps.forEach(power => {
        ctx.fillStyle = '#FFC107';
        ctx.fillText(power.charAt(0).toUpperCase() + power.slice(1), 10, yPos);
        yPos += 20;
    });
}

function endGame() {
    isRunning = false;
    clearInterval(gameInterval);
    document.getElementById("game-status").textContent = 
        `Quantum Decoherence! Final Score: ${score}`;
}

// Quantum state manipulation
document.addEventListener("keydown", (e) => {
    if (!isRunning) return;

    if (e.key === "ArrowUp" && playerState < 1) {
        playerState = Math.min(1, playerState + 0.5);
    } else if (e.key === "ArrowDown" && playerState > 0) {
        playerState = Math.max(0, playerState - 0.5);
    }
    
    // Quantum tunneling shortcut
    if (e.key === " " && energy > 25 && !activePowerUps.has('tunneling')) {
        activatePowerUp('tunneling');
        energy -= 25;
    }
});
