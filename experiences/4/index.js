const canvas4 = document.getElementById('gameCanvas');

// Set the canvas dimensions to the window dimensions
canvas4.width = window.innerWidth-40;
canvas4.height = window.innerHeight-40;
canvas4.style.border = "20px solid white";

// Get the 2D context of the canvas
const context = canvas4.getContext('2d');



// Create a mouse click position variable
let mouseClickPosition = null;

// Create a counter for destroyed players
let destroyedPlayers = 0;


let bullets = [];
let enemies = [];

let showMessage = false;
let message = '';

let colorParts = new Array(10).fill('white');


let player = {
  x: canvas4.width / 2,
  y: canvas4.height / 2,
  size: 10,
  angle: 0,
  speed: 2,
  color: 'red',
  colorParts: new Array(10).fill('white')
};



function spawnPlayer() {
  if (destroyedPlayers >= 3) {
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
    color: player.color, // Set the color of the new player object
    colorParts: new Array(10).fill('white')
  };
}




  
  

function Enemy(x, y, speed) {

    this.x = x;
    this.y = y;
    this.size = player.size;
    this.color = 'blue';
    this.speed = speed;
    this.active = true;
  }





let lastSpawnTime = Date.now(); // Add a variable to track the last spawn time

function spawnEnemies() {
  // Spawn new enemies around the player, further away
  for (let i = 0; i < 5; i++) {
    let x = player.x + Math.random() * 600 - 150;
    let y = player.y + Math.random() * 600 - 150;
    let speed = Math.random() + 1;
    let enemy = new Enemy(x, y, speed);
    enemies.push(enemy);
  }
}

function checkCollision(a, b) {
  const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  return distance < a.size + b.size;
}

let isPlayerRestricted = false;

function update() {
  if (player.color === 'red') {
    if (mouseClickPosition) {
      const dx = mouseClickPosition.x - player.x;
      const dy = mouseClickPosition.y - player.y;
      player.angle = Math.atan2(dy, dx);
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    let dx = player.x - enemies[i].x;
    let dy = player.y - enemies[i].y;
    let angle = Math.atan2(dy, dx);
    enemies[i].x += enemies[i].speed * 0.25 * Math.cos(angle);
    enemies[i].y += enemies[i].speed * 0.25 * Math.sin(angle);
  }

  player.x += player.speed * Math.cos(player.angle);
  player.y += player.speed * Math.sin(player.angle);

  if (isPlayerRestricted) {
    player.x = Math.max(0 + player.size / 2, Math.min(player.x, canvas4.width - player.size / 2));
    player.y = Math.max(0 + player.size / 2, Math.min(player.y, canvas4.height - player.size / 2));
  }

  if (destroyedPlayers < 3 && (player.x < 0 || player.x > canvas4.width || player.y < 0 || player.y > canvas4.height)) {
    destroyedPlayers++;
    spawnPlayer();
  } else if (destroyedPlayers >= 3) {
    isPlayerRestricted = true;
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        destroyedPlayers++;
        break;
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (checkCollision(player, enemies[i])) {
      enemies.splice(i, 1);
      if (destroyedPlayers > 0) {
        destroyedPlayers--;
      }
      // Update player color parts
      let partsToChange = Math.min(10, destroyedPlayers);
      for (let j = 0; j < partsToChange; j++) {
        player.colorParts[j] = 'red';
      }
      // Update player color if all parts are red
      if (player.colorParts.every(part => part === 'red')) {
        player.color = 'red';
      }
    }
  }

  if (Date.now() - lastSpawnTime > 5000) {
    spawnEnemies();
    lastSpawnTime = Date.now();
  }
}


function render() {
  // Clear the canvas
  context.clearRect(0, 0, canvas4.width, canvas4.height);

  // Draw the player as a square with color parts
  context.save();
  context.translate(player.x, player.y);
  context.rotate(player.angle);

  for (let i = 0; i < 10; i++) {
    context.fillStyle = player.colorParts[i];
    context.fillRect(-player.size / 2 + (i * player.size / 10), -player.size / 2, player.size / 10, player.size);
  }

  context.restore();

  // Draw the bullets
  for (let i = 0; i < bullets.length; i++) {
    context.fillStyle = bullets[i].color;
    context.beginPath();
    context.arc(bullets[i].x, bullets[i].y, bullets[i].size, 0, 2 * Math.PI);
    context.fill();
  }

  // Move the bullets
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += bullets[i].speed * Math.cos(bullets[i].angle);
    bullets[i].y += bullets[i].speed * Math.sin(bullets[i].angle);
  }

  // Draw the enemies as triangles
  for (let i = 0; i < enemies.length; i++) {
    context.save();
    context.translate(enemies[i].x, enemies[i].y);
    context.rotate(enemies[i].angle);
    context.fillStyle = enemies[i].color;
    context.beginPath();
    context.moveTo(-enemies[i].size / 2, -enemies[i].size / 2);
    context.lineTo(0, enemies[i].size / 2);
    context.lineTo(enemies[i].size / 2, -enemies[i].size / 2);
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
  context.fillText(`Score: ${destroyedPlayers}`, canvas4.width / 2, 100);
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
    // Get the mouse click position relative to the canvas
    const rect = canvas4.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Set the mouseClickPosition to the mouse click position
    mouseClickPosition = { x, y };
  
    if (player.color === 'green') {


        // Calculate the angle to the mouse click position
    if (mouseClickPosition) {
      const dx = mouseClickPosition.x - player.x;
      const dy = mouseClickPosition.y - player.y;
      player.angle = Math.atan2(dy, dx);
  
      
      // Create a new bullet and add it to the bullets array
      let bullet = {
        x: player.x,
        y: player.y,
        size: 1,
        angle: player.angle,
        speed: 5,
        color: 'white'
      };
      bullets.push(bullet);
    }
  
   
     
    }
  
  
  });




// Add an event listener to the window to resize the canvas
window.addEventListener('resize', () => {
  canvas4.width = window.innerWidth;
  canvas4.height = window.innerHeight;
  
  if (player.color === 'green') { // If the player is blue, re-center them
    player.x = canvas4.width / 2;
    player.y = canvas4.height / 2;
  }
});

// Call the game loop to start the game
gameLoop();