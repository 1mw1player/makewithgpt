
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
const scoreText = document.createElement('div');
scoreText.style.position = 'absolute';
scoreText.style.top = '0';
scoreText.style.left = '50%';
scoreText.style.transform = 'translateX(-50%)';
scoreText.style.color = '#FFFFFF';
scoreText.style.fontSize = '24px';
scoreText.innerHTML = `Score: ${score}`;
document.body.appendChild(scoreText);

let shapes = [
  { type: 'square', x: 200, y: -50, size: 50, color: '#FF0000', angle: 0, speed: 2, acceleration: 0.1,clickDelay: 0, },
  { type: 'circle', x: 200, y: -50, size: 50, color: '#00FF00', angle: 0, speed: 2, acceleration: 0.1,clickDelay: 0, },
  {
    type: 'combined',
    x: Math.random() * canvas.width,
    y: -50,
    size: 50,
    color: getRandomColor(),
    angle: 0,
    speed: 2,
    acceleration: 0.1,
    circleSize: 50,
    circleColor: getRandomColor(),
    clicksRequired: 1,
    clickDelay: 0,
  }
];


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spawn a new shape at random intervals
  if (Math.random() < 0.01) {
    const newShape = {
      type: "combined",
      x: Math.random() * canvas.width,
      y: -50,
      size: 50,
      color: getRandomColor(),
      angle: 0,
      speed: 2,
      acceleration: 0.1,
      circleSize: 50,
      circleColor: getRandomColor(),
      clicksRequired: 1,
      clickDelay: 0, // Add clickDelay property
    };
    shapes.push(newShape);
  }

  // Iterate through the shapes array and draw each shape
  shapes.forEach((shape) => {
    ctx.fillStyle = shape.color;

    // Move the shape downwards
    shape.speed += shape.acceleration;
    shape.y += shape.speed;

    // Check for collision with the bottom of the canvas
    if (shape.y + shape.size / 2 > canvas.height) {
      shape.y = canvas.height - shape.size / 2;
      shape.speed *= -0.8;
      shape.clicksRequired++;
      shape.clickDelay = 0; // Reset clickDelay when the shape hits the ground
    }

    if (shape.type === "combined") {
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.angle);
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      ctx.beginPath();
      ctx.arc(0, 0, shape.circleSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = shape.circleColor;
      ctx.fill();
      ctx.rotate(-shape.angle);
      ctx.translate(-shape.x, -shape.y);

      // Increase clickDelay after the shape is clicked
      if (shape.clickDelay > 0) {
        shape.clickDelay--;
      }
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape.type === "square") {
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.angle);
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      ctx.rotate(-shape.angle);
      ctx.translate(-shape.x, -shape.y);
    }
  });

  // Request the next animation frame
  requestAnimationFrame(update);
}


// Start the animation loop
requestAnimationFrame(update);



canvas.addEventListener('click', function (event) {
  const indicesToRemove = [];

  shapes.forEach(function (shape, index) {
    const distance = Math.sqrt(
      Math.pow(shape.x - event.clientX, 2) + Math.pow(shape.y - event.clientY, 2)
    );
    const maxSize = shape.type === 'combined' ? Math.max(shape.size, shape.circleSize) : shape.size;
    if (distance <= maxSize / 2) {
      shape.clicksRequired--; // Decrement the clicksRequired
      if (shape.clicksRequired <= 0) {
        indicesToRemove.push(index);
        score++;
        scoreText.innerHTML = `Score: ${score}`;
      }
    }
  });

  // Remove shapes with indices collected in indicesToRemove array
  for (let i = indicesToRemove.length - 1; i >= 0; i--) {
    shapes.splice(indicesToRemove[i], 1);
  }
});
