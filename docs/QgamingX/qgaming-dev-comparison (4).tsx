import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, GitCompare, Gauge, Cpu, Zap } from 'lucide-react';

const QuantumComparisonDemo = () => {
  const [gameState, setGameState] = useState({
    traditional: {
      playerPos: { x: 50, y: 200 },
      enemies: [],
      particles: [],
      score: 0
    },
    quantum: {
      playerPos: { x: 50, y: 200 },
      enemies: [],
      particles: [],
      score: 0,
      quantumState: 0.5
    }
  });

  const [metrics, setMetrics] = useState({
    traditional: {
      fps: 60,
      memory: 100,
      cpu: 50,
      objectCount: 0
    },
    quantum: {
      fps: 60,
      memory: 50,
      cpu: 25,
      coherence: 100,
      objectCount: 0
    }
  });

  const [complexity, setComplexity] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  // Game levels configuration
  const levels = {
    1: {
      name: "Basic Movement",
      enemyCount: 10,
      particleCount: 100,
      aiComplexity: "simple"
    },
    2: {
      name: "Advanced Physics",
      enemyCount: 25,
      particleCount: 250,
      aiComplexity: "medium"
    },
    3: {
      name: "Complex AI",
      enemyCount: 50,
      particleCount: 500,
      aiComplexity: "advanced"
    },
    4: {
      name: "Full Integration",
      enemyCount: 100,
      particleCount: 1000,
      aiComplexity: "quantum"
    }
  };

  useEffect(() => {
    let gameLoop;
    
    if (isRunning) {
      gameLoop = setInterval(() => {
        updateGameState();
        updateMetrics();
      }, 1000 / 60);
    }

    return () => {
      if (gameLoop) clearInterval(gameLoop);
    };
  }, [isRunning, complexity]);

  const updateGameState = () => {
    const level = levels[complexity];

    setGameState(prev => ({
      traditional: updateTraditional(prev.traditional, level),
      quantum: updateQuantum(prev.quantum, level)
    }));
  };

  const updateTraditionalEnemies = (enemies, level) => {
    let newEnemies = [...enemies];
    
    // Add new enemies if needed
    while (newEnemies.length < level.enemyCount) {
      newEnemies.push({
        x: Math.random() * 600,
        y: Math.random() * 400,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: 10
      });
    }

    // Update existing enemies
    newEnemies = newEnemies.map(enemy => ({
      ...enemy,
      x: enemy.x + enemy.vx,
      y: enemy.y + enemy.vy,
      vx: enemy.x <= 0 || enemy.x >= 600 ? -enemy.vx : enemy.vx,
      vy: enemy.y <= 0 || enemy.y >= 400 ? -enemy.vy : enemy.vy
    }));

    return newEnemies;
  };

  const updateTraditionalParticles = (particles, level) => {
    let newParticles = [...particles];
    
    // Add new particles if needed
    while (newParticles.length < level.particleCount) {
      newParticles.push({
        x: Math.random() * 600,
        y: Math.random() * 400,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    // Update existing particles
    newParticles = newParticles.map(particle => ({
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
      vx: particle.x <= 0 || particle.x >= 600 ? -particle.vx : particle.vx,
      vy: particle.y <= 0 || particle.y >= 400 ? -particle.vy : particle.vy,
      alpha: Math.max(0, particle.alpha - 0.01)
    }));

    // Remove faded particles
    newParticles = newParticles.filter(particle => particle.alpha > 0);

    return newParticles;
  };

  const updateTraditional = (state, level) => {
    // Traditional game logic with individual object processing
    return {
      ...state,
      enemies: updateTraditionalEnemies(state.enemies, level),
      particles: updateTraditionalParticles(state.particles, level)
    };
  };

  const updateQuantumParticles = (particles, level, quantumState) => {
    let newParticles = [...particles];
    const quantumPhase = quantumState * Math.PI * 2;
    
    // Batch process particles in quantum states
    const particleBatchSize = Math.ceil(level.particleCount / 3);
    const quantumStates = [0, 0.5, 1];
    
    quantumStates.forEach((qState, index) => {
      const start = index * particleBatchSize;
      const end = start + particleBatchSize;
      const batchPhase = (quantumPhase + index * Math.PI / 1.5) % (Math.PI * 2);
      
      // Add new particles if needed
      while (newParticles.length < end) {
        newParticles.push({
          x: Math.random() * 600,
          y: Math.random() * 400,
          vx: Math.cos(batchPhase) * 2,
          vy: Math.sin(batchPhase) * 2,
          size: Math.random() * 3 + 1,
          alpha: Math.random() * 0.5 + 0.5,
          quantumState: qState
        });
      }

      // Update particles in this quantum state batch
      newParticles.slice(start, end).forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx = particle.x <= 0 || particle.x >= 600 ? -particle.vx : particle.vx;
        particle.vy = particle.y <= 0 || particle.y >= 400 ? -particle.vy : particle.vy;
        particle.alpha = Math.max(0, particle.alpha - 0.01);
      });
    });

    // Remove faded particles
    newParticles = newParticles.filter(particle => particle.alpha > 0);

    return newParticles;
  };

  const updateQuantumEnemies = (enemies, level, quantumState) => {
    let newEnemies = [...enemies];
    const quantumPhase = quantumState * Math.PI * 2;
    
    // Batch process enemies in quantum states
    const enemyBatchSize = Math.ceil(level.enemyCount / 3);
    const quantumStates = [0, 0.5, 1];
    
    quantumStates.forEach((qState, index) => {
      const start = index * enemyBatchSize;
      const end = start + enemyBatchSize;
      const batchPhase = (quantumPhase + index * Math.PI / 1.5) % (Math.PI * 2);
      
      // Add new enemies if needed
      while (newEnemies.length < end) {
        newEnemies.push({
          x: Math.random() * 600,
          y: Math.random() * 400,
          vx: Math.cos(batchPhase) * 3,
          vy: Math.sin(batchPhase) * 3,
          size: 10,
          quantumState: qState
        });
      }

      // Update enemies in this quantum state batch
      newEnemies.slice(start, end).forEach(enemy => {
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;
        enemy.vx = enemy.x <= 0 || enemy.x >= 600 ? -enemy.vx : enemy.vx;
        enemy.vy = enemy.y <= 0 || enemy.y >= 400 ? -enemy.vy : enemy.vy;
      });
    });

    return newEnemies;
  };

  const updateQuantum = (state, level) => {
    // Quantum-optimized logic using state vectors and batch processing
    const newQuantumState = (state.quantumState + 0.01) % 1;
    
    return {
      ...state,
      enemies: updateQuantumEnemies(state.enemies, level, newQuantumState),
      particles: updateQuantumParticles(state.particles, level, newQuantumState),
      quantumState: newQuantumState
    };
  };

  const updateMetrics = () => {
    // Simulate performance metrics based on complexity
    setMetrics(prev => ({
      traditional: {
        fps: Math.max(30, 60 - (complexity * 5 + Math.random() * 10)),
        memory: 100 + (complexity * 50 + Math.random() * 20),
        cpu: Math.min(100, 50 + (complexity * 10 + Math.random() * 5)),
        objectCount: gameState.traditional.enemies.length + 
                    gameState.traditional.particles.length
      },
      quantum: {
        fps: Math.max(55, 60 - (complexity * 2 + Math.random() * 5)),
        memory: 50 + (complexity * 20 + Math.random() * 10),
        cpu: Math.min(100, 25 + (complexity * 5 + Math.random() * 5)),
        coherence: Math.max(0, 100 - (complexity * 5 + Math.random() * 10)),
        objectCount: gameState.quantum.enemies.length + 
                    gameState.quantum.particles.length
      }
    }));
  };

  const renderGame = (type, state) => {
    return (
      <div className="relative">
        <canvas
          id={`${type}-canvas`}
          width="600"
          height="400"
          className="border rounded bg-gray-100"
          ref={canvas => {
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, 600, 400);

            // Draw game state
            drawGameState(ctx, state, type);

            // Draw quantum effects for quantum version
            if (type === 'quantum') {
              drawQuantumEffects(ctx, state);
            }
          }}
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
          {type === 'quantum' ? 'Quantum Optimized' : 'Traditional'}
          <div className="text-xs">Level {complexity}</div>
        </div>
      </div>
    );
  };

  const drawGameState = (ctx, state, type) => {
    // Draw player
    ctx.fillStyle = type === 'quantum' ? '#4CAF50' : '#2196F3';
    ctx.beginPath();
    ctx.arc(state.playerPos.x, state.playerPos.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw enemies
    state.enemies.forEach(enemy => {
      ctx.fillStyle = type === 'quantum' ? '#81C784' : '#64B5F6';
      ctx.fillRect(enemy.x - 10, enemy.y - 10, 20, 20);
    });

    // Draw particles
    state.particles.forEach(particle => {
      ctx.fillStyle = type === 'quantum' ? 
        `rgba(76, 175, 80, ${particle.alpha})` : 
        `rgba(33, 150, 243, ${particle.alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawQuantumEffects = (ctx, state) => {
    ctx.strokeStyle = `rgba(76, 175, 80, ${state.quantumState})`;
    ctx.lineWidth = 2;
    
    // Draw quantum field effect
    ctx.beginPath();
    ctx.arc(300, 200, 150 * state.quantumState, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw quantum connections
    state.enemies.forEach((enemy, index) => {
      if (index % 2 === 0) {
        ctx.beginPath();
        ctx.moveTo(enemy.x, enemy.y);
        ctx.lineTo(state.playerPos.x, state.playerPos.y);
        ctx.stroke();
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">QgamingX Comparison Demo</CardTitle>
              <CardDescription>
                Real-time performance comparison between traditional and quantum-optimized gaming
              </CardDescription>
            </div>
            <GitCompare className="w-8 h-8 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Traditional View */}
            <div>
              <h3 className="font-medium mb-2">Traditional Engine</h3>
              {renderGame('traditional', gameState.traditional)}
              <div className="mt-4 space-y-2">
                <MetricBar
                  label="FPS"
                  value={metrics.traditional.fps}
                  max={60}
                  icon={<Activity className="w-4 h-4" />}
                  color="blue"
                />
                <MetricBar
                  label="Memory"
                  value={metrics.traditional.memory}
                  max={300}
                  icon={<Gauge className="w-4 h-4" />}
                  color="blue"
                />
                <MetricBar
                  label="CPU Load"
                  value={metrics.traditional.cpu}
                  max={100}
                  icon={<Cpu className="w-4 h-4" />}
                  color="blue"
                />
              </div>
            </div>

            {/* Quantum View */}
            <div>
              <h3 className="font-medium mb-2">Quantum Optimized</h3>
              {renderGame('quantum', gameState.quantum)}
              <div className="mt-4 space-y-2">
                <MetricBar
                  label="FPS"
                  value={metrics.quantum.fps}
                  max={60}
                  icon={<Activity className="w-4 h-4" />}
                  color="green"
                />
                <MetricBar
                  label="Memory"
                  value={metrics.quantum.memory}
                  max={300}
                  icon={<Gauge className="w-4 h-4" />}
                  color="green"
                />
                <MetricBar
                  label="Quantum Coherence"
                  value={metrics.quantum.coherence}
                  max={100}
                  icon={<Zap className="w-4 h-4" />}
                  color="green"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {isRunning ? 'Pause' : 'Start'} Demo
            </button>
            <button
              onClick={() => setComplexity(prev => Math.min(prev + 1, 4))}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              disabled={complexity >= 4}
            >
              Increase Complexity
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Current Level: {levels[complexity].name}</h4>
            <ul className="space-y-2 text-sm">
              <li>• Enemy Count: {levels[complexity].enemyCount}</li>
              <li>• Particle Count: {levels[complexity].particleCount}</li>
              <li>• AI Complexity: {levels[complexity].aiComplexity}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MetricBar = ({ label, value, max, icon, color }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium">
        {Math.round(value)}{label === 'FPS' ? ' FPS' : '%'}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 bg-${color}-500`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

export default QuantumComparisonDemo;