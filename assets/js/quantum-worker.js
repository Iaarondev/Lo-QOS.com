// quantum-worker.js
self.onmessage = (e) => {
    const { qubits, algorithm } = e.data;

    // Example: Apply Hadamard gate to all qubits
    const hadamardGate = [
        [Math.SQRT1_2, Math.SQRT1_2],
        [Math.SQRT1_2, -Math.SQRT1_2]
    ];

    const newQubits = qubits.map(qubit => {
        const newState = [
            hadamardGate[0][0] * qubit.state[0] + hadamardGate[0][1] * qubit.state[1],
            hadamardGate[1][0] * qubit.state[0] + hadamardGate[1][1] * qubit.state[1]
        ];
        return { ...qubit, state: newState };
    });

    self.postMessage(newQubits);
};