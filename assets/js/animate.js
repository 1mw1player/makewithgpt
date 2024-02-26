document.addEventListener('DOMContentLoaded', function() {
    var svgElement = document.querySelector('.svg-container svg');

    function startAnimation() {
        var bookGroup = svgElement.querySelector('.bookGroup');
        var text = svgElement.querySelector('.text');

        // Apply animations to the group, affecting both cover and lines
        bookGroup.style.animation = 'openBook 2s forwards';
        text.style.animation = 'fadeInText 2s forwards 2s'; // Delays the text animation to start with the cover opening

        // Remove this event listener to prevent re-triggering the animation
        svgElement.removeEventListener('click', startAnimation);
    }

    svgElement.addEventListener('click', startAnimation);
});
