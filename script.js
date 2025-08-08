// Enhanced Mobile Navigation Toggle - Clean Version
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;
const navbar = document.querySelector('.navbar');

// Toggle mobile navigation
function toggleMobileNav() {
    const isActive = hamburger.classList.contains('active');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('nav-open');
    
    // Add haptic feedback on mobile
    if ('vibrate' in navigator && !isActive) {
        navigator.vibrate(50);
    }
    
    // Prevent background scroll
    if (!isActive) {
        body.style.overflow = 'hidden';
        body.style.touchAction = 'none';
    } else {
        body.style.overflow = '';
        body.style.touchAction = '';
    }
}

// Close mobile navigation
function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('nav-open');
    body.style.overflow = '';
    body.style.touchAction = '';
}

// Enhanced touch event handling
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav, { passive: true });
    
    // Remove touch animations on mobile for better performance
    hamburger.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 768) return; // Skip animations on mobile
        requestAnimationFrame(() => {
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.1s ease';
        });
    }, { passive: true });
    
    hamburger.addEventListener('touchend', function() {
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
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
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
                    if (!isMobile) {
                        entry.target.style.boxShadow = '0 20px 60px rgba(46, 125, 50, 0.15)';
                    }
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

// TYPEWRITER ANIMATION - WORKING VERSION
let typewriterInterval;
function startTypewriter() {
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    
    const element = document.getElementById('typewriter');
    if (!element) {
        console.error('❌ Typewriter element not found');
        return;
    }
    
    console.log('✅ Starting typewriter animation');
    
    // Responsive text based on screen size
    const isMobileView = window.innerWidth <= 480;
    const isTabletView = window.innerWidth <= 768;
    
    const skills = isMobileView ? [
        'Remote Sensing 🛰️',
        'Earth Engine 🌍',
        'Python & R 📊',
        'Agri Data Science 🌾',
        'Satellite Analysis 📈',
        'GIS Mapping 🗺️',
        'NDVI Monitor 💧',
        'Precision Agri 🚜'
    ] : isTabletView ? [
        'Remote Sensing & GIS 🛰️',
        'Google Earth Engine 🌍',
        'Python & R Code 📊',
        'Agricultural Data 🌾',
        'Satellite Analysis 📈',
        'Geospatial Maps 🗺️',
        'NDVI Monitoring 💧',
        'Precision Farming 🚜'
    ] : [
        'Remote Sensing & GIS 🛰️',
        'Google Earth Engine 🌍',
        'Python & R Programming 📊',
        'Agricultural Data Science 🌾',
        'Satellite Analysis 📈',
        'Geospatial Mapping 🗺️',
        'NDVI Monitoring 💧',
        'Precision Agriculture 🚜'
    ];
    
    let skillIndex = 0;
    let currentSkill = skills[skillIndex];
    let isDeleting = false;
    let charIndex = 0;
    
    typewriterInterval = setInterval(() => {
        const cursor = document.querySelector('.cursor');
        
        if (isDeleting) {
            element.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
            
            // Position cursor at the end of current text
            if (cursor) {
                cursor.style.left = `${element.offsetWidth}px`;
            }
            
            if (charIndex === 0) {
                isDeleting = false;
                skillIndex = (skillIndex + 1) % skills.length;
                currentSkill = skills[skillIndex];
            }
        } else {
            element.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
            
            // Position cursor at the end of current text
            if (cursor) {
                cursor.style.left = `${element.offsetWidth}px`;
            }
            
            if (charIndex === currentSkill.length + 1) {
                isDeleting = true;
                setTimeout(() => {}, 2000);
            }
        }
    }, isDeleting ? (isMobileView ? 25 : 30) : (isMobileView ? 60 : 80));
}

// Initialize typewriter
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded - Starting typewriter...');
    startTypewriter();
});

// Multiple backup attempts for reliability
setTimeout(() => startTypewriter(), 1000);
setTimeout(() => startTypewriter(), 2000);

window.addEventListener('load', () => {
    setTimeout(startTypewriter, 500);
});

// Final safety check
setTimeout(() => {
    const element = document.getElementById('typewriter');
    if (element && (!element.textContent || element.textContent.trim() === '')) {
        console.log('🔄 Final typewriter restart');
        startTypewriter();
    }
}, 5000);

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary, #2E7D32);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 16px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
function handleScrollToTop() {
    // Hide scroll-to-top button on mobile for better performance
    if (window.innerWidth <= 768) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        return;
    }
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
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
        
        element.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            const touchDuration = Date.now() - touchStartTime;
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, touchDuration < 150 ? 100 : 0);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.transition = '';
        }, { passive: true });
    });
}

// Global functions for manual control
window.forceStartTypewriter = function() {
    console.log('🆘 Manual typewriter start');
    startTypewriter();
};

window.startTypewriter = startTypewriter;