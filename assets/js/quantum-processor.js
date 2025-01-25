// quantum-processor.js
class QuantumProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    
    if (input.length > 0) {
      const phase = Math.random() * Math.PI * 2;
      
      for (let i = 0; i < input[0].length; i++) {
        output[0][i] = input[0][i] * Math.sin(phase);
      }
      
      this.port.postMessage({ phase });
    }
    
    return true;
  }
}

registerProcessor('quantum-processor', QuantumProcessor);