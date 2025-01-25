class QuantumMediaManager {
    constructor() {
        this.audioContext = null;
        this.quantumProcessor = null;
        this.mediaStreams = new Map();
        this.visualizationModes = new Map();
        this.activeVisualizers = new Set();
        this.quantumState = {
            phase: 0,
            entanglement: 0,
            superposition: 0.5
        };
    }

    async init() {
        await this.initQuantumAudioContext();
        this.registerCoreVisualizations();
        this.setupQuantumEventListeners();
        this.startPhaseEvolution();
    }

    async initQuantumAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.quantumProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);
            
            this.quantumProcessor.onaudioprocess = (e) => {
                this.processQuantumAudio(e);
            };

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            
            this.analyser.connect(this.quantumProcessor);
        } catch (error) {
            console.error('Quantum audio initialization failed:', error);
            throw new Error('QUANTUM_AUDIO_INIT_FAILED');
        }
    }

    processQuantumAudio(e) {
        const input = e.inputBuffer.getChannelData(0);
        const output = e.outputBuffer.getChannelData(0);
        
        // Apply quantum phase modulation
        for (let i = 0; i < input.length; i++) {
            const phaseShift = Math.sin(this.quantumState.phase + i * 0.01);
            output[i] = input[i] * (0.5 + 0.5 * phaseShift);
        }
        
        this.quantumState.phase += 0.02;
    }

    registerCoreVisualizations() {
        this.registerVisualization('quantum', this.drawQuantumField.bind(this));
        this.registerVisualization('entanglement', this.drawEntanglementWeb.bind(this));
        this.registerVisualization('particle', this.drawParticleSystem.bind(this));
    }

    registerVisualization(name, drawFn) {
        this.visualizationModes.set(name, {
            draw: drawFn,
            canvas: this.createVisualizerCanvas(name)
        });
    }

    createVisualizerCanvas(name) {
        const canvas = document.createElement('canvas');
        canvas.className = `visualizer-${name}`;
        canvas.width = 800;
        canvas.height = 400;
        document.querySelector('#visualization-container').appendChild(canvas);
        return canvas;
    }

    async loadQuantumMedia(url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            const sourceNode = this.audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(this.analyser);
            
            this.mediaStreams.set(url, {
                sourceNode,
                audioBuffer,
                lastPosition: 0
            });
            
            return sourceNode;
        } catch (error) {
            console.error('Quantum media load failed:', error);
            throw new Error('QUANTUM_MEDIA_LOAD_FAILED');
        }
    }

    startPhaseEvolution() {
        const evolve = () => {
            this.quantumState.phase += 0.005;
            this.quantumState.entanglement = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
            requestAnimationFrame(evolve);
        };
        evolve();
    }

    drawQuantumField(ctx, canvas, delta) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = `hsl(${this.quantumState.phase * 50}, 70%, 50%)`;
        ctx.beginPath();
        
        for (let i = 0; i < this.bufferLength; i++) {
            const amplitude = this.dataArray[i] / 255;
            const angle = (i / this.bufferLength) * Math.PI * 2 + this.quantumState.phase;
            const x = canvas.width/2 + Math.cos(angle) * amplitude * 300;
            const y = canvas.height/2 + Math.sin(angle) * amplitude * 300;
            
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    drawEntanglementWeb(ctx, canvas, delta) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width/2;
        const centerY = canvas.height/2;
        
        for (let i = 0; i < this.bufferLength; i += 4) {
            const amplitude = this.dataArray[i] / 255;
            const angle = (i / this.bufferLength) * Math.PI * 2;
            const targetX = centerX + Math.cos(angle) * 200;
            const targetY = centerY + Math.sin(angle) * 200;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(targetX, targetY);
            ctx.strokeStyle = `rgba(0, 180, 216, ${amplitude})`;
            ctx.stroke();
        }
    }

    drawParticleSystem(ctx, canvas, delta) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const particleCount = this.bufferLength;
        const centerX = canvas.width/2;
        const centerY = canvas.height/2;
        
        for (let i = 0; i < particleCount; i++) {
            const energy = this.dataArray[i] / 255;
            const angle = (i / particleCount) * Math.PI * 2 + this.quantumState.phase;
            const radius = energy * 200;
            
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius,
                energy * 3,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = `hsla(${energy * 360}, 70%, 50%, ${energy})`;
            ctx.fill();
        }
    }

    toggleVisualizationMode(mode) {
        if (this.activeVisualizers.has(mode)) {
            this.activeVisualizers.delete(mode);
        } else {
            this.activeVisualizers.add(mode);
        }
        this.renderVisualizations();
    }

    renderVisualizations() {
        this.activeVisualizers.forEach(mode => {
            const vis = this.visualizationModes.get(mode);
            if (vis) {
                vis.ctx = vis.canvas.getContext('2d');
                this.analyser.getByteFrequencyData(this.dataArray);
                vis.draw(vis.ctx, vis.canvas, performance.now());
            }
        });
        requestAnimationFrame(this.renderVisualizations.bind(this));
    }

    setupQuantumEventListeners() {
        window.addEventListener('quantum-state-change', (e) => {
            this.quantumState = { ...this.quantumState, ...e.detail };
        });
    }

    async destroy() {
        this.mediaStreams.forEach(stream => stream.sourceNode.stop());
        this.quantumProcessor.disconnect();
        await this.audioContext.close();
    }
}

// Usage example
const mediaManager = new QuantumMediaManager();
await mediaManager.init();
await mediaManager.loadQuantumMedia('quantum-soundtrack.qmp3');
mediaManager.toggleVisualizationMode('quantum');
mediaManager.toggleVisualizationMode('particle');
