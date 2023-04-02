// Create a variable to keep track of the player's health
let playerHealth = 100;

// Get the canvas element
const canvas = document.getElementById("canvas");

// Set up the WebGL renderer
const renderer = new THREE.WebGLRenderer({ canvas });

// Set the viewport size
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a new scene
const scene = new THREE.Scene();

// Create a new camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Set the camera position
camera.position.z = 5;

// Add the camera to the scene
scene.add(camera);

// Create a new plane geometry
const geometry = new THREE.PlaneGeometry(5, 5);

// Create a new material with a color
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, // white color
    side: THREE.DoubleSide,
  });
  

// Create a new mesh with the geometry and material
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

// Create an array to store the enemies
const enemies = [];

// Create a function to spawn a new enemy
function spawnEnemy() {
  // Create a new enemy mesh
  const enemyMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  // Set the enemy position
  enemyMesh.position.set(
    Math.random() * 10 - 5, // Random x position between -5 and 5
    Math.random() * 10 - 5, // Random y position between -5 and 5
    0 // Always at z position 0
  );

  // Add the enemy to the scene
  scene.add(enemyMesh);

  // Add the enemy to the enemies array
  enemies.push(enemyMesh);
}

// Call the spawnEnemy function every 2 seconds
setInterval(spawnEnemy, 2000);

// Create a function to move the enemies
function moveEnemies() {
  // Loop through all the enemies in the enemies array
  for (let i = 0; i < enemies.length; i++) {
    // Move the enemy down by 0.1 units
    enemies[i].position.y -= 0.1;

    // Check if the enemy collides with the player
    if (
      enemies[i].position.distanceTo(mesh.position) < 1 &&
      playerHealth > 0
    ) {
      // Reduce the player's health by 1
      playerHealth--;

      // Update the health display
      document.getElementById("healthDisplay").innerHTML =
        "Health: " + playerHealth;

      // If the player's health reaches 0, end the game
      if (playerHealth === 0) {
        alert("Game over!");
        window.location.reload();
      }
    }

    // Remove the enemy if it goes off the bottom of the screen
    if (enemies[i].position.y < -5) {
      scene.remove(enemies[i]);
      enemies.splice(i, 1);
    }
  }
}

// Render the scene
function render() {
  requestAnimationFrame(render);

  // Move the enemies
  moveEnemies();

  // Render the scene
  renderer.render(scene, camera);
}
render();
