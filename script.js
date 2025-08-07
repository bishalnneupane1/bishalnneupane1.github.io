// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Toggle mobile navigation
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('nav-open');
}

// Close mobile navigation
function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('nav-open');
}

hamburger.addEventListener('click', toggleMobileNav);

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

// Prevent body scroll when mobile nav is open
const style = document.createElement('style');
style.textContent = `
    body.nav-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add Nepal flag animation
document.addEventListener('DOMContentLoaded', () => {
    const nepalFlag = '🇳🇵';
    const heroTitle = document.querySelector('.hero h3');
    
    // Add a subtle pulse animation to the Nepal flag
    if (heroTitle) {
        const flagSpan = document.createElement('span');
        flagSpan.style.animation = 'pulse 2s infinite';
        flagSpan.innerHTML = nepalFlag;
        
        // Add CSS for pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        heroTitle.innerHTML = heroTitle.innerHTML.replace(nepalFlag, flagSpan.outerHTML);
    }
});




// Add touch support for interactive elements
function addTouchSupport() {
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .project-card, .skill-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
}

// Initialize touch support on mobile
if ('ontouchstart' in window) {
    addTouchSupport();
}

// Optimize animations for mobile
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat');
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        animatedElements.forEach(el => {
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
}

window.addEventListener('resize', optimizeForMobile);
optimizeForMobile();

// Enhanced scroll-to-top button with mobile optimization
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary-color, #2c7a2c);
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

// Optimized scroll handler with throttling
let scrollTimeout;
function handleScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }, 10);
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// TYPEWRITER ANIMATION FOR TECH KEYWORDS
// ==========================================

function initTypewriterAnimation() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const techKeywords = [
        'Python, SQL, Excel, Git',
        'Machine Learning, AI',
        'Data Visualization, BI',
        'R, JavaScript, Docker',
        'Power BI, Tableau',
        'MongoDB, PostgreSQL',
        'TensorFlow, Scikit-learn',
        'GIS, Spatial Analysis'
    ];

    let currentKeywordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeEffect() {
        const currentKeyword = techKeywords[currentKeywordIndex];
        
        if (!isDeleting && !isPaused) {
            // Typing
            typewriterElement.textContent = currentKeyword.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentKeyword.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000); // Pause for 2 seconds at the end
            }
        } else if (isDeleting && !isPaused) {
            // Deleting
            typewriterElement.textContent = currentKeyword.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentKeywordIndex = (currentKeywordIndex + 1) % techKeywords.length;
            }
        }
        
        // Adjust typing speed
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseSpeed = isPaused ? 0 : typingSpeed;
        
        setTimeout(typeEffect, pauseSpeed);
    }

    // Start the animation after a brief delay
    setTimeout(() => {
        typeEffect();
    }, 1000);
}

// Initialize typewriter animation when the page loads
document.addEventListener('DOMContentLoaded', initTypewriterAnimation);