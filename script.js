// Section Manager Class
var SectionManager = /** @class */ (function () {
    function SectionManager() {
        this.sections = new Map([
            ['skills', { id: 'skills-section', isVisible: true, element: null }],
            ['education', { id: 'education-section', isVisible: true, element: null }],
            ['projects', { id: 'projects-section', isVisible: true, element: null }]
        ]);
        this.initializeSections();
        this.setupEventListeners();
    }
    SectionManager.prototype.initializeSections = function () {
        this.sections.forEach(function (section, key) {
            section.element = document.getElementById(section.id);
        });
    };
    SectionManager.prototype.setupEventListeners = function () {
        var _this = this;
        // Setup individual toggle buttons
        this.sections.forEach(function (section, key) {
            var button = document.getElementById("toggle".concat(key.charAt(0).toUpperCase() + key.slice(1)));
            if (button) {
                button.addEventListener('click', function () { return _this.toggleSection(key); });
            }
        });
        // Setup toggle all button
        var toggleAllButton = document.getElementById('toggleAll');
        if (toggleAllButton) {
            toggleAllButton.addEventListener('click', function () { return _this.toggleAllSections(); });
        }
    };
    SectionManager.prototype.toggleSection = function (sectionKey) {
        var section = this.sections.get(sectionKey);
        if (section && section.element) {
            section.isVisible = !section.isVisible;
            section.element.classList.toggle('hidden-section');
            // Animate the transition
            if (section.isVisible) {
                section.element.style.animation = 'sectionSlideIn 0.5s ease-out';
            }
        }
    };
    SectionManager.prototype.toggleAllSections = function () {
        var allVisible = Array.from(this.sections.values()).every(function (section) { return section.isVisible; });
        this.sections.forEach(function (section, key) {
            if (section.element) {
                section.isVisible = !allVisible;
                section.element.classList.toggle('hidden-section', allVisible);
            }
        });
    };
    return SectionManager;
}());
// Theme Manager Class
var ThemeManager = /** @class */ (function () {
    function ThemeManager() {
        this.isDark = false;
        this.body = document.body;
        this.setupThemeToggle();
    }
    ThemeManager.prototype.setupThemeToggle = function () {
        var _this = this;
        var themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', function () { return _this.toggleTheme(); });
        }
    };
    ThemeManager.prototype.toggleTheme = function () {
        this.isDark = !this.isDark;
        this.body.classList.toggle('theme-dark');
        // Save theme preference
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    };
    return ThemeManager;
}());
// Animation Manager Class
var AnimationManager = /** @class */ (function () {
    function AnimationManager() {
        this.isEnabled = true;
        this.setupAnimationToggle();
    }
    AnimationManager.prototype.setupAnimationToggle = function () {
        var _this = this;
        var animationToggle = document.getElementById('animationToggle');
        if (animationToggle) {
            animationToggle.addEventListener('change', function () { return _this.toggleAnimations(); });
        }
    };
    AnimationManager.prototype.toggleAnimations = function () {
        var _this = this;
        this.isEnabled = !this.isEnabled;
        document.body.style.setProperty('--animation-enabled', this.isEnabled ? '1' : '0');
        // Toggle animation classes
        var animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(function (element) {
            element.classList.toggle('no-animation', !_this.isEnabled);
        });
    };
    return AnimationManager;
}());
// Profile Picture Manager
var ProfilePictureManager = /** @class */ (function () {
    function ProfilePictureManager() {
        this.profilePic = document.querySelector('.profile-pic');
        this.setupProfileInteraction();
    }
    ProfilePictureManager.prototype.setupProfileInteraction = function () {
        var _this = this;
        if (this.profilePic) {
            this.profilePic.addEventListener('click', function () { return _this.handleProfileClick(); });
            this.profilePic.addEventListener('mouseenter', function () { return _this.handleProfileHover(); });
        }
    };
    ProfilePictureManager.prototype.handleProfileClick = function () {
        var _this = this;
        if (this.profilePic) {
            this.profilePic.style.transform = 'scale(1.5) rotateY(180deg)';
            setTimeout(function () {
                if (_this.profilePic) {
                    _this.profilePic.style.transform = 'scale(1) rotateY(0deg)';
                }
            }, 1000);
        }
    };
    ProfilePictureManager.prototype.handleProfileHover = function () {
        if (this.profilePic) {
            this.profilePic.style.transition = 'transform 0.3s ease';
            this.profilePic.style.transform = 'scale(1.1)';
        }
    };
    return ProfilePictureManager;
}());
// Initialize all managers when document is loaded
document.addEventListener('DOMContentLoaded', function () {
    var sectionManager = new SectionManager();
    var themeManager = new ThemeManager();
    var animationManager = new AnimationManager();
    var profileManager = new ProfilePictureManager();
});
