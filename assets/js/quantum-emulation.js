
// Quantum Environment Emulation for Lo-QOS
document.addEventListener("DOMContentLoaded", () => {
    const qubits = [];
    const logElement = document.getElementById("quantum-log");

    function log(message) {
        const entry = document.createElement("div");
        entry.textContent = message;
        logElement.appendChild(entry);
    }

    function createQubit(state = [1, 0]) {
        const qubit = { state };
        qubits.push(qubit);
        log(`Created qubit with state: ${state}`);
        return qubit;
    }

    function applyGate(qubit, gate) {
        const newState = gate.map((row, i) =>
            row.reduce((sum, value, j) => sum + value * qubit.state[j], 0)
        );
        qubit.state = newState;
        log(`Applied gate. New state: ${newState}`);
    }

    function measure(qubit) {
        const probabilities = qubit.state.map((amplitude) => Math.abs(amplitude) ** 2);
        const result = Math.random() < probabilities[0] ? 0 : 1;
        qubit.state = result === 0 ? [1, 0] : [0, 1];
        log(`Measured qubit. Result: ${result}`);
        return result;
    }

    // Example Lo-Script-style operations
    const hadamardGate = [
        [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
        [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
    ];

    const qubit = createQubit();
    applyGate(qubit, hadamardGate);
    measure(qubit);
});
