// Particle.js
class Particle {
  constructor(x, y, quantumState) {
    this.x = x;
    this.y = y;
    this.size =
      Math.random() * (CONFIG.PARTICLE.MAX_SIZE - CONFIG.PARTICLE.MIN_SIZE) +
      CONFIG.PARTICLE.MIN_SIZE;
    this.speedX =
      Math.random() * (CONFIG.PARTICLE.MAX_SPEED - CONFIG.PARTICLE.MIN_SPEED) +
      CONFIG.PARTICLE.MIN_SPEED;
    this.speedY =
      Math.random() * (CONFIG.PARTICLE.MAX_SPEED - CONFIG.PARTICLE.MIN_SPEED) +
      CONFIG.PARTICLE.MIN_SPEED;
    this.quantumState = quantumState;
    this.hue =
      CONFIG.PARTICLE.BASE_HUE + Math.random() * CONFIG.PARTICLE.HUE_RANGE;
    this.life = 1;
    this.mode = "normal";
    this.zkpState = this.calculateZKPState();
  }

  calculateZKPState() {
    if (this.quantumState < CONFIG.ZKP.STATE_0_THRESHOLD) return 0;
    if (this.quantumState < CONFIG.ZKP.STATE_05_THRESHOLD) return 0.5;
    return 1;
  }

  update() {
    this.zkpState = this.calculateZKPState();

    switch (this.mode) {
      case "normal":
        this.normalBehavior();
        break;
      case "chaos":
        this.chaosBehavior();
        break;
      case "harmony":
        this.harmonyBehavior();
        break;
    }

    this.life -= 0.01 * (1 + this.zkpState * 0.5);
  }

  normalBehavior() {
    this.x += this.speedX * (1 + this.zkpState);
    this.y += this.speedY * (1 + this.zkpState);
  }

  chaosBehavior() {
    const angle = Math.atan2(
      this.y - window.innerHeight / 2,
      this.x - window.innerWidth / 2
    );
    const stateAngle = angle + this.zkpState * Math.PI;
    this.speedX = Math.cos(stateAngle) * (2 + this.zkpState);
    this.speedY = Math.sin(stateAngle) * (2 + this.zkpState);
    this.x += this.speedX;
    this.y += this.speedY;
  }

  harmonyBehavior() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angle = Math.atan2(this.y - centerY, this.x - centerX);
    const targetDistance = 150 + Math.sin(this.zkpState * Math.PI * 2) * 50;
    const easing = 0.05 + this.zkpState * 0.02;

    this.x += (centerX + Math.cos(angle) * targetDistance - this.x) * easing;
    this.y += (centerY + Math.sin(angle) * targetDistance - this.y) * easing;
  }

  draw(ctx) {
    const alpha = this.life * (0.5 + this.zkpState * 0.5);
    const stateHue = this.hue + this.zkpState * 30;
    ctx.fillStyle = `hsla(${stateHue}, 70%, 60%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.size * (1 + this.zkpState * 0.5),
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
