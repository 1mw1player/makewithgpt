document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const radialEffect = document.querySelector('.radial-blue-effect');

    logo.addEventListener('mouseover', function() {
        // Apply the radial gradient background on hover
        radialEffect.style.backgroundImage = 'radial-gradient(circle at center, #164675 0%, #033c63 70%, #003f5c 100%)';
    });

    logo.addEventListener('mouseout', function() {
        // Revert to the original background when not hovering
        radialEffect.style.backgroundImage = 'radial-gradient(circle at center, #ffffff 0%, #ffffff 100%)';
    });
});
