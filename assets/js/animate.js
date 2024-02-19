document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.logo');
    const radialEffect = document.querySelector('.radial-blue-effect');
    let soundEnabled = false; // Flag to track if sound is allowed to play

    // Create an audio object
    const hoverSound = new Audio('assets/sounds/fantasy_ui_button_6-102219.mp3');

    // Function to play sound
    function playSound() {
        if (soundEnabled) {
            hoverSound.play();
        }
    }

    // Enable sound after the first user interaction
    document.body.addEventListener('click', function () {
        soundEnabled = true;
        // Optional: preload the sound here by playing and immediately pausing it
        hoverSound.play().then(() => {
            hoverSound.pause();
            hoverSound.currentTime = 0;
        }).catch(error => console.log("Sound preloading error:", error));
    }, { once: true }); // This ensures the event listener is removed after the first execution

    logo.addEventListener('mouseover', function () {
        playSound();
        // Apply the radial gradient background on hover
        radialEffect.style.backgroundImage = 'radial-gradient(circle at center, #164675 0%, #033c63 70%, #003f5c 100%)';
    });

    logo.addEventListener('mouseout', function () {
        // Optional: Stop and reset the sound if needed
        hoverSound.pause();
        hoverSound.currentTime = 0;

        // Revert to the original background when not hovering
        radialEffect.style.backgroundImage = 'radial-gradient(circle at center, #ffffff 0%, #ffffff 100%)';
    });
});
