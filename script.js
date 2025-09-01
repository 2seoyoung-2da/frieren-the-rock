// DOM Elements
const introSection = document.getElementById('introSection');
const mainPage = document.getElementById('mainPage');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navClose = document.getElementById('navClose');
const notificationBtn = document.getElementById('notificationBtn');
const profileBtn = document.getElementById('profileBtn');
const loginBtn = document.getElementById('loginBtn');
const notificationDropdown = document.getElementById('notificationDropdown');
const profileDropdown = document.getElementById('profileDropdown');
const loginModal = document.getElementById('loginModal');
const modalClose = document.getElementById('modalClose');

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
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
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
    e.stopPropagation();
    const isActive = notificationDropdown.classList.contains('active');
    closeAllDropdowns();
    if (!isActive) {
        notificationDropdown.classList.add('active');
    }
}

function toggleProfileDropdown(e) {
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

// Prevent dropdown from closing when clicking inside
notificationDropdown?.addEventListener('click', (e) => e.stopPropagation());
profileDropdown?.addEventListener('click', (e) => e.stopPropagation());

// Login Modal Management
function openLoginModal() {
    loginModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    loginModal?.classList.remove('active');
    document.body.style.overflow = '';
}

// Login modal event listeners
if (loginBtn) {
    loginBtn.addEventListener('click', openLoginModal);
}

if (modalClose) {
    modalClose.addEventListener('click', closeLoginModal);
}

// Close modal when clicking overlay
loginModal?.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLoginModal();
        closeAllDropdowns();
        closeMobileMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
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