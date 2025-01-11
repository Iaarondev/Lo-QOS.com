// QuantumClock.js (continued)
class QuantumClock {
  constructor() {
    this.quantumState = 0;
    this.coherence = 1;
    this.particles = [];
    this.canvas = document.querySelector(".particle-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.mode = "normal";
    this.isClockHovered = false;
    this.zkpState = 0;
    this.domElements = {};
    this.initialize();
  }

  initialize() {
    this.setupCanvas();
    this.createHourMarkers();
    this.cacheDOM();
    this.setupEventListeners();

    // Separate update loops for different components
    this.startClockUpdates();
    this.startMetersUpdate();
    this.animate();
  }

  cacheDOM() {
    // Cache all frequently accessed DOM elements
    this.domElements = {
      timeDisplay: document.querySelector(".digital-time"),
      quantumValue: document.getElementById("quantum-value"),
      particleCount: document.getElementById("particle-count"),
      coherenceValue: document.getElementById("coherence-value"),
      quantumProgress: document.getElementById("quantum-progress"),
      quantumPercent: document.getElementById("quantum-meter-percent"),
      coherenceProgress: document.getElementById("coherence-progress"),
      coherenceMeterValue: document.getElementById("coherence-meter-value"),
      particleProgress: document.getElementById("particle-progress"),
      particleMeterValue: document.getElementById("particle-meter-value"),
      zkpIndicators: document.querySelectorAll(".zkp-indicator"),
    };
  }

  startClockUpdates() {
    setInterval(() => this.updateClock(), 1000);
  }

  startMetersUpdate() {
    setInterval(() => {
      this.updateMeters();
      this.updateDisplays(new Date());
    }, 100);
  }

  setupCanvas() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createHourMarkers() {
    const markers = document.querySelector(".hour-markers");
    for (let i = 0; i < 12; i++) {
      const marker = document.createElement("div");
      marker.className = "hour-marker";
      marker.style.transform = `rotate(${i * 30}deg)`;
      markers.appendChild(marker);
    }
  }

  setupEventListeners() {
    const clock = document.querySelector(".quantum-clock");
    clock.addEventListener("mouseenter", () => {
      this.isClockHovered = true;
      this.coherence = Math.min(
        CONFIG.QUANTUM.MAX_COHERENCE,
        this.coherence + 0.2
      );
    });

    clock.addEventListener("mouseleave", () => {
      this.isClockHovered = false;
    });

    clock.addEventListener("click", () => {
      this.spawnParticles(20);
    });

    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".mode-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.mode = btn.dataset.mode;
        this.particles.forEach((p) => (p.mode = this.mode));
      });
    });
  }

  calculateZKPState(hours, minutes) {
    const totalMinutes = hours * 60 + minutes;
    const dayProgress = totalMinutes / (24 * 60);

    if (dayProgress < CONFIG.ZKP.STATE_0_THRESHOLD) return 0;
    if (dayProgress < CONFIG.ZKP.STATE_05_THRESHOLD) return 0.5;
    return 1;
  }

  spawnParticles(count) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const particle = new Particle(centerX, centerY, this.quantumState);
      particle.mode = this.mode;
      this.particles.push(particle);
    }
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Update quantum state
    this.quantumState =
      (this.quantumState + CONFIG.QUANTUM.STATE_CHANGE_RATE) % 1;

    if (!this.isClockHovered) {
      this.coherence = Math.max(
        CONFIG.QUANTUM.MIN_COHERENCE,
        this.coherence - 0.01
      );
    }

    // Calculate ZKP state
    this.zkpState = this.calculateZKPState(now.getHours(), minutes);

    const quantumEffect =
      Math.sin(this.quantumState * Math.PI * 2) *
      CONFIG.QUANTUM.EFFECT_MULTIPLIER *
      this.coherence;

    // Update clock hands
    this.updateHand("hour-hand", hours * 30 + minutes * 0.5 + quantumEffect);
    this.updateHand("minute-hand", minutes * 6 + quantumEffect);
    this.updateHand("second-hand", seconds * 6 + quantumEffect);

    // Spawn particles based on quantum state
    if (Math.random() < this.quantumState * 0.3 * (1 + this.zkpState)) {
      this.spawnParticles(1 + Math.floor(this.zkpState * 2));
    }
  }

  updateDisplays(now) {
    const { timeDisplay, quantumValue, particleCount, coherenceValue } =
      this.domElements;

    if (timeDisplay) timeDisplay.textContent = now.toLocaleTimeString();
    if (quantumValue) quantumValue.textContent = this.quantumState.toFixed(3);
    if (particleCount)
      particleCount.textContent = this.particles.length.toString();
    if (coherenceValue)
      coherenceValue.textContent = `${(this.coherence * 100).toFixed(0)}%`;
  }

  updateMeters() {
    const {
      quantumProgress,
      quantumPercent,
      coherenceProgress,
      coherenceMeterValue,
      particleProgress,
      particleMeterValue,
    } = this.domElements;

    // Update quantum progress
    if (quantumProgress) {
      const circumference = 339.292;
      quantumProgress.style.strokeDashoffset =
        circumference - this.quantumState * circumference;
    }

    if (quantumPercent) {
      quantumPercent.textContent = `${(this.quantumState * 100).toFixed(0)}%`;
    }

    // Update coherence meter
    if (coherenceProgress && coherenceMeterValue) {
      coherenceProgress.style.width = `${this.coherence * 100}%`;
      coherenceMeterValue.textContent = `${(this.coherence * 100).toFixed(0)}%`;
    }

    // Update particle meter
    const particlePercentage = Math.min(this.particles.length / 100, 1) * 100;
    if (particleProgress) {
      particleProgress.style.width = `${particlePercentage}%`;
    }
    if (particleMeterValue) {
      particleMeterValue.textContent = this.particles.length.toString();
    }

    this.updateZKPIndicators();
  }

  updateZKPIndicators() {
    this.domElements.zkpIndicators.forEach((indicator) => {
      const state = parseFloat(indicator.dataset.state);
      indicator.className = `zkp-indicator ${
        state === this.zkpState ? "active" : ""
      }`;
    });
  }

  updateHand(className, degrees) {
    const hand = document.querySelector(`.${className}`);
    if (hand) {
      hand.style.transform = `rotate(${degrees}deg) translateX(-50%)`;
      hand.style.boxShadow = `0 0 ${
        10 * this.quantumState * this.coherence
      }px rgba(99, 102, 241, 0.6)`;
    }
  }

  animate() {
    // Create particle trails with reduced alpha
    this.ctx.fillStyle = `rgba(10, 10, 31, 0.1)`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles = this.particles.filter((p) => p.life > 0);
    this.particles.forEach((particle) => {
      particle.quantumState = this.quantumState;
      particle.update();
      particle.draw(this.ctx);
    });

    requestAnimationFrame(() => this.animate());
  }
}
