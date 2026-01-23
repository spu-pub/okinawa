// Page Road
document.addEventListener('DOMContentLoaded', function() {
    // Page Load Animation
    animateOnLoad();
    // Scroll FadeIn
    initScrollReveal();

    initModal();
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