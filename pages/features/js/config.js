// config.js
const CONFIG = {
  PARTICLE: {
    MIN_SIZE: 1,
    MAX_SIZE: 4,
    MIN_SPEED: -1,
    MAX_SPEED: 1,
    BASE_HUE: 240,
    HUE_RANGE: 60,
  },
  QUANTUM: {
    MIN_COHERENCE: 0.5,
    MAX_COHERENCE: 1,
    STATE_CHANGE_RATE: 0.1,
    EFFECT_MULTIPLIER: 5,
  },
  ZKP: {
    STATE_0_THRESHOLD: 0.33,
    STATE_05_THRESHOLD: 0.66,
  },
};

// Configuration constants for the Quantum Clock
const QUANTUM_CLOCK_CONFIG = {
  // Particle System
  PARTICLE: {
    MIN_SIZE: 1,
    MAX_SIZE: 4,
    BASE_SPEED: 1,
    SPEED_VARIANCE: 0.5,
    LIFE_DECAY_RATE: 0.01,
    COLOR: {
      BASE_HUE: 240,
      HUE_RANGE: 60,
      SATURATION: 70,
      LIGHTNESS: 60,
    },
  },

  // Quantum States
  QUANTUM: {
    UPDATE_RATE: 0.1,
    BASE_COHERENCE: 0.5,
    MAX_COHERENCE: 1,
    COHERENCE_STEP: 0.01,
    EFFECT_MULTIPLIER: 5,
  },

  // Zero Knowledge Proof States
  ZKP: {
    THRESHOLDS: {
      STATE_0: 0.33,
      STATE_05: 0.66,
      STATE_1: 1.0,
    },
    UPDATE_INTERVAL: 100, // ms
  },

  // Clock Hands
  HANDS: {
    HOUR: {
      WIDTH: 4,
      LENGTH_PERCENT: 35,
      COLOR: "#6366f1",
    },
    MINUTE: {
      WIDTH: 3,
      LENGTH_PERCENT: 45,
      COLOR: "#818cf8",
    },
    SECOND: {
      WIDTH: 2,
      LENGTH_PERCENT: 50,
      COLOR: "#a5b4fc",
    },
  },

  // Animations
  ANIMATION: {
    PARTICLE_TRAIL_ALPHA: 0.1,
    TRANSITION_DURATION: 300,
    GLOW_INTENSITY: 10,
  },

  // Display
  DISPLAY: {
    MAX_PARTICLES: 100,
    CIRCLE_RADIUS: 54,
    CIRCLE_CIRCUMFERENCE: 339.292, // 2 * π * CIRCLE_RADIUS
    UPDATE_INTERVAL: {
      CLOCK: 1000, // 1 second
      METERS: 100, // 100ms
      PARTICLES: 16, // ~60fps
    },
  },

  // Behavior Modes
  MODES: {
    NORMAL: {
      SPEED_MULTIPLIER: 1,
      PARTICLE_SPAWN_RATE: 0.3,
    },
    CHAOS: {
      SPEED_MULTIPLIER: 2,
      PARTICLE_SPAWN_RATE: 0.5,
    },
    HARMONY: {
      SPEED_MULTIPLIER: 0.8,
      PARTICLE_SPAWN_RATE: 0.2,
      ORBIT_DISTANCE: 150,
    },
  },
};

export default QUANTUM_CLOCK_CONFIG;
