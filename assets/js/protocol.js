// Lo-QOS Protocol Manager with Enhanced Features
export default class ProtocolManager {
  constructor() {
    this.protocolEnabled = true;
    this.allowedProtocols = new Set(['loqos', 'qos']);
    this.basePath = '/quantum';
    this.init();
  }

  init() {
    this.loadPreference();
    this.bindElements();
    this.setupNotifications();
  }

  bindElements() {
    // Protocol links handler
    document.querySelectorAll('[data-protocol-link]').forEach(link => {
      link.addEventListener('click', this.handleProtocolLink.bind(this));
    });

    // Toggle switch
    this.toggleElement = document.getElementById('protocol-toggle');
    if (this.toggleElement) {
      this.toggleElement.checked = this.protocolEnabled;
      this.toggleElement.addEventListener('change', this.handleToggle.bind(this));
      
      // Add accessibility features
      this.toggleElement.setAttribute('role', 'switch');
      this.toggleElement.setAttribute(
        'aria-label', 
        'Quantum Protocol Navigation Toggle'
      );
    }
  }

  setupNotifications() {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.className = 'protocol-notifications';
    document.body.appendChild(this.notificationContainer);
  }

  handleToggle(event) {
    this.protocolEnabled = event.target.checked;
    this.savePreference();
    this.showNotification(
      `Quantum protocol navigation ${this.protocolEnabled ? 'enabled' : 'disabled'}`
    );
  }

  async handleProtocolLink(event) {
    event.preventDefault();
    const target = event.currentTarget;
    const originalUrl = target.getAttribute('href');
    
    try {
      const { protocol, pathname } = this.parseUrl(originalUrl);
      
      if (this.protocolEnabled && this.allowedProtocols.has(protocol)) {
        await this.handleQuantumProtocol(protocol, pathname);
      } else {
        this.handleTraditionalNavigation(pathname);
      }
    } catch (error) {
      console.error('Protocol navigation error:', error);
      this.showNotification('Navigation failed: Invalid quantum path', 'error');
      this.fallbackNavigation(originalUrl);
    }
  }

  parseUrl(url) {
    const parsed = new URL(url, window.location.href);
    return {
      protocol: parsed.protocol.replace(':', ''),
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash
    };
  }

  async handleQuantumProtocol(protocol, path) {
    if (!this.isProtocolRegistered(protocol)) {
      throw new Error(`Protocol handler not registered for ${protocol}`);
    }

    this.showNotification(`Initializing quantum channel: ${protocol}://${path}`);
    
    try {
      // Simulate quantum protocol handshake
      const result = await this.quantumHandshake(protocol, path);
      
      if (result.success) {
        this.updateQuantumState(path);
      } else {
        throw new Error('Quantum handshake failed');
      }
    } catch (error) {
      console.error('Quantum protocol error:', error);
      this.showNotification('Quantum connection failed', 'error');
      throw error;
    }
  }

  handleTraditionalNavigation(path) {
    const safePath = this.sanitizePath(path);
    const fullPath = `${this.basePath}${safePath}`;
    
    if (this.validatePath(fullPath)) {
      window.location.href = fullPath;
    } else {
      this.fallbackNavigation(fullPath);
    }
  }

  quantumHandshake(protocol, path) {
    return new Promise((resolve, reject) => {
      // Simulated quantum protocol implementation
      setTimeout(() => {
        Math.random() > 0.1 ? 
          resolve({ success: true }) : 
          reject(new Error('Quantum network timeout'));
      }, 300);
    });
  }

  // Security and validation methods
  sanitizePath(path) {
    return path.replace(/[^a-zA-Z0-9-_\/]/g, '');
  }

  validatePath(path) {
    const validPaths = /^\/([\w-]+\/)*[\w-]+$/;
    return validPaths.test(path);
  }

  fallbackNavigation(originalUrl) {
    this.showNotification('Falling back to traditional navigation');
    window.location.href = originalUrl.replace(/^\w+:\/\//, '/');
  }

  // UI methods
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `protocol-notification ${type}`;
    notification.textContent = message;
    
    this.notificationContainer.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  // State management
  savePreference() {
    localStorage.setItem('qos-protocol-enabled', this.protocolEnabled);
  }

  loadPreference() {
    const stored = localStorage.getItem('qos-protocol-enabled');
    this.protocolEnabled = stored !== null ? JSON.parse(stored) : true;
  }

  // Protocol detection
  isProtocolRegistered(protocol) {
    // Basic protocol registration check
    try {
      navigator.registerProtocolHandler(
        protocol,
        `${window.location.origin}/quantum?uri=%s`,
        'Quantum OS Handler'
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  updateQuantumState(path) {
    // Quantum state management logic
    window.dispatchEvent(new CustomEvent('quantum-navigation', {
      detail: { path }
    }));
  }
}

// Initialize protocol manager
document.addEventListener('DOMContentLoaded', () => {
  const protocolManager = new ProtocolManager();
});

// CSS for notifications (should be in separate stylesheet)
const protocolStyles = `
.protocol-notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  max-width: 300px;
}

.protocol-notification {
  padding: 12px 18px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: rgba(0, 180, 216, 0.9);
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

.protocol-notification.error {
  background: rgba(244, 67, 54, 0.9);
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = protocolStyles;
document.head.appendChild(styleSheet);
