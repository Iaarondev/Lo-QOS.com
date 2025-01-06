document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
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

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.feature-card, .reward-card').forEach(card => {
        observer.observe(card);
    });

    // Add header scroll effect
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
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// Feature page specific functionality
function initializeFeaturePages() {
    // Staking page
    const totalStaked = document.getElementById('total-staked');
    if (totalStaked) {
        // Simulate live data
        setInterval(() => {
            totalStaked.textContent = `${Math.floor(Math.random() * 1000000)} LQS`;
        }, 5000);
    }

    // DEX page
    const dailyVolume = document.getElementById('daily-volume');
    const tvl = document.getElementById('tvl');
    if (dailyVolume && tvl) {
        // Simulate live data
        setInterval(() => {
            dailyVolume.textContent = `$${Math.floor(Math.random() * 1000000)}`;
            tvl.textContent = `$${Math.floor(Math.random() * 10000000)}`;
        }, 5000);
    }
}

// Initialize feature pages when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFeaturePages);
