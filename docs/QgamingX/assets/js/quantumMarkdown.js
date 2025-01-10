// Utility Functions
function createGradient(ctx, x, y, radius) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    return gradient;
}

// Quantum Animation System with Markdown Integration
class QuantumMarkdownSystem {
    constructor(canvas, markdownFiles) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.markdownFiles = markdownFiles; // Array of .md files
        this.particles = [];
        this.quantumState = 0;

        this.resizeCanvas();
        this.initializeParticles();
        this.startAnimation();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    initializeParticles() {
        const particleCount = Math.min(this.canvas.width, this.canvas.height) / 10;

        for (let i = 0; i < particleCount; i++) {
            const isMarkdown = i < this.markdownFiles.length;

            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                markdown: isMarkdown ? this.markdownFiles[i] : null, // Attach .md file
                quantumScale: isMarkdown ? Math.random() * 0.6 : Math.random(), // Quantum scale up to 0.6
            });
        }
    }

    updateParticles() {
        this.particles.forEach((particle) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Adjust size based on quantum scale
            if (particle.markdown) {
                particle.size = 2 + Math.sin(this.quantumState * Math.PI * 2) * particle.quantumScale * 5;
            }
        });
    }

    drawParticles() {
        this.particles.forEach((particle) => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

            // Special styling for markdown particles
            if (particle.markdown) {
                this.ctx.fillStyle = `rgba(255, 215, 0, ${0.7 + Math.sin(this.quantumState * Math.PI * 2) * 0.3})`;
            } else {
                this.ctx.fillStyle = `rgba(59, 130, 246, 0.7)`;
            }

            this.ctx.fill();

            // Display markdown filenames
            if (particle.markdown && particle.size > 4) {
                this.ctx.font = '12px Arial';
                this.ctx.fillStyle = '#fff';
                this.ctx.fillText(particle.markdown, particle.x + 5, particle.y - 5);
            }
        });
    }

    drawQuantumField() {
        const { width, height } = this.canvas;
        const gradient = createGradient(this.ctx, width / 2, height / 2, Math.min(width, height) / 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
    }

    startAnimation() {
        const animate = () => {
            this.quantumState += 0.01;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.updateParticles();
            this.drawParticles();
            this.drawQuantumField();

            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Fetch Markdown Files from GitHub
async function fetchMarkdownFiles() {
    const markdownUrl = 'https://api.github.com/repos/Iaarondev/Lo-QOS.com/contents/docs/QgamingX';
    try {
        const response = await fetch(markdownUrl);
        if (!response.ok) throw new Error('Failed to load markdown files');
        const files = await response.json();
        return files
            .filter((file) => file.name.endsWith('.md'))
            .map((file) => file.name); // Return filenames only
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Quantum Entanglement Mapping
function quantumEntanglementMapping(text, quantumScale) {
    const words = text.split(' ');
    const map = [];
    let sentence = '';
    let paragraph = '';
    let currentScale = 0;

    for (let i = 0; i < words.length; i++) {
        sentence += `${words[i]} `;
        if (sentence.split(' ').length % 5 === 0) {
            paragraph += `${sentence}\n`;
            sentence = '';
        }

        if (paragraph.split('\n').length % 4 === 0 || i === words.length - 1) {
            map.push({
                quantumState: currentScale,
                paragraph,
            });
            paragraph = '';
            currentScale += quantumScale;
        }

        if (currentScale >= 0.6) break; // Stop at quantum scale 0.6
    }

    return map;
}

// Initialize Everything
window.addEventListener('load', async () => {
    // Fetch markdown files
    const markdownFiles = await fetchMarkdownFiles();

    // Hero Canvas Animation
    const heroCanvas = document.getElementById('heroCanvas');
    new QuantumMarkdownSystem(heroCanvas, markdownFiles);

    // Quantum Entanglement Mapping Example
    const exampleText = 'Quantum gaming is the future of gaming where performance meets reality.';
    const entanglementMap = quantumEntanglementMapping(exampleText, 0.1);
    console.log('Quantum Entanglement Map:', entanglementMap);
});