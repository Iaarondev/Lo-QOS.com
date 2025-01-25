import Complex from './complex.js';

export default class QuantumGates {
    static get H() {
        const sqrt = new Complex(1 / Math.sqrt(2), 0);
        return [
            [sqrt, sqrt],
            [sqrt, sqrt.multiply(new Complex(-1, 0))]
        ];
    }

    static get X() {
        return [
            [new Complex(0), new Complex(1)],
            [new Complex(1), new Complex(0)]
        ];
    }

    static get Y() {
        return [
            [new Complex(0), new Complex(0, -1)],
            [new Complex(0, 1), new Complex(0)]
        ];
    }

    static get Z() {
        return [
            [new Complex(1), new Complex(0)],
            [new Complex(0), new Complex(-1)]
        ];
    }

    static get CNOT() {
        return [
            [new Complex(1), new Complex(0), new Complex(0), new Complex(0)],
            [new Complex(0), new Complex(1), new Complex(0), new Complex(0)],
            [new Complex(0), new Complex(0), new Complex(0), new Complex(1)],
            [new Complex(0), new Complex(0), new Complex(1), new Complex(0)]
        ];
    }

    static get SWAP() {
        return [
            [new Complex(1), new Complex(0), new Complex(0), new Complex(0)],
            [new Complex(0), new Complex(0), new Complex(1), new Complex(0)],
            [new Complex(0), new Complex(1), new Complex(0), new Complex(0)],
            [new Complex(0), new Complex(0), new Complex(0), new Complex(1)]
        ];
    }

    static phaseGate(angle) {
        return [
            [new Complex(1), new Complex(0)],
            [new Complex(0), new Complex(Math.cos(angle), Math.sin(angle))]
        ];
    }
}
