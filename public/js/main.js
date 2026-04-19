// Main UI interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for anchors if any
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple parallax effect for hero elements if on landing page
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            heroTitle.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
            heroSubtitle.style.transform = `translate(${xAxis * 1.5}px, ${yAxis * 1.5}px)`;
        });

        // Reset transform on mouse leave
        window.addEventListener('mouseout', () => {
            heroTitle.style.transform = `translate(0px, 0px)`;
            heroSubtitle.style.transform = `translate(0px, 0px)`;
        });
    }
});
