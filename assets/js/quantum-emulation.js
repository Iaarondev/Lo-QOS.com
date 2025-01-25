// Quantum Environment Emulation with Enhanced Features
class QuantumEnvironment {
  constructor() {
    this.qubits = new Map();
    this.entanglements = new Map();
    this.operations = [];
    this.history = [];
    this.visualizationEnabled = true;
    this.init();
  }

  init() {
    this.setupCanvas();
    this.setupControls();
    this.registerCoreGates();
    this.startVisualizationLoop();
  }

  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.canvas.className = 'quantum-visualization';
    document.querySelector('#quantum-environment').appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  setupControls() {
    const controls = document.createElement('div');
    controls.className = 'quantum-controls';
    
    ['X', 'Y', 'Z', 'H', 'CNOT'].forEach(gate => {
      const btn = document.createElement('button');
      btn.textContent = gate;
      btn.addEventListener('click', () => this.applyNamedGate(gate));
      controls.appendChild(btn);
    });

    document.querySelector('#quantum-environment').appendChild(controls);
  }

  registerCoreGates() {
    this.gates = {
      'H': this.createHadamardGate(),
      'X': [[0, 1], [1, 0]],
      'Y': [[0, -1j], [1j, 0]],
      'Z': [[1, 0], [0, -1]],
      'CNOT': this.createCnotGate()
    };
  }

  createQubit(id = crypto.randomUUID()) {
    const qubit = {
      id,
      state: [new Complex(1, 0), new Complex(0, 0)],
      entangledWith: null,
      measurements: []
    };
    
    this.qubits.set(id, qubit);
    this.log(`Created qubit ${id}`);
    return id;
  }

  applyGate(qubitId, gateMatrix) {
    const qubit = this.qubits.get(qubitId);
    if (!qubit) throw new Error('Qubit not found');
    
    const newState = this.matrixMultiply(gateMatrix, qubit.state);
    qubit.state = this.normalizeState(newState);
    this.log(`Applied gate to ${qubitId}`);
  }

  measure(qubitId) {
    const qubit = this.qubits.get(qubitId);
    const probabilities = this.calculateProbabilities(qubit.state);
    const result = Math.random() < probabilities[0] ? 0 : 1;
    
    qubit.state = result === 0 ? 
      [new Complex(1, 0), new Complex(0, 0)] : 
      [new Complex(0, 0), new Complex(1, 0)];
    
    this.updateEntangledQubits(qubit, result);
    this.log(`Measured ${qubitId}: ${result}`);
    return result;
  }

  entangleQubits(qubitIds) {
    const entangledState = this.createEntangledState(qubitIds);
    qubitIds.forEach(id => {
      const qubit = this.qubits.get(id);
      qubit.entangledWith = entangledState;
    });
    this.entanglements.set(entangledState.id, entangledState);
  }

  visualize() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw Bloch Sphere
    this.ctx.beginPath();
    this.ctx.arc(200, 200, 150, 0, Math.PI * 2);
    this.ctx.strokeStyle = '#00b4d8';
    this.ctx.stroke();
    
    // Draw Qubit States
    this.qubits.forEach((qubit, id) => {
      const position = this.calculateBlochPosition(qubit.state);
      this.ctx.beginPath();
      this.ctx.arc(200 + position.x * 150, 200 + position.y * 150, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#90e0ef';
      this.ctx.fill();
    });
  }

  // Core quantum operations
  calculateProbabilities(state) {
    return state.map(c => c.magnitude() ** 2);
  }

  matrixMultiply(matrix, vector) {
    return matrix.map(row => 
      row.reduce((sum, element, i) => 
        sum.add(element.multiply(vector[i])), new Complex(0, 0)
      )
    );
  }

  normalizeState(state) {
    const norm = Math.sqrt(state.reduce((sum, c) => sum + c.magnitude() ** 2, 0));
    return state.map(c => c.divide(norm));
  }

  // Visualization loop
  startVisualizationLoop() {
    const animate = () => {
      if (this.visualizationEnabled) this.visualize();
      requestAnimationFrame(animate);
    };
    animate();
  }

  log(message) {
    const entry = {
      timestamp: new Date().toISOString(),
      message,
      systemState: this.getSystemSnapshot()
    };
    this.history.push(entry);
    console.log(`[Quantum] ${message}`);
  }

  getSystemSnapshot() {
    return {
      qubits: Array.from(this.qubits.values()),
      entanglements: Array.from(this.entanglements.values()),
      operations: [...this.operations]
    };
  }
}

// Complex number implementation
class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  add(other) {
    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  multiply(other) {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }

  divide(scalar) {
    return new Complex(this.real / scalar, this.imag / scalar);
  }

  magnitude() {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }
}

// Initialize quantum environment
document.addEventListener('DOMContentLoaded', () => {
  const qe = new QuantumEnvironment();
  window.quantumEnv = qe;
  
  // Example usage
  const q1 = qe.createQubit();
  const q2 = qe.createQubit();
  qe.entangleQubits([q1, q2]);
  qe.applyNamedGate('H', q1);
});
