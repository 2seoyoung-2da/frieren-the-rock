// DOM Elements
const introSection = document.getElementById('introSection');
const mainPage = document.getElementById('mainPage');
let mobileMenuBtn;
let mainNav;
let navClose;
let notificationBtn;
let profileBtn;
let loginBtn;
let notificationDropdown;
let profileDropdown;
let loginModal;
let modalClose;
let header;

function initHeaderElements() {
    mobileMenuBtn = document.getElementById('mobileMenuBtn');
    mainNav = document.querySelector('.nav');
    navClose = document.getElementById('navClose');
    notificationBtn = document.getElementById('notificationBtn');
    profileBtn = document.getElementById('profileBtn');
    loginBtn = document.getElementById('loginBtn');
    notificationDropdown = document.getElementById('notificationDropdown');
    profileDropdown = document.getElementById('profileDropdown');
    loginModal = document.getElementById('loginModal');
    modalClose = document.getElementById('modalClose');
    header = document.querySelector('.header') || header;

    if (mobileMenuBtn && !mobileMenuBtn.dataset.bound) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuBtn.dataset.bound = 'true';
    }

    if (navClose && !navClose.dataset.bound) {
        navClose.addEventListener('click', closeMobileMenu);
        navClose.dataset.bound = 'true';
    }

    if (notificationBtn && !notificationBtn.dataset.bound) {
        notificationBtn.addEventListener('click', toggleNotificationDropdown);
        notificationBtn.dataset.bound = 'true';
    }

    if (profileBtn && !profileBtn.dataset.bound) {
        profileBtn.addEventListener('click', toggleProfileDropdown);
        profileBtn.dataset.bound = 'true';
    }

    if (loginBtn && !loginBtn.dataset.bound) {
        loginBtn.addEventListener('click', openLoginModal);
        loginBtn.dataset.bound = 'true';
    }

    if (modalClose && !modalClose.dataset.bound) {
        modalClose.addEventListener('click', closeLoginModal);
        modalClose.dataset.bound = 'true';
    }

    if (loginModal && !loginModal.dataset.boundOverlay) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
        loginModal.dataset.boundOverlay = 'true';
    }

    if (notificationDropdown && !notificationDropdown.dataset.boundStop) {
        notificationDropdown.addEventListener('click', (e) => e.stopPropagation());
        notificationDropdown.dataset.boundStop = 'true';
    }

    if (profileDropdown && !profileDropdown.dataset.boundStop) {
        profileDropdown.addEventListener('click', (e) => e.stopPropagation());
        profileDropdown.dataset.boundStop = 'true';
    }
}

// Intro Animation Control
function goToMainPage() {
    introSection.style.animation = 'introFadeOut 0.5s ease-out forwards';
    setTimeout(() => {
        introSection.style.display = 'none';
        // Show main page with fade in animation
        if (mainPage) {
            mainPage.style.display = 'block';
            mainPage.style.opacity = '0';
            mainPage.style.animation = 'fadeIn 0.8s ease-out forwards';
        }
    }, 500);
}

// Cake box click event listener
const cakeBox = document.getElementById('cakeBox');
if (cakeBox) {
    cakeBox.addEventListener('click', goToMainPage);
}

// Arrow click event listener
const clickIndicator = document.querySelector('.click-indicator');
if (clickIndicator) {
    clickIndicator.addEventListener('click', goToMainPage);
}



// Mobile Menu Toggle
function toggleMobileMenu() {
    if (!mainNav) return;
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    if (!mainNav) return;
    mainNav.classList.remove('active');
    document.body.style.overflow = '';
}

// Mobile menu event listeners
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (navClose) {
    navClose.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mainNav || !mobileMenuBtn) {
        return;
    }
    if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Dropdown Management
function closeAllDropdowns() {
    notificationDropdown?.classList.remove('active');
    profileDropdown?.classList.remove('active');
}

function toggleNotificationDropdown(e) {
    if (!notificationDropdown) return;
    e.stopPropagation();
    const isActive = notificationDropdown.classList.contains('active');
    closeAllDropdowns();
    if (!isActive) {
        notificationDropdown.classList.add('active');
    }
}

function toggleProfileDropdown(e) {
    if (!profileDropdown) return;
    e.stopPropagation();
    const isActive = profileDropdown.classList.contains('active');
    closeAllDropdowns();
    if (!isActive) {
        profileDropdown.classList.add('active');
    }
}

// Dropdown event listeners
if (notificationBtn) {
    notificationBtn.addEventListener('click', toggleNotificationDropdown);
}

if (profileBtn) {
    profileBtn.addEventListener('click', toggleProfileDropdown);
}

// Close dropdowns when clicking outside
document.addEventListener('click', closeAllDropdowns);

// Login Modal Management
function openLoginModal() {
    loginModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    loginModal?.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLoginModal();
        closeAllDropdowns();
        closeMobileMenu();
    }
});

// Smooth scrolling for navigation links
function initSmoothScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.dataset.smoothBound === 'true') return;
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            closeMobileMenu();
        });
        anchor.dataset.smoothBound = 'true';
    });
}

// Header scroll effect
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    if (!header) {
        header = document.querySelector('.header');
    }
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Add scrolled class to CSS
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: none;
    }
`;
document.head.appendChild(style);

// Form submission handling
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle login logic here
        alert('로그인 기능은 아직 구현되지 않았습니다.');
        closeLoginModal();
    });
}

// Animation observers for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero-content, .cake-box-container, .intro-text').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mobile: tap to toggle hover image in main menu
document.addEventListener('DOMContentLoaded', () => {
    const isTouch = matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    if (isTouch) {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('toggled');
            });
        });
    }
});

// Preload animations
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    setTimeout(() => {
        document.querySelectorAll('.logo-animation, .cake-box-container, .intro-text').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.3}s`;
        });
    }, 100);
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    if (!mainNav) return;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && mainNav.classList.contains('active')) {
            // Swipe right - close menu
            closeMobileMenu();
        } else if (swipeDistance < 0 && !mainNav.classList.contains('active')) {
            // Swipe left - open menu
            toggleMobileMenu();
        }
    }
}

// Performance optimizations
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounce scroll events
const debouncedScroll = debounce(() => {
    // Scroll logic here if needed
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Lazy loading for future images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

console.log('Vegan Delights website loaded successfully! 🍰✨'); 

document.addEventListener('DOMContentLoaded', () => {
    initHeaderElements();
    initSmoothScrollAnchors();
});
document.addEventListener('headerLoaded', () => {
    initHeaderElements();
    initSmoothScrollAnchors();
});