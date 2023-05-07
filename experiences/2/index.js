// Global variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let lastTime;
let deltaTime;

// Step 1: Initialize the canvas and context, and ensure the canvas and all other game objects and text drawn resize to the browser window

// Set initial canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to handle canvas resizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Event listener for window resizing
window.addEventListener('resize', resizeCanvas);

// Step 3: Implement slash effect on canvas

let mousePosition = { x: 0, y: 0 };
let isDragging = false;
let slashPoints = [];

// Event listener for mouse and touch movement
canvas.addEventListener('mousedown', startDragging);
canvas.addEventListener('mousemove', drag);
canvas.addEventListener('mouseup', endDragging);

canvas.addEventListener('touchstart', startDragging);
canvas.addEventListener('touchmove', drag);
canvas.addEventListener('touchend', endDragging);

// Function to start dragging
function startDragging(event) {
  isDragging = true;
  mousePosition.x = event.clientX || event.touches[0].clientX;
  mousePosition.y = event.clientY || event.touches[0].clientY;
}

// Function to handle dragging
function drag(event) {
  if (isDragging) {
    mousePosition.x = event.clientX || event.touches[0].clientX;
    mousePosition.y = event.clientY || event.touches[0].clientY;
  }
}

// Function to end dragging
function endDragging(event) {
  isDragging = false;
}

// Function to draw the slash effect
function drawSlash() {
  if (isDragging) {
    // Add the current mouse position to the slashPoints array
    slashPoints.push({ x: mousePosition.x, y: mousePosition.y });

    // Keep the last 10 points in the array for a smooth slash effect
    if (slashPoints.length > 10) {
      slashPoints.shift();
    }

    // Draw the slash effect using the points in the slashPoints array
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Set the color and opacity of the slash
    ctx.lineWidth = 5; // Set the width of the slash line
    ctx.beginPath();
    ctx.moveTo(slashPoints[0].x, slashPoints[0].y);

    for (let i = 1; i < slashPoints.length; i++) {
      ctx.lineTo(slashPoints[i].x, slashPoints[i].y);
    }

    ctx.stroke();
  }
}


// Step 5: Implement the fruit objects
class Fruit {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.initialRadius = radius;
    this.color = color;
    this.speed = speed;
    this.sliced = false;
    this.gravity = 0.1/8;
    this.velocity = 0;
    this.rotation = 0;
    this.rotationSpeed = Math.random() * 0.2 + 0.1;
    this.pieces = [];
    this.sliceTime = 0;
  }

  update() {
    if (!this.sliced) {
      this.y -= this.speed;
      this.velocity += this.gravity;
      this.y += this.velocity;
      this.rotation += this.rotationSpeed;
    } else {
      for (const piece of this.pieces) {
        piece.velocity += piece.gravity;
        piece.y += piece.velocity;
        piece.rotation += piece.rotationSpeed;
      }
    }
  }

  draw() {
    if (!this.sliced) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    } else {
      for (const piece of this.pieces) {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);

        ctx.beginPath();
        ctx.arc(0, 0, piece.radius, 0, Math.PI * 2);
        ctx.fillStyle = piece.color;
        ctx.fill();
        ctx.closePath();

        ctx.restore();
      }
    }
  }

  split() {
    const angle = Math.PI / 8; // Adjust angle
    const velocity = 10; // Adjust velocity
    const factor = Math.floor(Math.random() * 5) + 1; // Generate random factor between 1 and 5
    const x1 = this.x + Math.cos(angle) * this.radius * factor;
    const y1 = this.y + Math.sin(angle) * this.radius * factor;
    const x2 = this.x - Math.cos(angle) * this.radius * factor;
    const y2 = this.y - Math.sin(angle) * this.radius * factor;
    
    this.pieces.push(new FruitPiece(x1, y1, this.radius / 2, this.color, velocity, angle));
    this.pieces.push(new FruitPiece(x2, y2, this.radius / 2, this.color, velocity, -angle));
  }
  
  
}

class FruitPiece {
  constructor(x, y, radius, color, speed, angle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.velocity = 0;
    this.gravity = 0.1/4;
    this.angle = angle;
    this.rotation = 0;
    this.rotationSpeed = Math.random() * 0.2 + 0.1;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.rotation += this.rotationSpeed;
    this.x += Math.cos(this.angle) * this.speed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
}




// Create a sample fruit instance for testing
const sampleFruit = new Fruit(canvas.width / 2, canvas.height, 20, 'red', 5);



// Step 6: Implement fruit spawning and movement

const fruits = [];
const fruitColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function spawnFruit() {
  const x = Math.random() * (canvas.width - 100) + 50;
  const y = canvas.height;
  const radius = 15;
  const color = fruitColors[Math.floor(Math.random() * fruitColors.length)];
  const speed = 3 + Math.random() * 5;

  const newFruit = new Fruit(x, y, radius, color, speed);
  fruits.push(newFruit);
}

function updateAndDrawFruits() {
  for (let i = 0; i < fruits.length; i++) {
    const fruit = fruits[i];
    fruit.update();
    fruit.draw();

    // Remove sliced fruits from the array after 1 second
    if (fruit.sliced && performance.now() - fruit.sliceTime > 1000) {
      fruits.splice(i, 1);
      i--;
    }
  }
}


// Set up fruit spawning interval
const fruitSpawnInterval = setInterval(spawnFruit, 1500);


//GET DISTANCE
function getDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}



// Step 7: Implement slicing detection

function detectSlicing() {
  for (const fruit of fruits) {
    for (let i = 1; i < slashPoints.length; i++) {
      const previousPoint = slashPoints[i - 1];
      const currentPoint = slashPoints[i];

      const fruitCenter = {
        x: fruit.x,
        y: fruit.y
      };

      const distanceToPreviousPoint = getDistance(previousPoint, fruitCenter);
      const distanceToCurrentPoint = getDistance(currentPoint, fruitCenter);

      if (distanceToPreviousPoint < fruit.radius || distanceToCurrentPoint < fruit.radius) {
        // Fruit has been sliced
        if (!fruit.sliced) {
          fruit.sliced = true;
          fruit.sliceAngle = Math.atan2(currentPoint.y - previousPoint.y, currentPoint.x - previousPoint.x);
          fruit.sliceTime = performance.now();

          // Split the fruit into two separate pieces
          fruit.split();
          
          incrementScore(); // Increment the score when a fruit is sliced
          break;
        }
      }
    }
  }
}



// Step 8: Create a scoring system

let score = 0;

function incrementScore() {
  score++;
}

function displayScore() {
  ctx.font = '24px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 10, 30);
}


// Step 9: Add game over and restart functionality

let isGameOver = false;

function checkGameOver() {
  for (const fruit of fruits) {
    if (fruit.y < 0) {
      isGameOver = true;
      break;
    }
  }
}

function displayGameOver() {
  ctx.font = '48px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
  ctx.font = '24px Arial';
  ctx.fillText('Click to restart', canvas.width / 2 - 70, canvas.height / 2 + 50);
}

function restartGame() {
  isGameOver = false;
  score = 0;
  fruits.length = 0;
  gameLoop();
}

canvas.addEventListener('click', () => {
  if (isGameOver) {
    restartGame();
  }
});



// Step 2: Create a game loop function

// Main game loop function
function gameLoop(timestamp) {
  // Calculate the time delta for consistent updates
  if (!lastTime) {
    lastTime = timestamp;
  }
  deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Call your game functions here (e.g., update(), draw(), etc.)

      if (isGameOver) {
      displayGameOver();
      return;
      }

     // Call the detectSlicing function to detect slicing of fruits
      detectSlicing();
      // Update and draw all fruits in the fruits array
      updateAndDrawFruits();
      // Call the drawSlash function to draw the slash effect
      drawSlash();

      // Display the current score
      displayScore();

       // Check if the game is over
      checkGameOver();

      // Update and draw the sample fruit
      sampleFruit.update();
      sampleFruit.draw();

  // Request the next frame for a smooth animation
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
