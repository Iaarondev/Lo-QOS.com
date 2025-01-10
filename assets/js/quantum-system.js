// Quantum System Implementation
class QuantumSystem {
    constructor() {
        this.qubits = new Map();
        this.entangledPairs = new Set();
        this.matrixData = [];
        this.phase = 0;
        this.amplitude = 1;
    }

    async init() {
        // Initialize quantum state
        this.initializeQubits(8); // Start with 8 qubits
        this.initializeMatrixEffect();
        
        // Start quantum simulation
        this.startQuantumSimulation();
    }

    initializeQubits(count) {
        for (let i = 0; i < count; i++) {
            this.qubits.set(i, {
                state: this.createSuperposition(),
                entangled: null,
                phase: Math.random() * 360
            });
        }
    }

    createSuperposition() {
        // Simulate quantum superposition with complex numbers
        return {
            real: Math.cos(Math.random() * Math.PI),
            imaginary: Math.sin(Math.random() * Math.PI)
        };
    }

    entangleQubits(qubit1Id, qubit2Id) {
        const q1 = this.qubits.get(qubit1Id);
        const q2 = this.qubits.get(qubit2Id);
        
        if (q1 && q2) {
            q1.entangled = qubit2Id;
            q2.entangled = qubit1Id;
            this.entangledPairs.add(`${qubit1Id}-${qubit2Id}`);
        }
    }

    measureQubit(qubitId) {
        const qubit = this.qubits.get(qubitId);
        if (!qubit) return null;

        // Collapse superposition
        const probability = Math.pow(qubit.state.real, 2) + Math.pow(qubit.state.imaginary, 2);
        const measured = Math.random() <= probability ? 1 : 0;

        // Update entangled qubit if exists
        if (qubit.entangled !== null) {
            const entangledQubit = this.qubits.get(qubit.entangled);
            if (entangledQubit) {
                entangledQubit.state = measured ? { real: 0, imaginary: 1 } : { real: 1, imaginary: 0 };
            }
        }

        return measured;
    }

    initializeMatrixEffect() {
        const columns = Math.floor(window.innerWidth / 20);
        const rows = Math.floor(window.innerHeight / 20);

        this.matrixData = Array(columns).fill(null).map((_, x) => 
            Array(rows).fill(null).map((_, y) => ({
                char: this.getRandomQuantumChar(),
                x: x * 20,
                y: y * 20,
                intensity: Math.random(),
                speed: 1 + Math.random() * 2
            }))
        );
    }

    getRandomQuantumChar() {
        const chars = '|⟩⟨ψΦΨ∑∏∆∇∫≡±×÷φπτθ';
        return chars[Math.floor(Math.random() * chars.length)];
    }

    update() {
        // Update quantum states
        this.updateQuantumStates();
        
        // Update matrix effect
        this.updateMatrixEffect();
        
        // Update phase and amplitude
        this.phase = (this.phase + 1) % 360;
        this.amplitude = 0.8 + Math.sin(Date.now() / 1000) * 0.2;
    }

    updateQuantumStates() {
        this.qubits.forEach((qubit, id) => {
            // Rotate phase
            qubit.phase = (qubit.phase + Math.random() * 10) % 360;
            
            // Update superposition
            const noise = (Math.random() - 0.5) * 0.1;
            qubit.state.real = Math.cos(qubit.phase * Math.PI / 180) + noise;
            qubit.state.imaginary = Math.sin(qubit.phase * Math.PI / 180) + noise;
            
            // Normalize
            const magnitude = Math.sqrt(
                Math.pow(qubit.state.real, 2) + 
                Math.pow(qubit.state.imaginary, 2)
            );
            qubit.state.real /= magnitude;
            qubit.state.imaginary /= magnitude;
        });
    }

    updateMatrixEffect() {
        this.matrixData.forEach(column => {
            column.forEach(cell => {
                cell.y += cell.speed;
                if (cell.y > window.innerHeight) {
                    cell.y = 0;
                    cell.char = this.getRandomQuantumChar();
                    cell.intensity = Math.random();
                }
            });
        });
    }

    getCurrentState() {
        return {
            phase: this.phase,
            amplitude: this.amplitude
        };
    }

    getSystemState() {
        // Calculate overall system state based on qubit states
        let totalEnergy = 0;
        this.qubits.forEach(qubit => {
            totalEnergy += Math.pow(qubit.state.real, 2) + Math.pow(qubit.state.imaginary, 2);
        });
        return totalEnergy / this.qubits.size;
    }
}

// Export for module usage
export default QuantumSystem;
