import React, { useCallback } from 'react';

// Base Quantum System
class WormholeQuantumSystem {
  constructor(centerX, centerY) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.phi = (1 + Math.sqrt(5)) / 2;
    this.particles = [];
    this.time = 0;
    this.complexityLevel = 0;
    this.processingLoad = 0;
    this.wormholes = new Map();
    this.activeThreads = 0;
    
    // Initialize quantum field
    this.field = {
      resolution: 32,
      data: new Float32Array(32 * 32)
    };
  }

  createWormhole(type, position) {
    const id = crypto.randomUUID();
    this.wormholes.set(id, {
      type,
      position,
      strength: 0,
      radius: type === 0 ? 50 : 200,
      particles: new Set(),
      entropy: 0,
      phase: Math.random() * Math.PI * 2
    });
    return id;
  }

  createParticle(angle, radius) {
    return {
      x: this.centerX + radius * Math.cos(angle),
      y: this.centerY + radius * Math.sin(angle),
      angle,
      radius,
      phase: Math.random() * Math.PI * 2,
      energy: 1,
      size: 2 + Math.random() * 3,
      coherence: 1
    };
  }

  generateParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      const angle = i * this.phi * 2 * Math.PI;
      const radius = Math.sqrt(i) * 10;
      this.particles.push(this.createParticle(angle, radius));
    }
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.updateWormholes(deltaTime);
    this.updateParticles(deltaTime);
  }

  updateWormholes(deltaTime) {
    this.wormholes.forEach(wormhole => {
      wormhole.strength = Math.min(1, wormhole.strength + deltaTime * 0.1);
      wormhole.phase = (wormhole.phase + deltaTime) % (Math.PI * 2);
    });
  }

  updateParticles(deltaTime) {
    this.particles.forEach(particle => {
      this.updateParticle(particle, deltaTime);
    });
  }

  updateParticle(particle, deltaTime) {
    particle.phase = (particle.phase + deltaTime) % (Math.PI * 2);
    particle.coherence = Math.max(0, particle.coherence - 0.001 * deltaTime);
  }
}

// Enhanced System with Advanced Features
class EnhancedWormholeQuantumSystem extends WormholeQuantumSystem {
  constructor(centerX, centerY) {
    super(centerX, centerY);
    this.dimensionalLayers = new Map();
    this.quantumThresholds = {
      tunneling: 0.2,
      entanglement: 0.3,
      collapse: 0.8
    };
    this.optimizationState = {
      idleThreshold: 0.1,
      maxThreads: navigator.hardwareConcurrency || 4,
      batchSize: 100,
      optimizationLevel: 0
    };
    
    this.initializeDimensionalLayers();
  }

  initializeDimensionalLayers() {
    for (let i = 0; i < 5; i++) {
      this.dimensionalLayers.set(i, {
        particles: new Set(),
        field: new Float32Array(32 * 32),
        active: i === 0,
        complexity: i * 0.2
      });
    }
  }

  optimizeProcessing() {
    const currentLoad = this.processingLoad;
    
    if (currentLoad < this.optimizationState.idleThreshold) {
      this.optimizationState.optimizationLevel = Math.min(
        1,
        this.optimizationState.optimizationLevel + 0.01
      );
      
      let activeLayers = 0;
      this.dimensionalLayers.forEach((layer, index) => {
        if (activeLayers < 3) {
          layer.active = true;
          activeLayers++;
        }
      });
    } else {
      this.optimizationState.optimizationLevel = Math.max(
        0,
        this.optimizationState.optimizationLevel - 0.02
      );
      
      this.dimensionalLayers.forEach((layer, index) => {
        if (index > 1) layer.active = false;
      });
    }
  }

  updateQuantumFields(deltaTime) {
    this.dimensionalLayers.forEach((layer, index) => {
      if (!layer.active) return;

      for (let i = 0; i < layer.field.length; i++) {
        const x = (i % this.field.resolution) / this.field.resolution;
        const y = Math.floor(i / this.field.resolution) / this.field.resolution;
        layer.field[i] = this.calculateDimensionalFieldValue(x, y, index, deltaTime);
      }
    });
  }

  calculateDimensionalFieldValue(x, y, dimension, deltaTime) {
    const baseValue = Math.sin(x * 10 + this.time) * Math.cos(y * 10 - this.time);
    const dimensionalPhase = this.time * (dimension + 1);
    return baseValue * Math.sin(dimensionalPhase + x * 10) * Math.cos(dimensionalPhase + y * 10);
  }

  processQuantumTunneling(particle, wormhole) {
    if (Math.random() < this.quantumThresholds.tunneling * particle.coherence) {
      const currentDimension = this.findParticleDimension(particle);
      const targetDimension = wormhole.type === 0 ? 
        Math.max(0, currentDimension - 1) : 
        Math.min(this.dimensionalLayers.size - 1, currentDimension + 1);
      
      if (currentDimension !== targetDimension) {
        const sourceLayer = this.dimensionalLayers.get(currentDimension);
        const targetLayer = this.dimensionalLayers.get(targetDimension);
        
        if (sourceLayer && targetLayer) {
          sourceLayer.particles.delete(particle);
          targetLayer.particles.add(particle);
          particle.coherence *= 0.8;
          particle.energy = this.calculateParticleEnergy(particle.x, particle.y) * 
            (1 + targetDimension * 0.2);
        }
      }
    }
  }

  findParticleDimension(particle) {
    for (const [dimension, layer] of this.dimensionalLayers) {
      if (layer.particles.has(particle)) return dimension;
    }
    return 0;
  }

  calculateParticleEnergy(x, y) {
    let energy = 0;
    this.wormholes.forEach(wormhole => {
      const dx = x - wormhole.position.x;
      const dy = y - wormhole.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = 1 / (1 + distance * 0.01);
      energy += influence * (wormhole.type === 0 ? -1 : 1);
    });
    return Math.max(0, Math.min(1, energy + 0.5));
  }

  updateParticleBehavior(particle, deltaTime) {
    const dimension = this.findParticleDimension(particle);
    const layer = this.dimensionalLayers.get(dimension);
    
    if (!layer?.active) return;

    particle.phase = (particle.phase + deltaTime * particle.energy * (dimension + 1)) % (Math.PI * 2);
    particle.coherence = Math.max(0, particle.coherence - 0.001 * deltaTime * (dimension + 1));

    this.wormholes.forEach(wormhole => {
      const force = this.calculateWormholeForce(particle, wormhole, dimension);
      particle.x += force.x * deltaTime;
      particle.y += force.y * deltaTime;
    });

    if (particle.coherence < this.quantumThresholds.collapse) {
      this.handleQuantumCollapse(particle);
    }
  }

  calculateWormholeForce(particle, wormhole, dimension) {
    const dx = particle.x - wormhole.position.x;
    const dy = particle.y - wormhole.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const dimensionalFactor = 1 + dimension * 0.5;
    const force = (wormhole.type === 0 ? -1 : 1) * wormhole.strength * dimensionalFactor / (distance + 1);
    
    return {
      x: (dx / distance) * force,
      y: (dy / distance) * force
    };
  }

  handleQuantumCollapse(particle) {
    const currentDimension = this.findParticleDimension(particle);
    const layer = this.dimensionalLayers.get(currentDimension);
    const baseLayer = this.dimensionalLayers.get(0);
    
    if (layer && baseLayer) {
      layer.particles.delete(particle);
      baseLayer.particles.add(particle);
      particle.coherence = 1;
      particle.energy = 0.5;
      particle.phase = Math.random() * Math.PI * 2;
    }
  }

  getSystemMetrics() {
    return {
      complexity: this.optimizationState.optimizationLevel,
      efficiency: 1 - this.processingLoad,
      dimensionalActivity: Array.from(this.dimensionalLayers.values())
        .filter(layer => layer.active).length / this.dimensionalLayers.size,
      particleDistribution: Array.from(this.dimensionalLayers.entries())
        .map(([dim, layer]) => ({
          dimension: dim,
          count: layer.particles.size
        }))
    };
  }
}

// UI Component for System Enhancement
const WormholeSystemEnhancement = ({ system }) => {
  const metrics = system.getSystemMetrics();

  const renderDimensionalMetrics = useCallback(() => (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {metrics.particleDistribution.map(({ dimension, count }) => (
        <div key={dimension} className="text-xs text-white/80">
          <div>D{dimension}</div>
          <div className="h-20 bg-white/10 rounded relative">
            <div 
              className="absolute bottom-0 w-full bg-indigo-500 rounded-b transition-all"
              style={{ 
                height: `${(count / system.particles.length) * 100}%` 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  ), [metrics]);

  return (
    <div className="absolute top-4 right-4 w-64 bg-black/50 p-4 rounded-lg backdrop-blur">
      <h3 className="text-white text-sm font-medium mb-2">Dimensional Analysis</h3>
      {renderDimensionalMetrics()}
      
      <div className="mt-4 space-y-2">
        <div className="text-xs text-white/80">
          System Optimization: {(metrics.complexity * 100).toFixed(1)}%
        </div>
        <div className="text-xs text-white/80">
          Dimensional Activity: {(metrics.dimensionalActivity * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export { WormholeQuantumSystem, EnhancedWormholeQuantumSystem, WormholeSystemEnhancement };