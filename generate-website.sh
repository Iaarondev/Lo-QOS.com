#!/bin/bash

# Create directory structure
mkdir -p assets/{css,js,images} pages/{docs,tutorials,features} components

# Create index.html
cat > index.html << 'ENDFILE'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lo-QOS - Quantum Operating System</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="header-content">
            <h1>Lo-QOS</h1>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="pages/features/staking.html">Staking</a></li>
                    <li><a href="pages/features/dex.html">DEX</a></li>
                    <li><a href="pages/features/marketplace.html">Marketplace</a></li>
                    <li><a href="pages/docs/api.html">API</a></li>
                    <li><a href="pages/tutorials/getting-started.html">Get Started</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <section class="hero">
            <h2>Welcome to Lo-QOS</h2>
            <p>The next-generation quantum-ready operating system with integrated AI, blockchain, and distributed computing capabilities.</p>
            <div class="stats-container">
                <div class="stat">
                    <span class="stat-value">12%</span>
                    <span class="stat-label">Max Staking APY</span>
                </div>
                <div class="stat">
                    <span class="stat-value">0.1%</span>
                    <span class="stat-label">DEX Fees</span>
                </div>
                <div class="stat">
                    <span class="stat-value">4</span>
                    <span class="stat-label">Blockchain Layers</span>
                </div>
            </div>
            <div class="cta-buttons">
                <a href="pages/tutorials/getting-started.html" class="cta-primary">Get Started</a>
                <a href="pages/features/staking.html" class="cta-secondary">Start Staking</a>
            </div>
            <div class="quantum-particles" id="particles-js"></div>
        </section>

        <section class="features">
            <h3>Core Features</h3>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon staking-icon"></div>
                    <h4>Staking</h4>
                    <p>Earn up to 12% APY with flexible lock periods and automatic compounding.</p>
                    <a href="pages/features/staking.html" class="feature-link">Learn More</a>
                </div>
                <div class="feature-card">
                    <div class="feature-icon dex-icon"></div>
                    <h4>DEX Trading</h4>
                    <p>Trade with minimal fees and AI-optimized routing across multiple chains.</p>
                    <a href="pages/features/dex.html" class="feature-link">Start Trading</a>
                </div>
                <div class="feature-card">
                    <div class="feature-icon marketplace-icon"></div>
                    <h4>dApp Marketplace</h4>
                    <p>Discover and deploy quantum-ready applications for your needs.</p>
                    <a href="pages/features/marketplace.html" class="feature-link">Explore Apps</a>
                </div>
                <div class="feature-card">
                    <div class="feature-icon mining-icon"></div>
                    <h4>Quantum Mining</h4>
                    <p>Contribute computing power and earn rewards through quantum-safe mining.</p>
                    <a href="pages/features/mining.html" class="feature-link">Start Mining</a>
                </div>
            </div>
        </section>

        <section class="rewards">
            <h3>Reward Structure</h3>
            <div class="rewards-grid">
                <div class="reward-card">
                    <h4>Validators</h4>
                    <p class="reward-percentage">60%</p>
                    <ul>
                        <li>Network validation</li>
                        <li>Block production</li>
                        <li>Quantum computations</li>
                    </ul>
                </div>
                <div class="reward-card">
                    <h4>Miners</h4>
                    <p class="reward-percentage">30%</p>
                    <ul>
                        <li>Resource provision</li>
                        <li>Storage contribution</li>
                        <li>Computational power</li>
                    </ul>
                </div>
                <div class="reward-card">
                    <h4>Treasury</h4>
                    <p class="reward-percentage">10%</p>
                    <ul>
                        <li>Development fund</li>
                        <li>Community grants</li>
                        <li>Protocol upgrades</li>
                    </ul>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h4>Core Features</h4>
                <ul>
                    <li><a href="pages/features/staking.html">Staking</a></li>
                    <li><a href="pages/features/mining.html">Mining</a></li>
                    <li><a href="pages/features/dex.html">DEX</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Resources</h4>
                <ul>
                    <li><a href="pages/docs/api.html">API Documentation</a></li>
                    <li><a href="pages/docs/sdk.html">SDK Guide</a></li>
                    <li><a href="pages/tutorials">Tutorials</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Community</h4>
                <ul>
                    <li><a href="pages/governance.html">Governance</a></li>
                    <li><a href="pages/ecosystem.html">Ecosystem</a></li>
                    <li><a href="pages/contribute.html">Contribute</a></li>
                </ul>
            </div>
        </div>
        <p class="copyright">&copy; 2025 Lo-QOS. All rights reserved.</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
ENDFILE

# Create styles.css
cat > assets/css/styles.css << 'ENDFILE'
:root {
    --primary-color: #6200ea;
    --secondary-color: #00e5ff;
    --background-color: #0a0a1a;
    --text-color: #ffffff;
    --accent-color: #7b2cbf;
    --card-bg: rgba(255, 255, 255, 0.05);
    --hover-color: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

header {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

nav ul {
    display: flex;
    justify-content: center;
    gap: 2rem;
    list-style: none;
}

nav a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

nav a:hover {
    background: var(--hover-color);
}

.hero {
    text-align: center;
    padding: 6rem 2rem;
    position: relative;
    overflow: hidden;
}

.stats-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
}

.stat {
    background: var(--card-bg);
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
}

.stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--secondary-color);
    display: block;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.feature-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    background: var(--accent-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rewards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.reward-card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.reward-percentage {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--secondary-color);
    margin: 1rem 0;
}

.reward-card ul {
    list-style: none;
    text-align: left;
    margin-top: 1rem;
}

.reward-card li {
    padding: 0.5rem 0;
    opacity: 0.8;
}

footer {
    background: linear-gradient(to top, var(--background-color), transparent);
    padding: 4rem 2rem 2rem;
    margin-top: 4rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        text-align: center;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
        padding: 1rem;
    }

    .stats-container {
        flex-direction: column;
        align-items: center;
    }
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}
ENDFILE

# Create main.js
cat > assets/js/main.js << 'ENDFILE'
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
ENDFILE

# Create feature-specific pages
mkdir -p pages/features

# Create staking page
cat > pages/features/staking.html << 'ENDFILE'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Staking - Lo-QOS</title>
    <link rel="stylesheet" href="../../assets/css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <!-- Navigation -->
    </header>
    <main>
        <section class="staking-hero">
            <h2>Staking Rewards</h2>
            <div class="staking-stats">
                <div class="stat-card">
                    <h3>Base APY</h3>
                    <p>8-12%</p>
                </div>
                <div class="stat-card">
                    <h3>Validator Returns</h3>
                    <p>15-20%</p>
                </div>
                <div class="stat-card">
                    <h3>Total Staked</h3>
                    <p class="live-stat" id="total-staked">Loading...</p>
                </div>
            </div>
        </section>
        <!-- Additional staking content -->
    </main>
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
ENDFILE

# Create DEX page
cat > pages/features/dex.html << 'ENDFILE'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DEX - Lo-QOS</title>
    <link rel="stylesheet" href="../../assets/css/styles.css">
</head>
<body>
    <header>
        <!-- Navigation -->
    </header>
    <main>
        <section class="dex-hero">
            <h2>Decentralized Exchange</h2>
            <div class="dex-stats">
                <div class="stat-card">
                    <h3>Trading Fee</h3>
                    <p>0.1%</p>
                </div>
                <div class="stat-card">
                    <h3>24h Volume</h3>
                    <p class="live-stat" id="daily-volume">Loading...</p>
                </div>
                <div class="stat-card">
                    <h3>TVL</h3>
                    <p class="live-stat" id="tvl">Loading...</p>
                </div>
            </div>
        </section>
        <!-- Additional DEX content -->
    </main>
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
ENDFILE

# Create marketplace page
cat > pages/features/marketplace.html << 'ENDFILE'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace - Lo-QOS</title>
    <link rel="stylesheet" href="../../assets/css/styles.css">
</head>
<body>
    <header>
        <!-- Navigation -->
    </header>
    <main>
        <section class="marketplace-hero">
            <h2>dApp Marketplace</h2>
            <div class="category-grid">
                <div class="category-card">
                    <h3>DeFi</h3>
                    <p>Decentralized Finance Applications</p>
                </div>
                <div class="category-card">
                    <h3>Gaming</h3>
                    <p>Blockchain Games</p>
                </div>
                <div class="category-card">
                    <h3>NFTs</h3>
                    <p>Digital Collectibles</p>
                </div>
                <div class="category-card">
                    <h3>Tools</h3>
                    <p>Development Tools</p>
                </div>
            </div>
        </section>
        <!-- Additional marketplace content -->
    </main>
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
ENDFILE

# Create protocols page
cat > pages/features/protocols.html << 'ENDFILE'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Protocols - Lo-QOS</title>
    <link rel="stylesheet" href="../../assets/css/styles.css">
</head>
<body>
    <header>
        <!-- Navigation -->
    </header>
    <main>
        <section class="protocols-hero">
            <h2>Custom Protocols</h2>
            <div class="protocol-grid">
                <div class="protocol-card">
                    <h3>loqos://</h3>
                    <p>Core System Protocol</p>
                    <code>loqos://app/launch</code>
                </div>
                <div class="protocol-card">
                    <h3>loqos://dex</h3>
                    <p>Trading Protocol</p>
                    <code>loqos://dex/trade</code>
                </div>
                <div class="protocol-card">
                    <h3>loqos://quantum</h3>
                    <p>Quantum Computing Protocol</p>
                    <code>loqos://quantum/execute</code>
                </div>
            </div>
        </section>
        <!-- Additional protocols content -->
    </main>
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
ENDFILE

# Add feature-specific styles
cat >> assets/css/styles.css << 'ENDFILE'
/* Feature pages specific styles */
.staking-hero,
.dex-hero,
.marketplace-hero,
.protocols-hero {
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                url('../../assets/images/feature-bg.jpg') center/cover;
}

.protocol-grid,
.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.protocol-card,
.category-card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s;
}

.protocol-card:hover,
.category-card:hover {
    transform: translateY(-5px);
}

.protocol-card code {
    display: block;
    padding: 1rem;
    background: rgba(0,0,0,0.3);
    border-radius: 5px;
    margin-top: 1rem;
    font-family: 'Fira Code', monospace;
}

/* Additional styles for other feature pages */
ENDFILE

# Add feature-specific JavaScript
cat >> assets/js/main.js << 'ENDFILE'

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
ENDFILE

echo "Lo-QOS website generated successfully!"