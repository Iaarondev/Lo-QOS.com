class QuantumEnvironment {
  constructor() {
    this.qubits = new Map();
    this.entanglements = new Map();
    this.operations = [];
    this.history = [];
    this.visualizationEnabled = true;
    this.canvas = null;
    this.ctx = null;
    this.gates = {};
  }

  init() {
    this.setupCanvas();
    this.setupControls();
    this.registerCoreGates();
    this.startVisualizationLoop();
  }

  setupCanvas() {
    const container = document.querySelector('#quantum-environment');
    if (!container) throw new Error('Missing #quantum-environment container');
    
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'quantum-visualization';
    this.canvas.width = 400;
    this.canvas.height = 400;
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  setupControls() {
    const container = document.querySelector('#quantum-environment');
    const controls = document.createElement('div');
    controls.className = 'quantum-controls';
    
    ['X', 'Y', 'Z', 'H', 'CNOT'].forEach(gate => {
      const btn = document.createElement('button');
      btn.textContent = gate;
      btn.addEventListener('click', () => this.applyNamedGate(gate));
      controls.appendChild(btn);
    });

    container.appendChild(controls);
  }

  registerCoreGates() {
    this.gates = {
      'H': [
        [new Complex(1/Math.sqrt(2), 0), new Complex(1/Math.sqrt(2), 0)],
        [new Complex(1/Math.sqrt(2), 0), new Complex(-1/Math.sqrt(2), 0)]
      ],
      'X': [
        [new Complex(0, 0), new Complex(1, 0)],
        [new Complex(1, 0), new Complex(0, 0)]
      ],
      'Y': [
        [new Complex(0, 0), new Complex(0, -1)],
        [new Complex(0, 1), new Complex(0, 0)]
      ],
      'Z': [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(-1, 0)]
      ],
      'CNOT': [
        [new Complex(1, 0), new Complex(0, 0), new Complex(0, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(1, 0), new Complex(0, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(0, 0), new Complex(0, 0), new Complex(1, 0)],
        [new Complex(0, 0), new Complex(0, 0), new Complex(1, 0), new Complex(0, 0)]
      ]
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

  applyNamedGate(gateName, qubitId) {
    const gate = this.gates[gateName];
    if (!gate) throw new Error(`Gate ${gateName} not found`);
    this.applyGate(qubitId, gate);
  }

  measure(qubitId) {
    const qubit = this.qubits.get(qubitId);
    if (!qubit) throw new Error('Qubit not found');
    
    const probabilities = this.calculateProbabilities(qubit.state);
    const result = Math.random() < probabilities[0] ? 0 : 1;
    
    // Collapse state
    qubit.state = result === 0 ? 
      [new Complex(1, 0), new Complex(0, 0)] : 
      [new Complex(0, 0), new Complex(1, 0)];
    
    // Update entangled qubits
    if (qubit.entangledWith) {
      this.entanglements.get(qubit.entangledWith.id)?.qubits.forEach(id => {
        if (id !== qubitId) {
          const eq = this.qubits.get(id);
          if (eq) eq.state = qubit.state;
        }
      });
    }
    
    this.log(`Measured ${qubitId}: ${result}`);
    return result;
  }

  entangleQubits(qubitIds) {
    const entangledState = {
      id: crypto.randomUUID(),
      qubits: qubitIds,
      state: this.createBellState()
    };
    
    qubitIds.forEach(id => {
      const qubit = this.qubits.get(id);
      if (qubit) qubit.entangledWith = entangledState;
    });
    
    this.entanglements.set(entangledState.id, entangledState);
  }

  createBellState() {
    return [
      new Complex(1/Math.sqrt(2), 0),
      new Complex(0, 0),
      new Complex(0, 0),
      new Complex(1/Math.sqrt(2), 0)
    ];
  }

  calculateBlochPosition(state) {
    const [alpha, beta] = state;
    return {
      x: 2 * (alpha.real * beta.real + alpha.imag * beta.imag),
      y: 2 * (alpha.imag * beta.real - alpha.real * beta.imag),
      z: alpha.real**2 + alpha.imag**2 - beta.real**2 - beta.imag**2
    };
  }

  // Core quantum math functions
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

  // Visualization
  visualize() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw Bloch Sphere
    this.ctx.beginPath();
    this.ctx.arc(200, 200, 150, 0, Math.PI * 2);
    this.ctx.strokeStyle = '#00b4d8';
    this.ctx.stroke();
    
    // Draw qubit states
    this.qubits.forEach((qubit, id) => {
      const pos = this.calculateBlochPosition(qubit.state);
      this.ctx.beginPath();
      this.ctx.arc(200 + pos.x * 150, 200 + pos.y * 150, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#90e0ef';
      this.ctx.fill();
    });
  }

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

class Complex {
  constructor(real, imag = 0) {
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

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', () => {
  try {
    const qe = new QuantumEnvironment();
    window.quantumEnv = qe;
    qe.init();
    
    // Example usage
    const q1 = qe.createQubit();
    const q2 = qe.createQubit();
    qe.entangleQubits([q1, q2]);
    qe.applyNamedGate('H', q1);
  } catch (error) {
    console.error('Quantum environment initialization failed:', error);
    document.querySelector('#quantum-environment').innerHTML = `
      <div class="quantum-error">
        <h2>Quantum Decoherence Detected</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
});
