// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = null;
        this.themes = new Map();
        this.observers = new Set();
    }

    init() {
        // Initialize default themes
        this.initializeDefaultThemes();
        
        // Set up color pickers
        this.initializeColorPickers();
        
        // Load saved theme
        this.loadSavedTheme();
        
        // Set up theme preview
        this.initializePreview();
    }

    initializeDefaultThemes() {
        this.themes.set('quantum-default', {
            primary: '#00b4d8',
            secondary: '#0077b6',
            accent: '#90e0ef',
            dark: '#03045e',
            light: '#caf0f8'
        });

        this.themes.set('quantum-dark', {
            primary: '#2d00f7',
            secondary: '#6a00f4',
            accent: '#8900f2',
            dark: '#1a001a',
            light: '#bc00dd'
        });

        this.themes.set('quantum-light', {
            primary: '#48cae4',
            secondary: '#00b4d8',
            accent: '#90e0ef',
            dark: '#023e8a',
            light: '#caf0f8'
        });
    }

    initializeColorPickers() {
        const pickers = ['primary', 'secondary', 'accent'].map(type => {
            const picker = document.getElementById(`${type}-color`);
            if (picker) {
                picker.addEventListener('input', (e) => {
                    this.updateThemeColor(type, e.target.value);
                });
            }
            return picker;
        });
    }

    initializePreview() {
        const preview = document.querySelector('.theme-preview');
        if (!preview) return;

        // Create color swatches
        const swatches = document.createElement('div');
        swatches.className = 'color-swatches';
        
        ['primary', 'secondary', 'accent', 'dark', 'light'].forEach(type => {
            const swatch = document.createElement('div');
            swatch.className = `color-swatch ${type}`;
            swatch.setAttribute('data-color-type', type);
            swatches.appendChild(swatch);
        });

        preview.appendChild(swatches);
        this.updatePreview();
    }

    updatePreview() {
        if (!this.currentTheme) return;

        const swatches = document.querySelectorAll('.color-swatch');
        swatches.forEach(swatch => {
            const type = swatch.getAttribute('data-color-type');
            swatch.style.backgroundColor = this.currentTheme[type];
        });
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('loqos-theme');
        if (savedTheme) {
            try {
                this.currentTheme = JSON.parse(savedTheme);
                this.applyTheme(this.currentTheme);
            } catch (e) {
                console.error('Error loading saved theme:', e);
                this.resetToDefault();
            }
        } else {
            this.resetToDefault();
        }
    }

    applyTheme(theme) {
        // Update CSS variables
        const root = document.documentElement;
        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--quantum-${key}`, value);
        });

        // Update color pickers
        ['primary', 'secondary', 'accent'].forEach(type => {
            const picker = document.getElementById(`${type}-color`);
            if (picker) picker.value = theme[type];
        });

        // Save theme
        localStorage.setItem('loqos-theme', JSON.stringify(theme));
        
        // Update preview
        this.updatePreview();
        
        // Notify observers
        this.notifyObservers(theme);
    }

    updateThemeColor(type, color) {
        if (!this.currentTheme) return;
        
        this.currentTheme[type] = color;
        this.applyTheme(this.currentTheme);
    }

    generateQuantumTheme() {
        // Generate a quantum-inspired color scheme
        const theme = {
            primary: this.generateQuantumColor(),
            secondary: this.generateQuantumColor(),
            accent: this.generateQuantumColor(),
            dark: this.generateQuantumColor(true),
            light: this.generateQuantumColor(false)
        };

        // Ensure color harmony
        theme.secondary = this.adjustColorHarmony(theme.primary, 30);
        theme.accent = this.adjustColorHarmony(theme.primary, -30);

        this.applyTheme(theme);
    }

    generateQuantumColor(isDark = false) {
        // Generate color based on quantum-inspired algorithm
        const quantum = window.loqos?.quantum;
        let h, s, l;

        if (quantum) {
            // Use quantum state to influence color
            const state = quantum.getCurrentState();
            h = (state.phase % 360);
            s = 50 + (state.amplitude * 50);
            l = isDark ? 20 : 60;
        } else {
            // Fallback to random
            h = Math.random() * 360;
            s = 50 + (Math.random() * 50);
            l = isDark ? 20 : 60;
        }

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    adjustColorHarmony(baseColor, rotation) {
        // Convert color to HSL
        let hsl = this.colorToHSL(baseColor);
        
        // Rotate hue
        hsl.h = (hsl.h + rotation) % 360;
        if (hsl.h < 0) hsl.h += 360;

        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

    colorToHSL(color) {
        // Parse color string to HSL
        let hsl = { h: 0, s: 0, l: 0 };
        
        if (color.startsWith('hsl')) {
            const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (match) {
                [, hsl.h, hsl.s, hsl.l] = match.map(Number);
            }
        } else if (color.startsWith('#')) {
            // Convert hex to HSL
            let r = parseInt(color.slice(1, 3), 16) / 255;
            let g = parseInt(color.slice(3, 5), 16) / 255;
            let b = parseInt(color.slice(5, 7), 16) / 255;
            
            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h *= 60;
            }

            hsl = { h, s: s * 100, l: l * 100 };
        }

        return hsl;
    }

    resetToDefault() {
        const defaultTheme = this.themes.get('quantum-default');
        if (defaultTheme) {
            this.currentTheme = { ...defaultTheme };
            this.applyTheme(this.currentTheme);
        }
    }

    subscribe(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback);
    }

    notifyObservers(theme) {
        this.observers.forEach(callback => callback(theme));
    }
}