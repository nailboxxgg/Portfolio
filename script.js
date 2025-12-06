// ============================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', initApp);

// ============================================
// INITIALIZATION
// ============================================
function initApp() {
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initCustomCursor();
    initHeaderScroll();
    initTypingEffect();
    setDynamicYear();
}

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const isLight = body.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';

        if (isLight) {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'light');
        }

        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Move cursor on mouse move
    window.addEventListener('mousemove', (e) => {
        const { clientX: posX, clientY: posY } = e;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Cursor hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const SCROLL_THRESHOLD = 50;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > SCROLL_THRESHOLD;

        header.style.boxShadow = scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : 'none';
        header.style.padding = scrolled ? '0.5rem 0' : '1rem 0';
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const TEXT = 'Building digital experiences that matter.';
    const element = document.querySelector('.hero-subtitle');
    const TYPING_SPEED = 100;
    const INITIAL_DELAY = 1000;

    element.textContent = '';
    let charIndex = 0;

    function typeCharacter() {
        if (charIndex < TEXT.length) {
            element.textContent += TEXT.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, TYPING_SPEED);
        }
    }

    setTimeout(typeCharacter, INITIAL_DELAY);
}

// ============================================
// UTILITIES
// ============================================
function setDynamicYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
