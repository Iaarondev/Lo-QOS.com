import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, Atom, Cpu, GitBranch } from 'lucide-react';
import _ from 'lodash';

class QuantumParticle {
  constructor(x, y, state = 0.5) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.size = Math.random() * 3 + 2;
    this.state = state;
    this.phase = Math.random() * Math.PI * 2;
    this.coherence = 1;
    this.entanglement = null;
    this.life = 1;
  }

  update(deltaTime, quantumField) {
    // Update quantum properties
    this.phase = (this.phase + deltaTime) % (Math.PI * 2);
    this.coherence = Math.max(0, this.coherence - 0.01 * deltaTime);
    
    // Apply quantum field influence
    const fieldEffect = quantumField.getFieldStrength(this.x, this.y);
    this.x += (this.vx + fieldEffect.x) * deltaTime;
    this.y += (this.vy + fieldEffect.y) * deltaTime;
    
    // Handle entanglement
    if (this.entanglement) {
      const partner = this.entanglement;
      this.state = (this.state + partner.state) / 2;
    }
    
    this.life -= 0.1 * deltaTime;
    return this.life > 0;
  }

  draw(ctx) {
    const alpha = this.life * this.coherence;
    const stateColor = this.getStateColor();
    ctx.fillStyle = `rgba(${stateColor.r}, ${stateColor.g}, ${stateColor.b}, ${alpha})`;
    
    // Draw quantum interference pattern
    const waveEffect = Math.sin(this.phase) * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size + waveEffect, 0, Math.PI * 2);
    ctx.fill();
  }

  getStateColor() {
    // QRGB color calculation based on quantum state
    const r = Math.sin(this.phase) * 128 + 127;
    const g = Math.cos(this.phase) * 128 + 127;
    const b = (this.state * 255);
    return { r, g, b };
  }
}

class QuantumField {
  constructor() {
    this.time = 0;
    this.noiseScale = 0.01;
  }

  update(deltaTime) {
    this.time += deltaTime;
  }

  getFieldStrength(x, y) {
    // Simplex noise-based quantum field
    const nx = x * this.noiseScale;
    const ny = y * this.noiseScale;
    const t = this.time * 0.5;
    
    return {
      x: Math.sin(nx + t) * 0.5,
      y: Math.cos(ny + t) * 0.5
    };
  }
}

const QuantumVisualizer = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [quantumField] = useState(new QuantumField());
  const [metrics, setMetrics] = useState({
    coherence: 1,
    entanglement: 0,
    complexity: 0
  });

  const updateParticles = useCallback((deltaTime) => {
    setParticles(prev => {
      // Update existing particles
      const updated = prev.filter(p => p.update(deltaTime, quantumField));
      
      // Generate new particles
      while (updated.length < 50) {
        updated.push(new QuantumParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        ));
      }
      
      // Create entanglements
      if (Math.random() < 0.01) {
        const p1 = _.sample(updated);
        const p2 = _.sample(updated);
        if (p1 && p2 && !p1.entanglement && !p2.entanglement) {
          p1.entanglement = p2;
          p2.entanglement = p1;
        }
      }
      
      return updated;
    });
  }, [quantumField]);

  useEffect(() => {
    let animationFrame;
    let lastTime = performance.now();
    
    const loop = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      // Update quantum system
      quantumField.update(deltaTime);
      updateParticles(deltaTime);
      
      // Update metrics
      const avgCoherence = _.meanBy(particles, 'coherence');
      const entangledCount = particles.filter(p => p.entanglement).length;
      setMetrics({
        coherence: avgCoherence,
        entanglement: entangledCount / particles.length,
        complexity: particles.length * avgCoherence
      });
      
      animationFrame = requestAnimationFrame(loop);
    };
    
    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [particles, quantumField, updateParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => particle.draw(ctx));
      
      // Draw entanglement lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      particles.forEach(p1 => {
        if (p1.entanglement) {
          const p2 = p1.entanglement;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
      
      requestAnimationFrame(render);
    };
    
    render();
  }, [particles]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quantum State Visualizer</CardTitle>
            <CardDescription>
              Particle-based quantum system simulation
            </CardDescription>
          </div>
          <Atom className="w-6 h-6 text-indigo-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
              width={800}
              height={400}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span>Coherence</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-blue-500 transition-all"
                  style={{ width: `${metrics.coherence * 100}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-500" />
                <span>Entanglement</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-purple-500 transition-all"
                  style={{ width: `${metrics.entanglement * 100}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-green-500" />
                <span>Complexity</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-green-500 transition-all"
                  style={{ width: `${Math.min(metrics.complexity / 100, 1) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumVisualizer;