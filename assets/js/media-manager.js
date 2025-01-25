class QuantumMediaManager {
    constructor() {
        this.audioContext = null;
        this.videoContext = null;
        this.visualizer = null;
        this.currentMedia = null;
        this.quantumEffectsEnabled = true;
        this.mediaStreams = new Map();
        this.playbackState = {
            paused: false,
            position: 0,
            startTime: 0
        };
    }

    async init() {
        await this.initAudioContext();
        this.initVideoContext();
        this.setupVisualizer();
        this.setupControls();
        this.setupResizeHandler();
    }

    async initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.analyser = this.audioContext.createAnalyser();
            
            // Quantum audio processing
            this.quantumProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);
            this.quantumProcessor.onaudioprocess = this.applyQuantumEffects.bind(this);
            
            this.analyser.fftSize = 2048;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            
            this.gainNode.connect(this.analyser);
            this.analyser.connect(this.quantumProcessor);
            this.quantumProcessor.connect(this.audioContext.destination);
        } catch (e) {
            console.error('Quantum audio initialization failed:', e);
        }
    }

    applyQuantumEffects(audioProcessingEvent) {
        if (!this.quantumEffectsEnabled) return;
        
        const inputBuffer = audioProcessingEvent.inputBuffer;
        const outputBuffer = audioProcessingEvent.outputBuffer;
        const quantum = window.loqos?.quantum;
        
        for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
            const inputData = inputBuffer.getChannelData(channel);
            const outputData = outputBuffer.getChannelData(channel);
            
            // Apply quantum superposition effect
            if (quantum) {
                const state = quantum.getAudioState();
                for (let i = 0; i < inputData.length; i++) {
                    outputData[i] = inputData[i] * Math.sin(state.phase * i);
                }
            } else {
                outputData.set(inputData);
            }
        }
    }

    async playMedia(source) {
        if (!this.audioContext) return;

        try {
            if (this.currentMedia) {
                this.currentMedia.stop();
                this.mediaStreams.delete(this.currentMedia);
            }

            const { sourceNode, audioBuffer } = await this.loadMedia(source);
            sourceNode.connect(this.gainNode);
            
            this.currentMedia = sourceNode;
            this.mediaStreams.set(sourceNode, {
                buffer: audioBuffer,
                startTime: this.audioContext.currentTime,
                offset: 0
            });
            
            sourceNode.start(0, this.playbackState.position);
            this.playbackState.paused = false;
            this.playbackState.startTime = this.audioContext.currentTime;

        } catch (e) {
            console.error('Quantum media playback failed:', e);
            throw new Error('MEDIA_PLAYBACK_FAILED');
        }
    }

    async loadMedia(source) {
        try {
            const response = await fetch(source);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            const sourceNode = this.audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            return { sourceNode, audioBuffer };
        } catch (e) {
            throw new Error('MEDIA_LOAD_FAILED');
        }
    }

    pauseMedia() {
        if (!this.currentMedia || this.playbackState.paused) return;

        this.playbackState.position += this.audioContext.currentTime - this.playbackState.startTime;
        this.currentMedia.stop();
        this.playbackState.paused = true;
    }

    resumeMedia() {
        if (!this.playbackState.paused || !this.mediaStreams.has(this.currentMedia)) return;

        const sourceNode = this.audioContext.createBufferSource();
        const streamInfo = this.mediaStreams.get(this.currentMedia);
        
        sourceNode.buffer = streamInfo.buffer;
        sourceNode.connect(this.gainNode);
        sourceNode.start(0, this.playbackState.position % streamInfo.buffer.duration);
        
        this.currentMedia = sourceNode;
        this.mediaStreams.set(sourceNode, { ...streamInfo, startTime: this.audioContext.currentTime });
        this.playbackState.paused = false;
        this.playbackState.startTime = this.audioContext.currentTime;
    }

    // Enhanced visualization methods
    drawQuantumVisualization(delta) {
        const { ctx, canvas } = this.visualizer;
        const quantum = window.loqos?.quantum;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (!quantum) return this.drawClassicVisualization(delta);

        const state = quantum.getVisualState();
        ctx.strokeStyle = `hsl(${state.phase}, 70%, 60%)`;
        
        // Create quantum interference pattern
        ctx.beginPath();
        for (let i = 0; i < this.bufferLength; i++) {
            const amplitude = this.dataArray[i] / 255;
            const angle = (i / this.bufferLength) * Math.PI * 2 + state.phase;
            const radius = amplitude * canvas.height / 2;
            
            const x = canvas.width/2 + Math.cos(angle) * radius;
            const y = canvas.height/2 + Math.sin(angle) * radius;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            if (this.visualizer) {
                this.visualizer.canvas.width = this.visualizer.canvas.offsetWidth;
                this.visualizer.canvas.height = this.visualizer.canvas.offsetHeight;
            }
            if (this.videoContext) {
                this.videoContext.canvas.width = this.videoContext.container.offsetWidth;
                this.videoContext.canvas.height = this.videoContext.container.offsetHeight;
            }
        });
    }

    async destroy() {
        this.pauseMedia();
        this.mediaStreams.clear();
        
        if (this.audioContext) {
            await this.audioContext.close();
        }
        
        if (this.videoContext) {
            this.videoContext.canvas.remove();
        }
        
        window.removeEventListener('resize', this.handleResize);
    }
}

export default QuantumMediaManager;
