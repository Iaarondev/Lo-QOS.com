// Core System Initialization
class LoQOSSystem {
    constructor() {
        this.initialized = false;
        this.quantum = new QuantumSystem();
        this.theme = new ThemeManager();
        this.media = new MediaManager();
        this.game = new GameSystem();
        this.metrics = new MetricsPanel();
    }

    async init() {
        if (this.initialized) return;

        try {
            // Initialize quantum system
            await this.quantum.init();
            
            // Initialize subsystems
            this.theme.init();
            this.media.init();
            this.game.init();
            this.metrics.init();

            // Start main loop
            this.startMainLoop();
            
            this.initialized = true;
            console.log("Lo-QOS System Initialized");
            
            // Update UI
            this.updateSystemStats();
        } catch (error) {
            console.error("System initialization failed:", error);
            this.handleError(error);
        }
    }

    startMainLoop() {
        const loop = () => {
            // Update quantum states
            this.quantum.update();
            
            // Update visuals
            this.updateVisualization();
            
            // Update metrics
            this.metrics.update();
            
            // Schedule next frame
            requestAnimationFrame(loop);
        };
        
        requestAnimationFrame(loop);
    }

    updateVisualization() {
        // Update quantum sphere
        const sphere = document.getElementById('quantum-sphere');
        if (sphere) {
            const state = this.quantum.getCurrentState();
            sphere.style.transform = `translate(-50%, -50%) scale(${1 + state.amplitude * 0.2})`;
            sphere.style.filter = `hue-rotate(${state.phase}deg)`;
        }

        // Update matrix overlay
        this.updateMatrixOverlay();
    }

    updateMatrixOverlay() {
        const overlay = document.getElementById('matrix-overlay');
        if (!overlay || !this.quantum.matrixData) return;

        const ctx = overlay.getContext('2d');
        ctx.clearRect(0, 0, overlay.width, overlay.height);
        
        // Draw quantum matrix effect
        this.quantum.matrixData.forEach(column => {
            column.forEach(cell => {
                ctx.fillStyle = `rgba(0, 180, 216, ${cell.intensity})`;
                ctx.fillText(cell.char, cell.x, cell.y);
            });
        });
    }

    updateSystemStats() {
        const statsContainer = document.getElementById('system-stats');
        if (!statsContainer) return;

        const stats = {
            quantumState: this.quantum.getSystemState(),
            memoryUsage: this.getMemoryUsage(),
            processCount: this.getActiveProcesses(),
            systemLoad: this.getSystemLoad()
        };

        statsContainer.innerHTML = `
            <div class="stat">Quantum State: ${stats.quantumState.toFixed(2)}</div>
            <div class="stat">Memory Usage: ${stats.memoryUsage}%</div>
            <div class="stat">Active Processes: ${stats.processCount}</div>
            <div class="stat">System Load: ${stats.systemLoad}%</div>
        `;
    }

    getMemoryUsage() {
        // Simulate memory usage
        return Math.floor(Math.random() * 30 + 60);
    }

    getActiveProcesses() {
        // Simulate process count
        return Math.floor(Math.random() * 10 + 20);
    }

    getSystemLoad() {
        // Simulate system load
        return Math.floor(Math.random() * 40 + 30);
    }

    handleError(error) {
        // Log error
        console.error("System Error:", error);

        // Show error in UI
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = `System Error: ${error.message}`;
        document.body.appendChild(notification);

        // Remove notification after delay
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.loqos = new LoQOSSystem();
    window.loqos.init().catch(console.error);
});

// Export for module usage
export default LoQOSSystem;
