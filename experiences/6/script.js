var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// Array to store the animated elements
var animatedElements = [];

// Function to resize the canvas to fit the window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw the ground
    var groundHeight = canvas.height * 0.2;
    context.fillStyle = "green";
    context.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

// Function to create an animated element
function createAnimatedElement(x, y, width, height) {
    var element = {
        x: x,
        y: y,
        width: width,
        height: height,
        speed: Math.random() * 2 + 1 // Random speed between 1 and 3
    };
    animatedElements.push(element);
}

// Function to update and animate the elements
function animateElements() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ground
    var groundHeight = canvas.height * 0.2;
    context.fillStyle = "green";
    context.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // Update and draw the animated elements
    for (var i = 0; i < animatedElements.length; i++) {
        var element = animatedElements[i];
        element.x += element.speed;

        // Check if the element has moved out of the canvas
        if (element.x > canvas.width) {
            animatedElements.splice(i, 1);
            i--;
        } else {
            context.fillStyle = "brown";
            context.fillRect(element.x, element.y, element.width, element.height);
        }
    }

    // Request animation frame
    requestAnimationFrame(animateElements);
}

// Resize the canvas initially
resizeCanvas();

// Resize the canvas whenever the window is resized
window.addEventListener("resize", resizeCanvas);

// Create initial animated elements
for (var i = 0; i < 10; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * (canvas.height * 0.2 - 50) + (canvas.height * 0.8);
    createAnimatedElement(x, y, 20, 10);
}

// Start the animation
animateElements();
