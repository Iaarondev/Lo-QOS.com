import Complex from './complex.js';

export default class StateObservable {
    constructor() {
        this.observers = new Map();
        this.stateHistory = [];
        this.errorStreams = new Set();
    }

    createStream(name, initialState) {
        this.observers.set(name, {
            subscribers: new Set(),
            currentState: initialState
        });
    }

    subscribe(streamName, callback) {
        const stream = this.observers.get(streamName);
        if (stream) {
            stream.subscribers.add(callback);
            return () => stream.subscribers.delete(callback);
        }
        this.reportError(`Quantum stream ${streamName} not found`);
    }

    updateStream(streamName, newState) {
        const stream = this.observers.get(streamName);
        if (stream) {
            stream.currentState = newState;
            this.stateHistory.push({
                timestamp: Date.now(),
                state: structuredClone(newState)
            });
            stream.subscribers.forEach(cb => cb(newState));
        }
    }

    getQuantumState(streamName) {
        return this.observers.get(streamName)?.currentState;
    }

    registerErrorStream(callback) {
        this.errorStreams.add(callback);
    }

    reportError(message) {
        this.errorStreams.forEach(cb => cb({
            timestamp: Date.now(),
            message,
            severity: 'quantum-critical'
        }));
    }
}
