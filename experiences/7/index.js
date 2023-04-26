const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shapes = [];

let score = 0;

function spawnInitialShape() {
  shapes.push({
    type: 'square',
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 50,
    color: '#FF0000'
  });
}

function spawnNewShapes(x, y) {
  shapes.forEach(shape => {
    // Check if the shape is clicked
    let dx = x - shape.x;
    let dy = y - shape.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= shape.size / 2) {
      // Increment the score and remove the shape
      score++;
      shapes.splice(shapes.indexOf(shape), 1);

      // Spawn two new shapes at random locations
      shapes.push({
        type: 'square',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 50,
        color: '#FF0000'
      });
      shapes.push({
        type: 'circle',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 50,
        color: '#00FF00'
      });
    }
  });
}

function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the score at the top and center of the canvas
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Score: ${score}`, canvas.width / 2, 50);

  // Iterate through the shapes array and draw each shape
  shapes.forEach(shape => {
    ctx.fillStyle = shape.color;

    if (shape.type === 'square') {
      ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    } else if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Request the next animation frame
  requestAnimationFrame(update);
}

// Spawn the initial shape
spawnInitialShape();

// Start the animation loop
requestAnimationFrame(update);

// Add click event listener to the canvas
canvas.addEventListener('click', (event) => {
  spawnNewShapes(event.clientX, event.clientY);
});
