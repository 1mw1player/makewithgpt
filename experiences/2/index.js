const gravity = 0.2; // Adjust this value to change how fast the fruits fall
const defaultsize = 100;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const fruits = [];
const fruitImages = [
  'images/apple.png',
  'images/orange.png',
  //'images/banana.png'
];


class Fruit {
  constructor(x, y, velocityX, velocityY, imageSrc, width = defaultsize, height = defaultsize) {
      this.x = x;
      this.y = y;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.image = new Image();
      this.image.src = imageSrc;
      this.sliced = false;
      this.width = width;
      this.height = height;
  }

  update() {
      this.x += this.velocityX;
      this.velocityY += gravity; // Gravity will affect the fruit's vertical velocity
      this.y += this.velocityY;
  }

  draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}


function spawnFruit() {
    const imageSrc = fruitImages[Math.floor(Math.random() * fruitImages.length)];
    const x = Math.random() * (canvas.width - 100) + 50;
    const y = canvas.height;
    const velocityX = Math.random() * 2 - 2;
    const velocityY = -Math.random() * 5 - 10;
    
    fruits.push(new Fruit(x, y, velocityX, velocityY, imageSrc));
}

function updateFruits() {
    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];

        fruit.update();
        
        // If the fruit is sliced, skip the draw() method call
        if (!fruit.sliced) {
            fruit.draw();
        }

        // Check if the fruit has fallen off the screen, and if so, remove it from the array
        if (fruit.y > canvas.height) {
            fruits.splice(i, 1);
            i--; // Decrement the index to avoid skipping over a fruit
            if (!fruit.sliced) {
              loseLife();
          }
        }
    }
}


// Randomly spawn fruits at intervals
setInterval(spawnFruit, 1000); // Adjust the interval to control the fruit spawn rate

function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function checkSlicing(x, y) {
  for (let i = 0; i < fruits.length; i++) {
      const fruit = fruits[i];
      const dist = distance(x, y, fruit.x + fruit.image.width / 2, fruit.y + fruit.image.height / 2);

      if (dist < fruit.image.width / 2 && !fruit.sliced) {
          fruit.sliced = true;
          incrementScore(); // Increment the score when a fruit is sliced
          // Increment score, play sound, or show visual effects here
      }
  }
}

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  checkSlicing(x, y);
});

let score = 0;

function incrementScore() {
    score++;
}

function drawScore() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 10, 30);
}

let lives = 3;

function loseLife() {
    lives--;
}

function drawLives() {
    const fontSize = Math.max(Math.min(canvas.width, canvas.height) / 20, 12);
    const x = canvas.width - (fontSize * 7); // Set x position to 7 times the font size from the right edge of the canvas
    const y = fontSize * 1.5; // Set y position to 1.5 times the font size from the top edge of the canvas
    
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Lives: ' + lives, x, y);
}


function gameOver() {
    return lives <= 0;
}

function restartGame() {
    console.log("restartGame")
    score = 0;
    lives = 3;
    fruits.length = 0;
    gameLoop();
}

canvas.addEventListener('click', (event) => {
    console.log("click")
    if (gameOver()) {
        restartGame();
    }
});



function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Update game objects
    updateFruits();

    // Draw game objects
    drawScore();
    drawLives();
    
    // Request the next frame if the game is not over
    if (!gameOver()) {
      requestAnimationFrame(gameLoop);
    } else {
      ctx.font = '48px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
      ctx.font = '24px Arial';
      ctx.fillText('Click to Restart', canvas.width / 2 - 75, canvas.height / 2 + 40);
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate font size based on the new canvas size
    const fontSize = Math.min(canvas.width, canvas.height) / 20; // You can adjust the font size by changing the divisor (20)

    // Set the font size for the score and lives text
    ctx.font = fontSize + 'px Arial';

    // Redraw the score and lives text
    drawScore();
    drawLives();
}
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
  
  resizeCanvas();
  gameLoop();
  

gameLoop(); // Start the game loop