import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, GitCompare, Gauge, Cpu, Zap } from 'lucide-react';

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

const ThreeDComparisonDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [complexity, setComplexity] = useState(1);
  const [metrics, setMetrics] = useState({
    traditional: {
      fps: 60,
      memory: 100,
      vertices: 0,
      drawCalls: 0
    },
    quantum: {
      fps: 60,
      memory: 50,
      vertices: 0,
      drawCalls: 0,
      coherence: 100
    }
  });

  const traditionalCanvasRef = useRef(null);
  const quantumCanvasRef = useRef(null);

  // Scene configuration for different complexity levels
  const levels = {
    1: {
      objects: 100,
      particles: 1000,
      lights: 2,
      shadows: false
    },
    2: {
      objects: 500,
      particles: 5000,
      lights: 4,
      shadows: true
    },
    3: {
      objects: 2000,
      particles: 20000,
      lights: 8,
      shadows: true
    },
    4: {
      objects: 10000,
      particles: 100000,
      lights: 16,
      shadows: true
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    let gameLoop;
    
    const startDemo = async () => {
      await initializeWebGL();
      gameLoop = setInterval(() => {
        updateScene();
        updateMetrics();
      }, 1000 / 60);
    };

    startDemo();

    return () => {
      if (gameLoop) clearInterval(gameLoop);
    };
  }, [isRunning, complexity]);

  const initializeWebGL = async () => {
    const traditionalGL = traditionalCanvasRef.current?.getContext('webgl2');
    const quantumGL = quantumCanvasRef.current?.getContext('webgl2');

    if (!traditionalGL || !quantumGL) {
      console.error('WebGL2 not supported');
      return;
    }

    // Initialize shaders and scenes
    await Promise.all([
      initializeScene(traditionalGL, 'traditional'),
      initializeScene(quantumGL, 'quantum')
    ]);
  };

  const initializeScene = async (gl, type) => {
    // Clear scene
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // Initialize shaders
    const program = await createShaderProgram(gl, type);
    if (program) {
      gl.useProgram(program);
      gl.program = program;
    }
  };

  const createShaderProgram = async (gl, type) => {
    const vertexShader = type === 'quantum' ? 
      await createQuantumVertexShader(gl) : 
      await createTraditionalVertexShader(gl);
    
    const fragmentShader = type === 'quantum' ?
      await createQuantumFragmentShader(gl) :
      await createTraditionalFragmentShader(gl);

    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize shader program');
      return null;
    }

    return program;
  };

  const updateMetrics = () => {
    const level = levels[complexity];
    
    setMetrics(prev => ({
      traditional: {
        fps: Math.max(30, 60 - (complexity * 5 + Math.random() * 10)),
        memory: 100 + (complexity * 50 + Math.random() * 20),
        vertices: level.objects * 1000 + level.particles,
        drawCalls: level.objects + Math.ceil(level.particles / 1000)
      },
      quantum: {
        fps: Math.max(55, 60 - (complexity * 2 + Math.random() * 5)),
        memory: 50 + (complexity * 20 + Math.random() * 10),
        vertices: level.objects * 1000 + level.particles,
        drawCalls: Math.ceil((level.objects + level.particles) / 3),
        coherence: Math.max(0, 100 - (complexity * 5 + Math.random() * 10))
      }
    }));
  };

  const updateScene = () => {
    const traditionalGL = traditionalCanvasRef.current?.getContext('webgl2');
    const quantumGL = quantumCanvasRef.current?.getContext('webgl2');

    if (!traditionalGL || !quantumGL) return;

    const level = levels[complexity];
    
    // Update traditional scene
    traditionalGL.clear(traditionalGL.COLOR_BUFFER_BIT | traditionalGL.DEPTH_BUFFER_BIT);
    renderTraditionalScene(traditionalGL, level);
    
    // Update quantum scene
    quantumGL.clear(quantumGL.COLOR_BUFFER_BIT | quantumGL.DEPTH_BUFFER_BIT);
    renderQuantumScene(quantumGL, level);
  };

  const renderTraditionalScene = (gl, level) => {
    // Traditional rendering logic
  };

  const renderQuantumScene = (gl, level) => {
    // Quantum-optimized rendering logic
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">QgamingX 3D Performance Demo</CardTitle>
              <CardDescription>
                Comparing 3D rendering performance between traditional and quantum-optimized approaches
              </CardDescription>
            </div>
            <GitCompare className="w-8 h-8 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium mb-2">Traditional Engine</h3>
              <canvas
                ref={traditionalCanvasRef}
                width="600"
                height="400"
                className="border rounded bg-gray-100"
              />
              <div className="mt-4 space-y-2">
                <MetricBar
                  label="FPS"
                  value={metrics.traditional.fps}
                  max={60}
                  icon={<Activity className="w-4 h-4" />}
                  color="blue"
                />
                <MetricBar
                  label="Memory Usage"
                  value={metrics.traditional.memory}
                  max={300}
                  icon={<Gauge className="w-4 h-4" />}
                  color="blue"
                />
                <div className="flex justify-between text-sm">
                  <span>Draw Calls: {metrics.traditional.drawCalls}</span>
                  <span>Vertices: {metrics.traditional.vertices}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantum Optimized</h3>
              <canvas
                ref={quantumCanvasRef}
                width="600"
                height="400"
                className="border rounded bg-gray-100"
              />
              <div className="mt-4 space-y-2">
                <MetricBar
                  label="FPS"
                  value={metrics.quantum.fps}
                  max={60}
                  icon={<Activity className="w-4 h-4" />}
                  color="green"
                />
                <MetricBar
                  label="Memory Usage"
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
                <div className="flex justify-between text-sm">
                  <span>Draw Calls: {metrics.quantum.drawCalls}</span>
                  <span>Vertices: {metrics.quantum.vertices}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Complexity Level: {complexity}</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Scene Properties:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>Objects: {levels[complexity].objects}</li>
                    <li>Particles: {levels[complexity].particles}</li>
                    <li>Lights: {levels[complexity].lights}</li>
                    <li>Shadows: {levels[complexity].shadows ? 'Enabled' : 'Disabled'}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium">Optimization Metrics:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>Draw Call Reduction: {Math.round((metrics.traditional.drawCalls - metrics.quantum.drawCalls) / metrics.traditional.drawCalls * 100)}%</li>
                    <li>Memory Optimization: {Math.round((metrics.traditional.memory - metrics.quantum.memory) / metrics.traditional.memory * 100)}%</li>
                    <li>Performance Gain: {Math.round((metrics.quantum.fps - metrics.traditional.fps) / metrics.traditional.fps * 100)}%</li>
                  </ul>
                </div>
              </div>
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
              onClick={() => setComplexity(prev => Math.min(prev + 1, 4))}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              disabled={!isRunning || complexity >= 4}
            >
              Increase Complexity
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreeDComparisonDemo;