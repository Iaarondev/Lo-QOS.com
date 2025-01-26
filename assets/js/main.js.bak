document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeSphericalParticles();
    initializeSphericalAnimations();
    initializeStaking();
    initializeDEX();
    initializeProtocolDemo();
    initializeThemeToggle();
    initializeNotifications();
});

// Spherical Particles Animation
function initializeSphericalParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: '#00e5ff',
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.8,
                    random: false,
                },
                size: {
                    value: 4,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6200ea',
                    opacity: 0.6,
                    width: 2,
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse',
                    },
                    onclick: {
                        enable: true,
                        mode: 'push',
                    },
                    resize: true,
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                    push: {
                        particles_nb: 4,
                    },
                },
            },
            retina_detect: true,
        });
    }
}

// Spherical Animations
function initializeSphericalAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('spherical-animation');
                element.style.animationDelay = `${Math.random() * 0.5}s`;
            }
        });
    }, {
        threshold: 0.1,
    });

    document.querySelectorAll('.feature-card, .reward-card, .stat').forEach((card) => {
        observer.observe(card);
    });
}

// Add a spherical hover effect for buttons
document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.cta-primary, .cta-secondary, .feature-card');
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const radius = Math.sqrt(x * x + y * y);
        const intensity = Math.min(1, Math.max(0.2, 1 - radius / (rect.width / 2)));
        el.style.boxShadow = `0 0 ${20 * intensity}px ${intensity}px rgba(0, 229, 255, ${intensity})`;
    });
});

// Terminal Demo
function initializeProtocolDemo() {
    const terminal = document.querySelector('.protocol-terminal');
    if (terminal) {
        const commands = [
            { text: '$ loqos init quantum-app', delay: 1000 },
            { text: 'Initializing quantum environment...', delay: 1500 },
            { text: 'Setting up AI interaction core...', delay: 2000 },
            { text: 'AI is operational.', delay: 1200 },
        ];

        typeCommands(terminal, commands);
    }
}

function typeCommands(terminal, commands, index = 0) {
    if (index < commands.length) {
        const command = commands[index];
        const line = document.createElement('div');
        line.className = 'command-line';

        if (command.text.startsWith('$')) {
            line.innerHTML = `<span class="prompt">$</span> ${command.text.slice(2)}`;
        } else {
            line.textContent = command.text;
        }

        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;

        setTimeout(() => typeCommands(terminal, commands, index + 1), command.delay);
    }
}