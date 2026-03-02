// Page Road
document.addEventListener('DOMContentLoaded', function() {
    // Page Load Animation
    animateOnLoad();
    // Scroll FadeIn
    initScrollReveal();

    initModal();
    initMobileMenu();
});

function animateOnLoad() {
    const elements = document.querySelectorAll('.spot-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Scroll FadeIn
function initScrollReveal() {
    const targets = document.querySelectorAll('.scroll-reveal');
    if (!targets.length) return;

    let observer;
    const reveal = (entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('is-visible');
            if (observer) observer.unobserve(el);
        }
    };
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => entries.forEach(reveal), {
            threshold: 0.2
        });
        targets.forEach((el) => observer.observe(el));
    } else {
        targets.forEach((el) => el.classList.add('is-visible'));
    }
}

function openModal(content) {
    const modal = document.getElementById('spotModal');
    const modalBody = document.getElementById('modalBody');
    if(modal && modalBody) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }
}

function initModal() {
    const modal = document.getElementById('spotModal');
    const closeBtn = document.querySelector('.close');
    if(closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

function closeModal() {
    const modal = document.getElementById('spotModal');
    if(modal) {
        modal.style.display = 'none';
    }
}

function showSpotInfo(spotId) {
    const template = document.getElementById(`spot-info-${spotId}`);
    if(template) {
        openModal(template.innerHTML);
    }
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');

    if (!menuBtn || !mobileMenu) return;

    const menuLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
        mobileMenu.classList.add('is-open');
        menuBtn.classList.add('is-open');
        menuBtn.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('is-open');
        menuBtn.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    menuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}