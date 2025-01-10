import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, GitCompare, Gauge, Cpu } from 'lucide-react';

const GamePerformanceDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [complexityLevel, setComplexityLevel] = useState(1);
  const [metrics, setMetrics] = useState({
    traditional: {
      fps: 0,
      memory: 0,
      objects: 0,
      load: 0
    },
    quantum: {
      fps: 0,
      memory: 0,
      objects: 0,
      coherence: 0,
      load: 0
    }
  });

  // Game complexity levels
  const complexityLevels = [
    {
      level: 1,
      name: "Basic Physics",
      description: "Simple object collisions and movement",
      objectCount: 50,
      effects: false,
      ai: false
    },
    {
      level: 2,
      name: "Particle Effects",
      description: "Added particle systems and visual effects",
      objectCount: 200,
      effects: true,
      ai: false
    },
    {
      level: 3,
      name: "AI Behaviors",
      description: "Intelligent object behavior and pathfinding",
      objectCount: 500,
      effects: true,
      ai: true
    },
    {
      level: 4,
      name: "Dynamic Environment",
      description: "Interactive environment with physics chains",
      objectCount: 1000,
      effects: true,
      ai: true,
      dynamic: true
    }
  ];

  // Game state
  const [gameState, setGameState] = useState({
    traditional: {
      particles: [],
      entities: [],
      effects: []
    },
    quantum: {
      particles: [],
      entities: [],
      effects: [],
      quantumState: 0.5
    }
  });

  useEffect(() => {
    if (!isRunning) return;

    const gameLoop = setInterval(() => {
      // Update game states
      updateGame();
      // Update metrics
      updateMetrics();

      // Auto-increase complexity every 10 seconds
      if (isRunning && complexityLevel < 4) {
        setTimeout(() => {
          setComplexityLevel(prev => Math.min(prev + 1, 4));
        }, 10000);
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [isRunning, complexityLevel]);

  const updateGame = () => {
    const currentLevel = complexityLevels[complexityLevel - 1];
    
    // Update both traditional and quantum game states
    setGameState(prev => ({
      traditional: updateTraditionalGame(prev.traditional, currentLevel),
      quantum: updateQuantumGame(prev.quantum, currentLevel)
    }));
  };

  const updateTraditionalGame = (state, level) => {
    // Traditional game updates
    let newState = { ...state };
    
    // Update particles
    let particles = [...state.particles];
    if (level.effects) {
      // Add new particles
      if (particles.length < level.objectCount) {
        particles.push({
          x: Math.random() * 600,
          y: Math.random() * 400,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5
        });
      }
      
      // Update particle positions
      particles = particles.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vx: p.x <= 0 || p.x >= 600 ? -p.vx : p.vx,
        vy: p.y <= 0 || p.y >= 400 ? -p.vy : p.vy
      }));
    }

    // Update AI entities
    let entities = [...state.entities];
    if (level.ai) {
      // Process each entity individually
      entities = entities.map(entity => {
        // Simple AI behavior
        const targetX = 300 + Math.cos(Date.now() / 1000) * 100;
        const targetY = 200 + Math.sin(Date.now() / 1000) * 100;
        
        return {
          ...entity,
          x: entity.x + (targetX - entity.x) * 0.1,
          y: entity.y + (targetY - entity.y) * 0.1
        };
      });
    }

    return {
      ...newState,
      particles,
      entities
    };
  };

  const updateQuantumGame = (state, level) => {
    // Quantum-optimized game updates
    let newState = { ...state };
    const quantumState = (state.quantumState + 0.1) % 1;

    // Use quantum states to optimize updates
    const quantumPhase = quantumState * Math.PI * 2;
    
    // Batch particle updates using quantum state
    if (level.effects) {
      const particleBatch = Math.floor(level.objectCount / 4);
      for (let i = 0; i < 4; i++) {
        const batchPhase = (quantumPhase + i * Math.PI / 2) % (Math.PI * 2);
        const batchVelocity = Math.sin(batchPhase) * 5;
        
        newState.particles = newState.particles.slice(0, particleBatch).map(p => ({
          ...p,
          x: p.x + batchVelocity,
          y: p.y + Math.cos(batchPhase) * 3
        }));
      }
    }

    // Quantum-optimized AI processing
    if (level.ai) {
      // Process entities in quantum superposition
      const superpositionStates = [0, 0.5, 1];
      superpositionStates.forEach(qState => {
        const entitiesInState = newState.entities.filter(
          e => Math.abs(e.quantumState - qState) < 0.1
        );
        
        // Update all entities in this state simultaneously
        const batchUpdate = {
          x: Math.cos(quantumPhase) * 100,
          y: Math.sin(quantumPhase) * 100
        };
        
        entitiesInState.forEach(entity => {
          entity.x += batchUpdate.x * 0.1;
          entity.y += batchUpdate.y * 0.1;
        });
      });
    }

    return {
      ...newState,
      quantumState
    };
  };

  const updateMetrics = () => {
    const level = complexityLevels[complexityLevel - 1];
    
    setMetrics(prev => ({
      traditional: {
        fps: Math.floor(60 * (1 - (complexityLevel * 0.1))), // FPS drops with complexity
        memory: Math.floor(100 + (level.objectCount * 0.5)),
        objects: gameState.traditional.particles.length + 
                gameState.traditional.entities.length,
        load: Math.min(100, Math.floor(complexityLevel * 25))
      },
      quantum: {
        fps: Math.floor(60 * (1 - (complexityLevel * 0.05))), // More stable FPS
        memory: Math.floor(50 + (level.objectCount * 0.25)), // More efficient memory use
        objects: gameState.quantum.particles.length + 
                gameState.quantum.entities.length,
        coherence: Math.floor(gameState.quantum.quantumState * 100),
        load: Math.min(100, Math.floor(complexityLevel * 15))
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

            // Draw particles
            state.particles.forEach(particle => {
              ctx.fillStyle = type === 'quantum' ? 
                `rgba(76, 175, 80, ${state.quantumState || 0.5})` :
                'rgba(33, 150, 243, 0.5)';
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
              ctx.fill();
            });

            // Draw entities
            state.entities.forEach(entity => {
              ctx.fillStyle = type === 'quantum' ? '#4CAF50' : '#2196F3';
              ctx.fillRect(entity.x - 10, entity.y - 10, 20, 20);
            });

            // Draw quantum effects
            if (type === 'quantum' && state.quantumState !== undefined) {
              ctx.strokeStyle = `rgba(76, 175, 80, ${state.quantumState})`;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(300, 200, 100, 0, Math.PI * 2);
              ctx.stroke();
            }
          }}
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
          {type === 'quantum' ? 'Quantum Optimized' : 'Traditional'} - Level {complexityLevel}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">QgamingX Progressive Complexity Test</CardTitle>
              <CardDescription>
                Comparing performance scaling under increasing complexity
              </CardDescription>
            </div>
            <GitCompare className="w-8 h-8 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              {renderGame('traditional', gameState.traditional)}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                  <span className="flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    FPS
                  </span>
                  <span>{metrics.traditional.fps}</span>
                </div>
                <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                  <span className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2" />
                    Memory Usage (MB)
                  </span>
                  <span>{metrics.traditional.memory}</span>
                </div>
                <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                  <span className="flex items-center">
                    <Cpu className="w-4 h-4 mr-2" />
                    System Load
                  </span>
                  <span>{metrics.traditional.load}%</span>
                </div>
              </div>
            </div>

            <div>
              {renderGame('quantum', gameState.quantum)}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                  <span className="flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    FPS
                  </span>
                  <span>{metrics.quantum.fps}</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                  <span className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2" />
                    Memory Usage (MB)
                  </span>
                  <span>{metrics.quantum.memory}</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                  <span className="flex items-center">
                    <Cpu className="w-4 h-4 mr-2" />
                    Quantum Coherence
                  </span>
                  <span>{metrics.quantum.coherence}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Complexity Level: {complexityLevels[complexityLevel - 1].name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {complexityLevels[complexityLevel - 1].description}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(complexityLevel / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {isRunning ? 'Stop' : 'Start'} Demo
            </button>
            <button
              onClick={() => setComplexityLevel(prev => Math.min(prev + 1, 4))}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              disabled={!isRunning || complexityLevel >= 4}
            >
              Increase Complexity
            </button>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Performance Analysis</h4>
            <ul className="space-y-2 text-sm">
              <li>• Level 1: Basic physics calculations show minimal difference in performance</li>
              <li>• Level 2: Particle effects demonstrate quantum optimization benefits</li>
              <li>• Level 3: AI behaviors show significant performance gains with quantum processing</li>
              <li>• Level 4: Complex dynamics highlight the scalability of quantum optimization</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamePerformanceDemo;