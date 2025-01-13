// quantum-sim.js
export class QuantumNanobotSim {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nanobots = [];
        this.particles = [];
        this.quantumState = 0;
        this.running = false;
        this.stats = {
            cleanedParticles: 0,
            quantumEntanglements: 0,
            efficiency: 100
        };

        this.setupCanvas();
        this.createControls();
        this.initialize();
    }

    setupCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = 400;
        this.canvas.style.backgroundColor = '#000033';
        this.container.appendChild(this.canvas);

        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = this.container.clientWidth;
        });
    }

    createControls() {
        const controls = document.createElement('div');
        controls.className = 'controls';
        controls.style.marginBottom = '1rem';

        // Start/Stop button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Start Simulation';
        toggleButton.onclick = () => {
            this.running = !this.running;
            toggleButton.textContent = this.running ? 'Pause Simulation' : 'Start Simulation';
            if (this.running) this.animate();
        };

        // Add particle button
        const addParticleButton = document.createElement('button');
        addParticleButton.textContent = 'Add Harmful Particle';
        addParticleButton.onclick = () => {
            this.addParticle();
        };

        // Add nanobot button
        const addBotButton = document.createElement('button');
        addBotButton.textContent = 'Add Nanobot';
        addBotButton.onclick = () => {
            this.addNanobot();
        };

        controls.appendChild(toggleButton);
        controls.appendChild(addParticleButton);
        controls.appendChild(addBotButton);
        this.container.insertBefore(controls, this.canvas);

        // Create stats display
        this.statsDisplay = document.createElement('div');
        this.statsDisplay.className = 'stats';
        this.statsDisplay.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 5px;
            color: #fff;
            font-family: monospace;
        `;
        this.container.appendChild(this.statsDisplay);
    }

    initialize() {
        // Create initial nanobots
        for (let i = 0; i < 10; i++) {
            this.addNanobot();
        }

        // Create initial particles
        for (let i = 0; i < 20; i++) {
            this.addParticle();
        }
    }

    addNanobot() {
        this.nanobots.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            state: 'searching', // searching | cleaning | entangled
            entangledWith: null,
            quantumPhase: Math.random() * Math.PI * 2,
            size: 6,
            efficiency: Math.random() * 0.3 + 0.7 // 70-100% efficiency
        });
    }

    addParticle() {
        this.particles.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            type: Math.random() > 0.7 ? 'harmful' : 'normal',
            size: 4
        });
    }

    updateQuantumState() {
        this.quantumState = (this.quantumState + 0.01) % (Math.PI * 2);
    }

    updateNanobots() {
        this.nanobots.forEach((bot, index) => {
            // Update position
            bot.x += bot.vx;
            bot.y += bot.vy;

            // Bounce off walls
            if (bot.x < 0 || bot.x > this.canvas.width) bot.vx *= -1;
            if (bot.y < 0 || bot.y > this.canvas.height) bot.vy *= -1;

            // Update quantum phase
            bot.quantumPhase = (bot.quantumPhase + 0.05) % (Math.PI * 2);

            // Check for nearby harmful particles
            const nearbyParticle = this.findNearbyHarmfulParticle(bot);
            if (nearbyParticle && bot.state === 'searching') {
                bot.state = 'cleaning';
                // Try to entangle with nearby bot for efficiency
                this.tryEntangle(bot, index);
            } else if (bot.state === 'cleaning' && !nearbyParticle) {
                bot.state = 'searching';
                bot.entangledWith = null;
            }
        });
    }

    updateParticles() {
        this.particles = this.particles.filter(particle => {
            // Move particles
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // If harmful, check if being cleaned
            if (particle.type === 'harmful') {
                const beingCleaned = this.nanobots.some(bot => {
                    if (bot.state !== 'cleaning') return false;
                    return this.distance(bot, particle) < 20;
                });

                if (beingCleaned) {
                    this.stats.cleanedParticles++;
                    return false;
                }
            }

            return true;
        });
    }

    findNearbyHarmfulParticle(bot) {
        return this.particles.find(p => 
            p.type === 'harmful' && this.distance(bot, p) < 30
        );
    }

    tryEntangle(bot, botIndex) {
        const nearbyBot = this.nanobots.findIndex((other, i) => 
            i !== botIndex && 
            other.state === 'searching' && 
            this.distance(bot, other) < 50
        );

        if (nearbyBot !== -1) {
            bot.entangledWith = nearbyBot;
            this.nanobots[nearbyBot].entangledWith = botIndex;
            this.nanobots[nearbyBot].state = 'cleaning';
            this.stats.quantumEntanglements++;
        }
    }

    distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    updateStats() {
        const activeNanobots = this.nanobots.filter(b => b.state === 'cleaning').length;
        const totalHarmful = this.particles.filter(p => p.type === 'harmful').length;
        
        this.stats.efficiency = Math.round(
            (activeNanobots / (activeNanobots + totalHarmful)) * 100
        ) || 100;

        this.statsDisplay.innerHTML = `
            <div>Nanobots: ${this.nanobots.length}</div>
            <div>Harmful Particles: ${totalHarmful}</div>
            <div>Cleaned: ${this.stats.cleanedParticles}</div>
            <div>Entanglements: ${this.stats.quantumEntanglements}</div>
            <div>Efficiency: ${this.stats.efficiency}%</div>
        `;
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000033';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw quantum field effect
        this.renderQuantumField();

        // Draw particles
        this.renderParticles();

        // Draw nanobots
        this.renderNanobots();

        // Update stats
        this.updateStats();
    }

    renderQuantumField() {
        this.ctx.strokeStyle = `hsla(${(this.quantumState * 180 / Math.PI)}, 100%, 70%, 0.1)`;
        this.ctx.lineWidth = 1;

        for (let x = 0; x < this.canvas.width; x += 20) {
            for (let y = 0; y < this.canvas.height; y += 20) {
                const amplitude = Math.sin(x * 0.02 + y * 0.02 + this.quantumState) * 5;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + amplitude, y + amplitude);
                this.ctx.stroke();
            }
        }
    }

    renderParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.type === 'harmful' ? '#ff3366' : '#666666';
            this.ctx.fill();
        });
    }

    renderNanobots() {
        this.nanobots.forEach(bot => {
            // Draw quantum aura
            this.ctx.beginPath();
            this.ctx.arc(bot.x, bot.y, bot.size + 4 + Math.sin(bot.quantumPhase) * 2, 0, Math.PI * 2);
            this.ctx.strokeStyle = `hsla(${(bot.quantumPhase * 180 / Math.PI)}, 100%, 70%, 0.3)`;
            this.ctx.stroke();

            // Draw bot
            this.ctx.beginPath();
            this.ctx.arc(bot.x, bot.y, bot.size, 0, Math.PI * 2);
            this.ctx.fillStyle = bot.state === 'cleaning' ? '#33ff99' : '#00f0ff';
            this.ctx.fill();

            // Draw entanglement line
            if (bot.entangledWith !== null) {
                const target = this.nanobots[bot.entangledWith];
                this.ctx.beginPath();
                this.ctx.moveTo(bot.x, bot.y);
                this.ctx.lineTo(target.x, target.y);
                this.ctx.strokeStyle = `hsla(${(this.quantumState * 180 / Math.PI)}, 100%, 70%, 0.2)`;
                this.ctx.stroke();
            }
        });
    }

    update() {
        this.updateQuantumState();
        this.updateNanobots();
        this.updateParticles();
    }

    animate() {
        if (!this.running) return;
        
        this.update();
        this.render();
        requestAnimationFrame(() => this.animate());
    }

    static mount(container) {
        return new QuantumNanobotSim(container);
    }
}
