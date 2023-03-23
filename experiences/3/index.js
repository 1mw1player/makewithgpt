const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext("2d");
canvas3.width = window.innerWidth;
canvas3.height = window.innerHeight;

let shapes1 = [];

function spawnShapes() {
  for (let i = 0; i < 100; i++) {
    // Generate random position for the shape pair
    let posX = Math.random() * canvas3.width;
    let posY = Math.random() * canvas3.height;

    // Create square shape
    let square = {
      type: 'square',
      x: posX,
      y: posY,
      size: 10,
      color: '#FF0000',
      angle: 0,
      speed: 2
    };

    // Create circle shape
    let circle = {
      type: 'circle',
      x: posX,
      y: posY,
      size: 5,
      color: '#00FF00',
      angle: 0,
      speed: 2
    };

    shapes1.push(square);
    shapes1.push(circle);
  }
}

function update() {
  // Clear the canvas
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

  // Iterate through the shapes array and draw each shape
  shapes1.forEach(shape => {
    ctx3.fillStyle = shape.color;

    // Calculate the angle and distance between the shape and the clicked position
    let dx = shape.clickX - shape.x;
    let dy = shape.clickY - shape.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    shape.angle = Math.atan2(dy, dx);

    if (shape.type === 'square') {
      ctx3.translate(shape.x, shape.y);
      ctx3.rotate(shape.angle);
      ctx3.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      ctx3.rotate(-shape.angle);
      ctx3.translate(-shape.x, -shape.y);
    } else if (shape.type === 'circle') {
      ctx3.beginPath();
      ctx3.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
      ctx3.fill();
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

// Spawn the shape pairs
spawnShapes();

// Start the animation loop
requestAnimationFrame(update);

// Add click event listener to the canvas
canvas3.addEventListener('click', (event) => {
  shapes1.forEach(shape => {
    // Set the clicked position on the shape
    shape.clickX = event.clientX;
    shape.clickY = event.clientY;
  });
});
