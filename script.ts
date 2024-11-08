
// TypeScript Interfaces
interface Section {
    id: string;
    isVisible: boolean;
    element: HTMLElement | null;
}

interface Theme {
    isDark: boolean;
    toggleTheme: () => void;
}

interface AnimationState {
    isEnabled: boolean;
    toggleAnimations: () => void;
}

// Section Manager Class
class SectionManager {
    private sections: Map<string, Section>;

    constructor() {
        this.sections = new Map([
            ['skills', { id: 'skills-section', isVisible: true, element: null }],
            ['education', { id: 'education-section', isVisible: true, element: null }],
            ['projects', { id: 'projects-section', isVisible: true, element: null }]
        ]);

        this.initializeSections();
        this.setupEventListeners();
    }

    private initializeSections(): void {
        this.sections.forEach((section, key) => {
            section.element = document.getElementById(section.id);
        });
    }

    private setupEventListeners(): void {
        // Setup individual toggle buttons
        this.sections.forEach((section, key) => {
            const button = document.getElementById(`toggle${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (button) {
                button.addEventListener('click', () => this.toggleSection(key));
            }
        });

        // Setup toggle all button
        const toggleAllButton = document.getElementById('toggleAll');
        if (toggleAllButton) {
            toggleAllButton.addEventListener('click', () => this.toggleAllSections());
        }
    }

    public toggleSection(sectionKey: string): void {
        const section = this.sections.get(sectionKey);
        if (section && section.element) {
            section.isVisible = !section.isVisible;
            section.element.classList.toggle('hidden-section');
            
            // Animate the transition
            if (section.isVisible) {
                section.element.style.animation = 'sectionSlideIn 0.5s ease-out';
            }
        }
    }

    public toggleAllSections(): void {
        const allVisible = Array.from(this.sections.values()).every(section => section.isVisible);
        
        this.sections.forEach((section, key) => {
            if (section.element) {
                section.isVisible = !allVisible;
                section.element.classList.toggle('hidden-section', allVisible);
            }
        });
    }
}

// Theme Manager Class
class ThemeManager implements Theme {
    public isDark: boolean = false;
    private body: HTMLElement;

    constructor() {
        this.body = document.body;
        this.setupThemeToggle();
    }

    private setupThemeToggle(): void {
        const themeToggle = document.getElementById('themeToggle') as HTMLInputElement;
        if (themeToggle) {
            themeToggle.addEventListener('change', () => this.toggleTheme());
        }
    }

    public toggleTheme(): void {
        this.isDark = !this.isDark;
        this.body.classList.toggle('theme-dark');
        
        // Save theme preference
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }
}

// Animation Manager Class
class AnimationManager implements AnimationState {
    public isEnabled: boolean = true;

    constructor() {
        this.setupAnimationToggle();
    }

    private setupAnimationToggle(): void {
        const animationToggle = document.getElementById('animationToggle') as HTMLInputElement;
        if (animationToggle) {
            animationToggle.addEventListener('change', () => this.toggleAnimations());
        }
    }

    public toggleAnimations(): void {
        this.isEnabled = !this.isEnabled;
        document.body.style.setProperty('--animation-enabled', this.isEnabled ? '1' : '0');
        
        // Toggle animation classes
        const animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(element => {
            element.classList.toggle('no-animation', !this.isEnabled);
        });
    }
}

// Profile Picture Manager
class ProfilePictureManager {
    private profilePic: HTMLElement | null;

    constructor() {
        this.profilePic = document.querySelector('.profile-pic');
        this.setupProfileInteraction();
    }

    private setupProfileInteraction(): void {
        if (this.profilePic) {
            this.profilePic.addEventListener('click', () => this.handleProfileClick());
            this.profilePic.addEventListener('mouseenter', () => this.handleProfileHover());
        }
    }

    private handleProfileClick(): void {
        if (this.profilePic) {
            this.profilePic.style.transform = 'scale(1.5) rotateY(180deg)';
            setTimeout(() => {
                if (this.profilePic) {
                    this.profilePic.style.transform = 'scale(1) rotateY(0deg)';
                }
            }, 1000);
        }
    }

    private handleProfileHover(): void {
        if (this.profilePic) {
            this.profilePic.style.transition = 'transform 0.3s ease';
            this.profilePic.style.transform = 'scale(1.1)';
        }
    }
}

// Initialize all managers when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sectionManager = new SectionManager();
    const themeManager = new ThemeManager();
    const animationManager = new AnimationManager();
    const profileManager = new ProfilePictureManager();
});
