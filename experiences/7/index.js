

const canvas4 = document.getElementById('gameCanvas');

// Set the canvas dimensions to the window dimensions
canvas4.width = window.innerWidth-40;
canvas4.height = window.innerHeight-40;
canvas4.style.border = "20px solid white";

// Get the 2D context of the canvas
const context = canvas4.getContext('2d');

// Create a player object
let player = {
  x: canvas4.width / 2,
  y: canvas4.height / 2,
  size: 10,
  angle: 0,
  speed: 2,
  color: 'red' // New property to store the color of the player
};

// Create a mouse click position variable
let mouseClickPosition = null;

// Create a counter for destroyed players
let destroyedPlayers = 0;

function Enemy(x, y, speed) {
  this.x = x;
  this.y = y;
  this.size = player.size;
  this.color = 'blue';
  this.speed = speed;
}

let enemies = [];






// Function to spawn a new player
function spawnPlayer() {
  if (destroyedPlayers >=5) {
    player.color = 'green'; // Change the color of the player if the score is 5 or greater
    player.speed = 2; 


    // Spawn new enemies around the player, further away
    for (let i = 0; i < 5; i++) {
      let x = player.x + Math.random() * 600 - 150;
      let y = player.y + Math.random() * 600 - 150;
      let speed = Math.random() + 1;
      let enemy = new Enemy(x, y, speed);
      enemies.push(enemy);
    }
  
  } else {
    player.color = 'red'; // Otherwise, set the color to red
    player.speed = 2; // Set the player speed back to 5 if they turn red
  }
  
  player = {
    x: canvas4.width / 2,
    y: canvas4.height / 2,
    size: 10,
    angle: 0,
    speed: player.speed,
    color: player.color // Set the color of the new player object
  };

  


}

let message = '';

function update() {
  if (player.color === 'red') {
    // Calculate the angle to the mouse click position
    if (mouseClickPosition) {
      const dx = mouseClickPosition.x - player.x;
      const dy = mouseClickPosition.y - player.y;
      player.angle = Math.atan2(dy, dx);
    }
  }
  if (player.color === 'green') {
    // Calculate the angle to the mouse click position
    if (mouseClickPosition) {
      const dx = mouseClickPosition.x - player.x;
      const dy = mouseClickPosition.y - player.y;
      player.angle = Math.atan2(dy, dx);
    }
  }

// Move the enemies towards the player, but at a slower speed
for (let i = 0; i < enemies.length; i++) {
  let dx = player.x - enemies[i].x;
  let dy = player.y - enemies[i].y;
  let angle = Math.atan2(dy, dx);
  enemies[i].x += enemies[i].speed * 0.25 * Math.cos(angle);
  enemies[i].y += enemies[i].speed * 0.25 * Math.sin(angle);
}


  // Move the player towards the mouse click position
  if (player.color === 'red') {
    player.x += player.speed * Math.cos(player.angle);
    player.y += player.speed * Math.sin(player.angle);
  }

  if (player.color === 'green') {
    player.x += player.speed * Math.cos(player.angle);
    player.y += player.speed * Math.sin(player.angle);
  }


  // Check if the player has reached the edge of the canvas
  if (player.x < 0 || player.x > canvas4.width || player.y < 0 || player.y > canvas4.height) {
    destroyedPlayers++;

    if (destroyedPlayers % 5 === 0) {
      spawnPlayer();
      spawnPlayer();
    } else {
      spawnPlayer();
    }
  }
}



  
// Function to render the game
function render() {
  // Clear the canvas
  context.clearRect(0, 0, canvas4.width, canvas4.height);

  // Draw the player as a red square
  context.save();
  context.translate(player.x, player.y);
  context.rotate(player.angle);
  // Draw the player as a red or blue square, depending on the value of player.color
  context.fillStyle = player.color;
  context.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
  context.restore();

// Draw the enemies as triangles
for (let i = 0; i < enemies.length; i++) {
  context.save();
  context.translate(enemies[i].x, enemies[i].y);
  context.rotate(player.angle);
  context.fillStyle = enemies[i].color;
  context.beginPath();
  context.moveTo(-enemies[i].size / 2, -enemies[i].size / 2);
  context.lineTo(-enemies[i].size / 2, enemies[i].size / 2);
  context.lineTo(enemies[i].size / 2, 0);
  context.closePath();
  context.fill();
  context.restore();
}

  // Draw the text at the top of the canvas
  context.fillStyle = 'white';
  context.font = 'bold 20px Arial';
  context.textAlign = 'center';
  context.fillText('Annoying AI GAME', canvas4.width / 2, 50);

  // Draw the counter at the bottom of the canvas
  context.fillStyle = 'white';
  context.font = 'bold 20px Arial';
  context.textAlign = 'center';
  context.fillText(`Score: ${destroyedPlayers}`, canvas4.width / 2,100);

  // Draw the message if the player is blue
  if (player.color === 'green') {
    message = 'Patience is a Virtue';
    context.fillStyle = 'white';
    context.font = 'bold 16px Arial';
    context.textAlign = 'center';
    context.fillText(message, canvas4.width / 2, canvas4.height / 2 + 50);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      message = '';
    }, 3000);
  }
  
  

}

// Function to update and render the game
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Add an event listener to the canvas to store the mouse click position
canvas4.addEventListener('click', (event) => {
  mouseClickPosition = { x: event.clientX, y: event.clientY };
});

// Add an event listener to the window to resize the canvas
window.addEventListener('resize', () => {
  canvas4.width = window.innerWidth;
  canvas4.height = window.innerHeight;
  if (player.color === 'blue') { // If the player is blue, re-center them
    player.x = canvas4.width / 2;
    player.y = canvas4.height / 2;
  }
});

// Call the game loop to start the game
gameLoop();