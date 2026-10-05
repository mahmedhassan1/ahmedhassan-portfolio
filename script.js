// ================================
// PORTFOLIO JAVASCRIPT
// Ahmed Hassan - Professional Portfolio
// ================================

document.addEventListener('DOMContentLoaded', function() {

    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80; // navbar height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (!navbar) return;
        navbar.style.boxShadow = window.pageYOffset > 50
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : 'none';
    });

    // ================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ================================
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll(
        '.project-card, .timeline-item, .skill-category, .highlight-card, .cert-card'
    ).forEach(el => observer.observe(el));

    // ================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (!link) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();

    // ================================
    // FOOTER YEAR
    // ================================
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ================================
    // SCROLL TO TOP BUTTON
    // ================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 500);
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================================
    // PERFORMANCE: LAZY LOAD IMAGES
    // ================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ================================
    // CONSOLE MESSAGE
    // ================================
    console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in working together? Let\'s connect!', 'color: #cbd5e1; font-size: 14px;');
    console.log('%cEmail: iammuhammadahmedhassan@gmail.com', 'color: #10b981; font-size: 14px;');
});

// ================================
// INJECTED STYLES (scroll-to-top, mobile menu, active link)
// ================================
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-accent-primary);
        color: var(--color-bg-primary);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
    }

    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .scroll-to-top:hover {
        background: var(--color-accent-secondary);
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(16, 185, 129, 0.6);
    }

    .scroll-to-top:active {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 20px;
        }

        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(12px);
            padding: 24px;
            gap: 20px;
            border-bottom: 1px solid var(--color-border);
            animation: slideDown 0.3s ease-out;
        }

        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }

        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }

    .nav-menu a.active {
        color: var(--color-accent-primary);
    }

    .nav-menu a.active::after {
        width: 100%;
    }

    .fade-in-visible {
        animation: fadeInScale 0.6s ease-out forwards;
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);
