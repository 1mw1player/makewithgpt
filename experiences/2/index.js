
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

// Define the Particle class
class Particle {
  constructor(x, y, size, color, angle, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.angle = angle;
    this.speed = speed;
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
  }

  // Update the particle's position and angle
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.angle += 0.01;
  }

  // Draw the particle on the canvas
  draw() {
    ctx2.save();
    ctx2.translate(this.x, this.y);
    ctx2.rotate(this.angle);
    ctx2.fillStyle = this.color;
    ctx2.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx2.restore();
  }
}

let particles = [];

// Add a particle to the particles array on mouse click events
canvas2.addEventListener('click', (event) => {
  const angle = Math.random() * Math.PI * 2;
  const size = Math.random() * 20 + 10;
  const speed = Math.random() * 5 + 1;
  particles.push(new Particle(event.clientX, event.clientY, size, '#FF0000', angle, speed));
});

function update() {
  // Clear the canvas
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  // Iterate through the particles array and update and draw each particle
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  // Request the next animation frame
  requestAnimationFrame(update);
}

// Start the animation loop
requestAnimationFrame(update);
