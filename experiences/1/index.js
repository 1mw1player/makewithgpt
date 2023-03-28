

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shapes = [
{ type: 'square', x: 200, y: 100, size: 50, color: '#FF0000', angle: 0, speed: 2 },
{ type: 'circle', x: 200, y: 100, size: 50, color: '#00FF00', angle: 0, speed: 2 }
];


function update() {
// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Iterate through the shapes array and draw each shape
shapes.forEach(shape => {
ctx.fillStyle = shape.color;

// Calculate the angle and distance between the shape and the clicked position
let dx = shape.clickX - shape.x;
let dy = shape.clickY - shape.y;
let distance = Math.sqrt(dx * dx + dy * dy);
shape.angle = Math.atan2(dy, dx);

if (shape.type === 'square') {
ctx.translate(shape.x, shape.y);
ctx.rotate(shape.angle);
ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
ctx.rotate(-shape.angle);
ctx.translate(-shape.x, -shape.y);
} else if (shape.type === 'circle') {
ctx.beginPath();
ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
ctx.fill();
}

// Move the shape towards the clicked position
if (distance > 5) {
shape.x += Math.cos(shape.angle) * shape.speed;
shape.y += Math.sin(shape.angle) * shape.speed;
}
});

// Request the next animation frame
requestAnimationFrame(update);
}

// Start the animation loop
requestAnimationFrame(update);

// Add click event listener to the canvas
canvas.addEventListener('click', (event) => {
shapes.forEach(shape => {
// Set the clicked position on the shape
shape.clickX = event.clientX;
shape.clickY = event.clientY;
});
});

