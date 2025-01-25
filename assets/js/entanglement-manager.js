import Complex from './complex.js';
import QuantumGates from './quantum-gates.js';

export default class EntanglementManager {
    constructor() {
        this.entangledPairs = new Map();
        this.entangledGroups = new Map();
    }

    entangleQubits(qubitIds, system) {
        const entangledState = this.createBellState(qubitIds.length);
        this.entangledGroups.set(entangledState.id, {
            state: entangledState,
            qubits: qubitIds
        });

        qubitIds.forEach(id => {
            const qubit = system.getQubit(id);
            qubit.entangled = entangledState.id;
        });
    }

    createBellState(numQubits = 2) {
        const state = new Array(2 ** numQubits).fill(new Complex(0));
        state[0] = new Complex(1 / Math.sqrt(2));
        state[state.length - 1] = new Complex(1 / Math.sqrt(2));
        return {
            id: crypto.randomUUID(),
            state,
            qubits: []
        };
    }

    updateEntangledState(qubitId, measuredState, system) {
        const groupId = system.getQubit(qubitId).entangled;
        if (!groupId) return;

        const group = this.entangledGroups.get(groupId);
        const targetIndex = group.qubits.indexOf(qubitId);
        
        // Collapse entangled state
        group.state = group.state.map((_, index) => {
            const bits = index.toString(2).padStart(group.qubits.length, '0');
            return bits[targetIndex] === String(measuredState) 
                ? new Complex(1) 
                : new Complex(0);
        });

        // Normalize
        const norm = Math.sqrt(group.state.reduce((sum, c) => sum + c.magnitude() ** 2, 0));
        group.state = group.state.map(c => c.divide(norm));

        // Update all entangled qubits
        group.qubits.forEach((id, idx) => {
            if (id !== qubitId) {
                const qubit = system.getQubit(id);
                qubit.state = this.calculateReducedState(group.state, idx);
            }
        });
    }

    calculateReducedState(state, qubitIndex) {
        const numQubits = Math.log2(state.length);
        const reducedState = [new Complex(0), new Complex(0)];
        
        state.forEach((amp, index) => {
            const bits = index.toString(2).padStart(numQubits, '0');
            const targetBit = bits[qubitIndex];
            reducedState[parseInt(targetBit)] = 
                reducedState[parseInt(targetBit)].add(amp);
        });

        return reducedState;
    }

    breakEntanglement(qubitId, system) {
        const groupId = system.getQubit(qubitId).entangled;
        if (!groupId) return;

        this.entangledGroups.delete(groupId);
        system.getQubit(qubitId).entangled = null;
    }
}
