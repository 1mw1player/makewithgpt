// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the necessary elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle menu function
    function toggleMenu() {
        navLinks.classList.toggle('active');
        
        // Optional: Change hamburger icon to 'X' when menu is open
        hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        
        // Optional: Prevent scrolling when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // Add click event to hamburger
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking on a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on window resize (if switching to desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});


// Get the main content element

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const imageContainer = document.getElementById('imageContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const artBtn = document.querySelector('.art-btn');

    // Array of images in your directory
    const images = [
        'images/1.jpg',
        'images/2.png',
        'images/3.jpg',
        // Add all your image paths here
    ];

    let currentImageIndex = 0;
    let isGalleryActive = false;

    // Function to update image
    function updateImage() {
        imageContainer.innerHTML = `<img src="${images[currentImageIndex]}" alt="Art piece ${currentImageIndex + 1}">`;
        
        // Update button states
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === images.length - 1;
    }

    // Function to show gallery
    function showGallery() {
        if (!isGalleryActive) {
            isGalleryActive = true;
            currentImageIndex = 0;
            updateImage();
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    // Event Listeners
    artBtn.addEventListener('click', showGallery);

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateImage();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateImage();
        }
    });

    // Initially hide navigation buttons
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
});