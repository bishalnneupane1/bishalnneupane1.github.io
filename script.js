// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;
const navbar = document.querySelector('.navbar');

// Toggle mobile navigation with enhanced UX
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
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Add touch feedback
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.9)';
    }, { passive: false });
    
    hamburger.addEventListener('touchend', function() {
        this.style.transform = '';
    });
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

// Enhanced Animation on Scroll with Agricultural Data Science Theme
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered animation timing
            setTimeout(() => {
                entry.target.classList.add('animate');
                
                // Add agricultural data science themed effects
                if (entry.target.classList.contains('showcase-item')) {
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
                
                // Special effects for stats
                if (entry.target.classList.contains('stat')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1.05)';
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, 200);
                    }, 100);
                }
                
                // Enhanced timeline effects
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.transform = 'translateX(0) rotateY(0deg)';
                    entry.target.style.boxShadow = '0 20px 60px rgba(46, 125, 50, 0.15)';
                }
                
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for enhanced animation with agricultural theme
document.querySelectorAll('.showcase-item, .skill-category, .timeline-item, .stat, .expertise-highlight, .certification-card, .project-card').forEach((el, index) => {
    // Add animation classes
    el.classList.add('animate-on-scroll');
    
    // Special positioning for timeline items
    if (el.classList.contains('timeline-item') && index % 2 === 0) {
        el.classList.add('animate-slide-left');
    } else if (el.classList.contains('timeline-item')) {
        el.classList.add('animate-slide-right');
    }
    
    enhancedObserver.observe(el);
});

// Agricultural data themed parallax scrolling
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Agriculture showcase background movement
    const agricultureSection = document.querySelector('.agriculture-showcase');
    if (agricultureSection) {
        agricultureSection.style.transform = `translateY(${rate * 0.2}px)`;
    }
    
    // Hero background movement
    const heroBackground = document.querySelector('.hero::before');
    if (heroBackground) {
        document.querySelector('.hero').style.setProperty('--bg-translate', `${rate * 0.1}px`);
    }
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

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




// Enhanced touch support for interactive elements
function addTouchSupport() {
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .certification-card, .skill-category, .timeline-content, .contact-item');
    
    interactiveElements.forEach(element => {
        let touchStartTime = 0;
        
        element.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            // Add visual feedback
            if (this.classList.contains('btn')) {
                this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            }
        }, { passive: true });
        
        element.addEventListener('touchmove', function(e) {
            // If touch moves too much, cancel the press effect
            const touch = e.touches[0];
            const rect = this.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            const touchDuration = Date.now() - touchStartTime;
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.transition = '';
            }, touchDuration < 150 ? 100 : 0);
        }, { passive: true });
        
        // Handle touch cancel
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.transition = '';
        }, { passive: true });
    });
}

// Initialize mobile-specific features
if ('ontouchstart' in window) {
    addTouchSupport();
    
    // Add swipe gesture support for navigation
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            // Swipe left to open menu, swipe right to close
            if (diffX < 0 && !navMenu.classList.contains('active') && touchStartX < 50) {
                toggleMobileNav();
            } else if (diffX > 0 && navMenu.classList.contains('active')) {
                closeMobileNav();
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
    
    // Disable pull-to-refresh on mobile browsers
    document.body.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1 && window.pageYOffset === 0) {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.body.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1 && window.pageYOffset === 0 && e.touches[0].clientY > e.touches[0].pageY) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Comprehensive mobile optimization
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    const animatedElements = document.querySelectorAll('.skill-category, .timeline-content, .stat, .certification-card');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) {
        // Reduce animation complexity on mobile or for users who prefer reduced motion
        animatedElements.forEach(el => {
            el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        });
        
        // Disable complex animations
        const complexAnimations = document.querySelectorAll('.floating-element, .geometric-shape');
        complexAnimations.forEach(el => {
            el.style.animation = 'none';
            el.style.display = 'none';
        });
    } else if (isTablet) {
        // Medium complexity for tablets
        animatedElements.forEach(el => {
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
    }
    
    // Optimize scroll behavior for mobile
    if (isMobile) {
        // Use passive listeners for better scroll performance
        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        
        // Reduce the number of elements observed for intersection
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.2, // Higher threshold for mobile
            rootMargin: '0px 0px -20px 0px'
        });
        
        // Re-observe elements with mobile-optimized settings
        document.querySelectorAll('.skill-category, .timeline-content, .stat').forEach(el => {
            observer.observe(el);
        });
    }
}

// Throttled scroll handler for better performance
let scrollThrottleTimeout;
function throttledScrollHandler() {
    if (scrollThrottleTimeout) return;
    
    scrollThrottleTimeout = setTimeout(() => {
        handleScroll();
        scrollThrottleTimeout = null;
    }, 16); // ~60fps
}

// Debounced resize handler for better performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(optimizeForMobile, 150);
});

// Initial optimization
optimizeForMobile();

// Add viewport meta tag optimization for mobile
const viewport = document.querySelector('meta[name=viewport]');
if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
}

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

// Initialize enhanced typewriter animation when the page loads
document.addEventListener('DOMContentLoaded', initEnhancedTypewriter);

// ==========================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// ==========================================

// Lazy loading implementation for better performance
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    images.forEach(img => imageObserver.observe(img));
}

// Progressive Web App features
function initPWAFeatures() {
    // Add to home screen prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button for mobile users
        const installButton = document.createElement('button');
        installButton.textContent = 'Install App';
        installButton.className = 'install-button';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--primary, #6366F1);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
            z-index: 1000;
            display: none;
            transition: all 0.3s ease;
        `;
        
        // Only show on mobile
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                installButton.style.display = 'block';
                document.body.appendChild(installButton);
            }, 5000);
        }
        
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const result = await deferredPrompt.userChoice;
                
                if (result.outcome === 'accepted') {
                    installButton.remove();
                }
                deferredPrompt = null;
            }
        });
    });
}

// Network-aware loading
function initNetworkOptimization() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        // Reduce animations on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');
            
            // Add CSS for slow connections
            const style = document.createElement('style');
            style.textContent = `
                .slow-connection * {
                    animation-duration: 0.1s !important;
                    transition-duration: 0.1s !important;
                }
                .slow-connection .floating-element,
                .slow-connection .geometric-shape {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Preload critical resources on fast connections
        if (connection.effectiveType === '4g') {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = 'Bishal_Neupane_Resume.pdf';
            document.head.appendChild(link);
        }
    }
}

// Battery-aware optimizations
function initBatteryOptimization() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            // Reduce animations when battery is low
            if (battery.level < 0.2 && !battery.charging) {
                document.body.classList.add('low-battery');
                
                const style = document.createElement('style');
                style.textContent = `
                    .low-battery * {
                        animation: none !important;
                        transition-duration: 0.1s !important;
                    }
                    .low-battery .floating-element,
                    .low-battery .geometric-shape,
                    .low-battery .hero::before {
                        display: none !important;
                    }
                `;
                document.head.appendChild(style);
            }
            
            battery.addEventListener('levelchange', () => {
                if (battery.level < 0.2 && !battery.charging) {
                    document.body.classList.add('low-battery');
                } else if (battery.level > 0.3) {
                    document.body.classList.remove('low-battery');
                }
            });
        });
    }
}

// Memory usage optimization
function initMemoryOptimization() {
    // Clean up unused resources periodically
    setInterval(() => {
        // Remove invisible elements from memory-intensive calculations
        const invisibleElements = document.querySelectorAll('[style*="display: none"]');
        invisibleElements.forEach(el => {
            if (el.style.animation) {
                el.style.animation = 'none';
            }
        });
    }, 30000); // Every 30 seconds
    
    // Monitor memory usage if available
    if ('memory' in performance) {
        const checkMemory = () => {
            const memInfo = performance.memory;
            const memoryUsage = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
            
            if (memoryUsage > 0.8) {
                // High memory usage - disable complex features
                document.body.classList.add('low-memory');
                
                const style = document.createElement('style');
                style.textContent = `
                    .low-memory .floating-element,
                    .low-memory .geometric-shape,
                    .low-memory .hero::before {
                        display: none !important;
                    }
                    .low-memory * {
                        animation: none !important;
                    }
                `;
                document.head.appendChild(style);
            }
        };
        
        // Check memory every 10 seconds
        setInterval(checkMemory, 10000);
    }
}

// Critical resource preloading
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'style.css', as: 'style' },
        { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', as: 'style' },
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
        document.head.appendChild(link);
    });
}

// Initialize all mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    initLazyLoading();
    initPWAFeatures();
    initNetworkOptimization();
    initBatteryOptimization();
    initMemoryOptimization();
    preloadCriticalResources();
    initDataShowcaseAnimations();
    initMouseFollowEffect();
});

// ==========================================
// DATA SHOWCASE INTERACTIVE ANIMATIONS
// ==========================================

function initDataShowcaseAnimations() {
    // Animate chart bars when in view
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    const showcaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    const height = bar.getAttribute('data-height');
                    bar.style.setProperty('--height', height);
                    bar.style.animationDelay = `${index * 0.2}s`;
                });
                
                // Animate trend line
                const trendLine = entry.target.querySelector('.trend-line path');
                if (trendLine) {
                    trendLine.style.animation = 'drawLine 3s ease-out forwards';
                }
                
                // Animate pipeline steps
                const stepIcons = entry.target.querySelectorAll('.step-icon');
                stepIcons.forEach((icon, index) => {
                    icon.style.animationDelay = `${index * 0.5}s`;
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    showcaseItems.forEach(item => showcaseObserver.observe(item));
    
    // Add click interactions for showcase items (but not for links)
    showcaseItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't trigger animation if clicking on a link or button
            if (e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            // Add pulse effect
            item.style.transform = 'translateY(-12px) rotateX(8deg) rotateY(5deg) scale(1.05)';
            setTimeout(() => {
                item.style.transform = '';
            }, 300);
            
            // Trigger chart animation
            const bars = item.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'barGrow 1s ease-out forwards';
                }, 50);
            });
        });
    });
}

// Mouse follow effect for showcase items
function initMouseFollowEffect() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    showcaseItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.setProperty('--mouse-x', '50%');
            item.style.setProperty('--mouse-y', '50%');
        });
    });
}

// Enhanced typing animation with data terms
function initEnhancedTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const techKeywords = [
        'Remote Sensing & GIS 🛰️',
        'Google Earth Engine & Precision Ag 🌍',
        'NDVI, NDWI & Satellite Analysis 📊',
        'R Programming & Statistical Analysis 📈',
        'Land Classification & K-Means 🗺️',
        'Agricultural Data Science 🌾',
        'Geospatial Analytics & Mapping 📍',
        'Crop Health & Water Stress Monitoring 💧'
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
                }, 3000); // Pause for 3 seconds at the end
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
        const typingSpeed = isDeleting ? 30 : 80;
        const pauseSpeed = isPaused ? 0 : typingSpeed;
        
        setTimeout(typeEffect, pauseSpeed);
    }

    // Start the animation after a brief delay
    setTimeout(() => {
        typeEffect();
    }, 1000);
}