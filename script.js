// Page Road
document.addEventListener('DOMContentLoaded', function() {
    // Page Load Animation
    animateOnLoad();
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