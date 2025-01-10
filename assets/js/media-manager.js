// Media Management System
class MediaManager {
    constructor() {
        this.audioContext = null;
        this.videoContext = null;
        this.visualizer = null;
        this.currentMedia = null;
        this.quantumEffectsEnabled = true;
    }

    init() {
        this.initAudioContext();
        this.initVideoContext();
        this.setupVisualizer();
        this.setupControls();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.analyser = this.audioContext.createAnalyser();
            
            // Configure analyzer
            this.analyser.fftSize = 2048;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            
            // Connect nodes
            this.gainNode.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
        } catch (e) {
            console.error('Failed to initialize audio context:', e);
        }
    }

    initVideoContext() {
        const videoContainer = document.querySelector('.video-container');
        if (!videoContainer) return;

        this.videoContext = {
            container: videoContainer,
            canvas: document.createElement('canvas'),
            ctx: null
        };

        this.videoContext.canvas.className = 'video-overlay';
        this.videoContext.ctx = this.videoContext.canvas.getContext('2d');
        videoContainer.appendChild(this.videoContext.canvas);
    }

    setupVisualizer() {
        const visualizer = document.getElementById('qmp3-visualizer');
        if (!visualizer) return;

        this.visualizer = {
            canvas: visualizer,
            ctx: visualizer.getContext('2d'),
            mode: 'classic',
            lastFrame: 0
        };

        this.startVisualizerLoop();
    }

    setupControls() {
        // Audio controls
        document.querySelectorAll('.media-controls button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                if (action) this.handleMediaAction(action);
            });
        });

        // Visualization mode selector
        const modeSelect = document.getElementById('visualization-mode');
        if (modeSelect) {
            modeSelect.addEventListener('change', (e) => {
                this.visualizer.mode = e.target.value;
            });
        }
    }

    handleMediaAction(action) {
        switch (action) {
            case 'play':
                this.playMedia();
                break;
            case 'pause':
                this.pauseMedia();
                break;
            case 'toggle-effects':
                this.toggleQuantumEffects();
                break;
            case 'toggle-visualization':
                this.toggleVisualization();
                break;
        }
    }

    async playMedia(source) {
        if (!this.audioContext) return;

        try {
            if (typeof source === 'string') {
                // Load audio file
                const response = await fetch(source);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                
                // Create source
                const sourceNode = this.audioContext.createBufferSource();
                sourceNode.buffer = audioBuffer;
                sourceNode.connect(this.gainNode);
                
                this.currentMedia = sourceNode;
                this.currentMedia.start(0);
            }
        } catch (e) {
            console.error('Failed to play media:', e);
        }
    }

    pauseMedia() {
        if (this.currentMedia) {
            this.currentMedia.stop();
            this.currentMedia = null;
        }
    }

    toggleQuantumEffects() {
        this.quantumEffectsEnabled = !this.quantumEffectsEnabled;
        if (this.videoContext) {
            this.videoContext.canvas.style.display = 
                this.quantumEffectsEnabled ? 'block' : 'none';
        }
    }

    startVisualizerLoop() {
        const draw = (timestamp) => {
            if (!this.visualizer) return;

            // Calculate delta time
            const delta = timestamp - this.visualizer.lastFrame;
            this.visualizer.lastFrame = timestamp;

            // Clear canvas
            const { ctx, canvas } = this.visualizer;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Get audio data
            this.analyser.getByteFrequencyData(this.dataArray);

            // Draw based on mode
            switch (this.visualizer.mode) {
                case 'quantum':
                    this.drawQuantumVisualization(delta);
                    break;
                case 'spiral':
                    this.drawSpiralVisualization(delta);
                    break;
                case 'wave':
                    this.drawWaveVisualization(delta);
                    break;
                default:
                    this.drawClassicVisualization(delta);
            }

            requestAnimationFrame(draw);
        };

        requestAnimationFrame(draw);
    }

    drawQuantumVisualization(delta) {
        const { ctx, canvas } = this.visualizer;
        const quantum = window.loqos?.quantum;
        
        if (!quantum) return this.drawClassicVisualization(delta);

        const state = quantum.getCurrentState();
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw quantum interference pattern
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${state.phase}, 70%, 60%)`;
        ctx.lineWidth = 2;

        for (let i = 0; i < this.bufferLength; i++) {
            const value = this.dataArray[i] / 128.0;
            const angle = (i * Math.PI * 2) / this.bufferLength;
            const radius = value * canvas.height / 3;

            const x = centerX + Math.cos(angle + state.phase * Math.PI / 180) * radius;
            const y = centerY + Math.sin(angle + state.phase * Math.PI / 180) * radius;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();
        ctx.stroke();
    }

    drawSpiralVisualization(delta) {
        const { ctx, canvas } = this.visualizer;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = 'rgba(144, 224, 239, 0.8)';
        ctx.lineWidth = 2;
        
        let angle = 0;
        let radius = 0;
        
        ctx.beginPath();
        for (let i = 0; i < this.bufferLength; i++) {
            const value = this.dataArray[i] / 255.0;
            angle += Math.PI * 2 / 50;
            radius += 0.5;
            
            const x = centerX + Math.cos(angle) * radius * value * 50;
            const y = centerY + Math.sin(angle) * radius * value * 50;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    drawWaveVisualization(delta) {
        const { ctx, canvas } = this.visualizer;
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 180, 216)';
        
        ctx.beginPath();
        const sliceWidth = canvas.width / this.bufferLength;
        let x = 0;
        
        for (let i = 0; i < this.bufferLength; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = v * canvas.height / 2;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            x += sliceWidth;
        }
        
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    }

    drawClassicVisualization(delta) {
        const { ctx, canvas } = this.visualizer;
        const barWidth = canvas.width / this.bufferLength * 2.5;
        let x = 0;
        
        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = this.dataArray[i] / 2;
            
            ctx.fillStyle = `rgb(${barHeight + 100}, 180, 216)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }
}

// Export for module usage
export default MediaManager;