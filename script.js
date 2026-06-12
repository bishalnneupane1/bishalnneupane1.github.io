// Sync --header-height CSS variable so the mobile nav menu top aligns exactly with the header
const headerEl = document.querySelector('header');
function syncHeaderHeight() {
    if (headerEl) {
        document.documentElement.style.setProperty('--header-height', headerEl.getBoundingClientRect().height + 'px');
    }
}
syncHeaderHeight();
window.addEventListener('resize', syncHeaderHeight, { passive: true });

// Enhanced Mobile Navigation Toggle - Clean Version
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Toggle mobile navigation
function toggleMobileNav() {
    syncHeaderHeight();
    const willOpen = !navMenu.classList.contains('active');

    hamburger.classList.toggle('active', willOpen);
    navMenu.classList.toggle('active', willOpen);
    body.classList.toggle('nav-open', willOpen);

    hamburger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    navMenu.setAttribute('aria-hidden', willOpen ? 'false' : 'true');

    if (willOpen && 'vibrate' in navigator) navigator.vibrate(50);

    body.style.overflow = willOpen ? 'hidden' : '';
    body.style.touchAction = willOpen ? 'none' : '';
}

// Close mobile navigation
function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('nav-open');
    body.style.overflow = '';
    body.style.touchAction = '';
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
}

// Reset state when resizing to desktop so the menu doesn't get stuck.
window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && navMenu.classList.contains('active')) {
        closeMobileNav();
    }
}, { passive: true });

// Enhanced touch event handling
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav, { passive: true });

    // Remove touch animations on mobile for better performance
    hamburger.addEventListener('touchstart', function (e) {
        if (window.innerWidth <= 768) return; // Skip animations on mobile
        requestAnimationFrame(() => {
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.1s ease';
        });
    }, { passive: true });

    hamburger.addEventListener('touchend', function () {
        if (window.innerWidth <= 768) return; // Skip animations on mobile
        requestAnimationFrame(() => {
            this.style.transform = '';
        });
    }, { passive: true });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMobileNav();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileNav();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized scroll handler for navbar
let scrollTimeout;
let lastScrollY = 0;

function handleNavbarScroll() {
    // Skip navbar animations on mobile for better performance
    if (window.innerWidth <= 768) return;

    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - lastScrollY) < 5) return;

    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    requestAnimationFrame(() => {
        if (currentScrollY > 50) {
            navbar.style.boxShadow = '0 14px 28px -22px rgba(23,28,19,0.35)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    lastScrollY = currentScrollY;
}

// Throttled scroll event listener
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
        handleNavbarScroll();
        scrollTimeout = null;
    }, 16); // ~60fps
}, { passive: true });

// Enhanced Animation on Scroll - Mobile Optimized
const isMobile = window.innerWidth <= 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observerOptions = {
    threshold: isMobile ? 0.1 : 0.15,
    rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('animate');

                if (prefersReducedMotion || isMobile) {
                    entry.target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    return;
                }

                if (entry.target.classList.contains('showcase-item')) {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }

                if (entry.target.classList.contains('stat')) {
                    const delay = isMobile ? 50 : 100;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1.02)';
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, isMobile ? 100 : 200);
                    }, delay);
                }

                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.transform = 'translateX(0) rotateY(0deg)';
                }
            });
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.showcase-item, .skill-category, .timeline-item, .stat, .expertise-highlight, .certification-card, .project-card').forEach((el, index) => {
    el.classList.add('animate-on-scroll');

    if (el.classList.contains('timeline-item') && index % 2 === 0) {
        el.classList.add('animate-slide-left');
    } else if (el.classList.contains('timeline-item')) {
        el.classList.add('animate-slide-right');
    }

    enhancedObserver.observe(el);
});

// TYPEWRITER ANIMATION
let typewriterTimeout;
function startTypewriter() {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }

    const element = document.getElementById('typewriter');
    if (!element) {
        return;
    }

    // Responsive text based on screen size
    const isMobileView = window.innerWidth <= 480;
    const isTabletView = window.innerWidth <= 768;

    const skills = isMobileView ? [
        'remote sensing',
        'earth engine',
        'python & r',
        'agri data science',
        'satellite analysis',
        'gis mapping',
        'ndvi monitoring',
        'precision agriculture'
    ] : isTabletView ? [
        'remote sensing & gis',
        'google earth engine',
        'python & r code',
        'agricultural data',
        'satellite analysis',
        'geospatial mapping',
        'ndvi monitoring',
        'precision farming'
    ] : [
        'remote sensing & gis',
        'google earth engine',
        'python & r programming',
        'agricultural data science',
        'sentinel-2 imagery',
        'geospatial mapping',
        'ndvi monitoring',
        'precision agriculture'
    ];

    const TYPE_DELAY = isMobileView ? 60 : 80;
    const DELETE_DELAY = isMobileView ? 25 : 30;
    const HOLD_DELAY = 2000; // pause on the full word before deleting
    const NEXT_WORD_DELAY = 400; // brief pause before typing the next word

    let skillIndex = 0;
    let currentSkill = skills[skillIndex];
    let isDeleting = false;
    let charIndex = 0;

    function tick() {
        const cursor = document.querySelector('.cursor');
        let delay;

        if (isDeleting) {
            charIndex--;
            element.textContent = currentSkill.substring(0, charIndex);
            delay = DELETE_DELAY;

            if (charIndex === 0) {
                isDeleting = false;
                skillIndex = (skillIndex + 1) % skills.length;
                currentSkill = skills[skillIndex];
                delay = NEXT_WORD_DELAY;
            }
        } else {
            charIndex++;
            element.textContent = currentSkill.substring(0, charIndex);
            delay = TYPE_DELAY;

            if (charIndex === currentSkill.length) {
                isDeleting = true;
                delay = HOLD_DELAY;
            }
        }

        // Position cursor at the end of current text
        if (cursor) {
            cursor.style.left = `${element.offsetWidth}px`;
        }

        typewriterTimeout = setTimeout(tick, delay);
    }

    tick();
}

// Initialize typewriter and dynamic copyright year
document.addEventListener('DOMContentLoaded', () => {
    startTypewriter();

    // Update copyright year dynamically
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});

// Scroll to top button (styled via .scroll-to-top in style.css)
const SCROLL_TOP_THRESHOLD = 300;

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
function handleScrollToTop() {
    // Hide scroll-to-top button on mobile for better performance
    const show = window.innerWidth > 768 && window.pageYOffset > SCROLL_TOP_THRESHOLD;
    scrollToTopBtn.classList.toggle('visible', show);
}

window.addEventListener('scroll', handleScrollToTop, { passive: true });

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced touch support for mobile - disabled animations for better performance
if ('ontouchstart' in window && window.innerWidth > 768) {
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .certification-card, .skill-category, .timeline-content, .contact-item');

    interactiveElements.forEach(element => {
        let touchStartTime = 0;

        element.addEventListener('touchstart', function (e) {
            touchStartTime = Date.now();
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });

        element.addEventListener('touchend', function () {
            const touchDuration = Date.now() - touchStartTime;

            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, touchDuration < 150 ? 100 : 0);
        }, { passive: true });

        element.addEventListener('touchcancel', function () {
            this.style.transform = '';
            this.style.transition = '';
        }, { passive: true });
    });
}

// Contact form: AJAX submission to Formspree with inline feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitBtnHTML = submitBtn ? submitBtn.innerHTML : '';

    function showFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Let the browser surface built-in validation messages first
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        showFormStatus('', '');

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                showFormStatus("Thanks for your message! I'll get back to you within 24-48 hours.", 'success');
            } else {
                const data = await response.json().catch(() => null);
                const errorMsg = data && data.errors
                    ? data.errors.map(err => err.message).join(', ')
                    : 'Something went wrong while sending your message. Please try again.';
                showFormStatus(errorMsg, 'error');
            }
        } catch (err) {
            showFormStatus('Network error - please check your connection and try again, or email me directly.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtnHTML;
            }
        }
    });
}
