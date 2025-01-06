// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeParticles();
    initializeAnimations();
    initializeCharts();
    initializeStaking();
    initializeDEX();
    initializeProtocolDemo();
    initializeThemeToggle();
    initializeNotifications();
});

// Particles background
function initializeParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00e5ff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00e5ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.feature-card, .reward-card, .stat, .protocol-card').forEach(card => {
        observer.observe(card);
    });
}

// Staking functionality
function initializeStaking() {
    const stakingStats = document.querySelectorAll('.live-stat');
    if (stakingStats.length) {
        updateStakingStats();
        setInterval(updateStakingStats, 5000);
    }
}

function updateStakingStats() {
    // Simulate live data updates
    const totalStaked = Math.floor(Math.random() * 1000000);
    const apy = (8 + Math.random() * 4).toFixed(2);
    
    document.querySelectorAll('[data-stat="total-staked"]').forEach(el => {
        el.textContent = `${totalStaked.toLocaleString()} LQS`;
    });
    
    document.querySelectorAll('[data-stat="current-apy"]').forEach(el => {
        el.textContent = `${apy}%`;
    });
}

// DEX Trading interface
function initializeDEX() {
    const tradingForm = document.querySelector('.trading-form');
    if (tradingForm) {
        tradingForm.addEventListener('submit', handleTrade);
        initializePriceChart();
    }
}

function initializePriceChart() {
    const chartArea = document.querySelector('.chart-area');
    if (chartArea) {
        // Initialize trading chart here
        // Example using a canvas or third-party charting library
    }
}

function handleTrade(e) {
    e.preventDefault();
    // Handle trade submission
    showNotification('Trade executed successfully!', 'success');
}

// Protocol Demo
function initializeProtocolDemo() {
    const terminal = document.querySelector('.protocol-terminal');
    if (terminal) {
        const commands = [
            { text: '$ loqos init quantum-app', delay: 1000 },
            { text: 'Initializing quantum environment...', delay: 2000 },
            { text: 'Setting up quantum gates...', delay: 1500 },
            { text: 'Quantum environment ready!', delay: 1000 },
            { text: '$ loqos run --quantum', delay: 1500 },
            { text: 'Running quantum application...', delay: 2000 }
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

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Notifications
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info') {
    const container = document.querySelector('.notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Marketplace functionality
function initializeMarketplace() {
    const filters = document.querySelectorAll('.filter-button');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            filterMarketplaceItems(filter.dataset.filter);
        });
    });
}

function filterMarketplaceItems(category) {
    const items = document.querySelectorAll('.marketplace-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Helper functions
function formatNumber(num) {
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}