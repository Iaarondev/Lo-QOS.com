// assets/js/loqos-core.js
import { QuantumMediaManager } from './media-manager.js';
import { QuantumSystem } from './quantum-system.js';
import { ThemeManager } from './theme-manager.js';
import { GameEngine } from './game-engine.js';
import { PerformanceMonitor } from './performance-monitor.js';
import { StateObservable } from './state-observable.js';

export default class LoQOSSystem {
    constructor() {
        this.state = {
            initialized: false,
            subsystems: {
                quantum: new QuantumSystem(),
                theme: new ThemeManager(),
                media: new QuantumMediaManager(),
                game: new GameEngine(),
                metrics: new PerformanceMonitor()
            },
            config: {
                renderMode: 'webgl',
                quantumEntanglement: true,
                securityLevel: 'high'
            },
            observables: new StateObservable(),
            services: {} // Initialize services object
        };

        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    async init() {
        if (this.state.initialized) return;

        try {
            // Start services first
            this.startServices();

            // Initialize core subsystems
            await this.initializeCoreSubsystems();
            
            // Initialize state management
            this.setupStateObservables();
            
            // Start main application loop
            this.startMainLoop();

            this.state.initialized = true;
            this.logSystemEvent('System initialized');
            
            // Load plugins
            this.loadPlugins();

        } catch (error) {
            this.handleError(error, true);
        }
    }

    async initializeCoreSubsystems() {
        const initPromises = [
            this.state.subsystems.quantum.init(),
            this.state.subsystems.metrics.connect(),
            this.state.subsystems.media.initializeWebGL()
        ];

        await Promise.all(initPromises);
        
        // Configure quantum-safe encryption
        if (this.state.config.securityLevel === 'high') {
            await this.enableQuantumEncryption();
        }
    }

    startServices() {
        // Start background services
        this.state.services = {
            telemetry: new TelemetryService(),
            updateManager: new QuantumUpdateService(),
            security: new SecurityMonitor()
        };

        // Initialize service workers
        this.serviceWorker = new Worker('/sw/quantum-sw.js');
        this.setupServiceWorkerMessaging();
    }

    setupStateObservables() {
        // System performance metrics
        this.state.observables.createStream('performance', {
            fps: 60,
            memoryUsage: 0,
            quantumState: 0
        });

        // Security events stream
        this.state.observables.createStream('security', {
            threatsDetected: 0,
            encryptionStatus: 'inactive'
        });
    }

    startMainLoop() {
        const mainLoop = (timestamp, delta) => {
            try {
                // Update phase
                this.updateQuantumState(timestamp);
                this.updateSubsystems(delta);
                this.renderFrame();
                
                // Collect metrics
                this.collectPerformanceMetrics();
                
                // Schedule next frame
                requestAnimationFrame((ts) => mainLoop(ts, ts - timestamp));
            } catch (error) {
                this.handleError(error);
            }
        };

        requestAnimationFrame((ts) => mainLoop(ts, 0));
    }

    updateQuantumState(timestamp) {
        const quantum = this.state.subsystems.quantum;
        quantum.phase = (timestamp * 0.01) % 360;
        quantum.amplitude = Math.sin(timestamp * 0.001) * 0.5 + 0.5;
        
        // Update quantum state visualization
        if (this.state.config.renderMode === 'webgl') {
            quantum.renderWebGL();
        } else {
            quantum.renderCanvas();
        }
    }

    updateSubsystems(delta) {
        // Update physics and game state
        this.state.subsystems.game.update(delta);
        
        // Process media effects
        this.state.subsystems.media.applyQuantumEffects(
            this.state.subsystems.quantum.getCurrentState()
        );
        
        // Update security monitoring
        this.state.services.security.scan();
    }

    renderFrame() {
        // Main rendering pipeline
        const renderer = this.state.config.renderMode === 'webgl' 
            ? WebGLRenderer.getInstance()
            : CanvasRenderer.getInstance();

        renderer.beginFrame();
        
        // Render quantum environment
        renderer.renderQuantumField(
            this.state.subsystems.quantum.getStateMatrix()
        );
        
        // Render UI components
        this.renderSystemUI(renderer);
        
        renderer.endFrame();
    }

    async enableQuantumEncryption() {
        const qcrypto = await import('./quantum-crypto.js');
        this.state.cryptoEngine = new qcrypto.QuantumCryptoSystem();
        await this.state.cryptoEngine.generateKeys();
        
        this.state.observables.getStream('security').update({
            encryptionStatus: 'active'
        });
    }

    handleError(error, critical = false) {
        const errorData = {
            message: error.message,
            stack: error.stack,
            timestamp: Date.now(),
            subsystem: error.subsystem || 'core'
        };

        // Log to error tracking service
        this.state.services.telemetry.logError(errorData);
        
        // Show user notification
        const notification = new QuantumNotification(
            'system-error',
            `Quantum Flux Anomaly: ${error.message.substr(0, 50)}...`
        );
        
        notification.show();

        if (critical) {
            this.enterRecoveryMode();
        }
    }

    async loadPlugins() {
        try {
            const pluginLoader = new PluginManager();
            await pluginLoader.loadCorePlugins();
            
            // Initialize quantum computing plugins
            if (this.state.config.quantumEntanglement) {
                await pluginLoader.enablePlugin('quantum-entanglement');
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    collectPerformanceMetrics() {
        const metrics = {
            fps: this.state.subsystems.metrics.getFPS(),
            memoryUsage: performance.memory.jsHeapSizeLimit 
                ? (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit * 100)
                : 0,
            quantumState: this.state.subsystems.quantum.getStateEntropy()
        };

        this.state.observables.getStream('performance').update(metrics);
        this.state.services.telemetry.reportMetrics(metrics);
    }

    destroy() {
        // Cleanup resources
        this.state.subsystems.quantum.shutdown();
        this.state.services.telemetry.disconnect();
        WebGLRenderer.cleanup();
        
        // Terminate workers
        this.serviceWorker.terminate();
    }
}

// System startup
document.addEventListener('quantum-ready', async () => {
    try {
        window.loqos = window.loqos || new LoQOSSystem();
        await window.loqos.init();
        
        // Load progressive enhancements
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
        
        // Initialize quantum UI components
        QuantumUI.initialize();
    } catch (error) {
        console.error('Boot sequence failed:', error);
    }
});
