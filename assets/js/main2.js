// Three.js initialization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Plane
const planeGeometry = new THREE.PlaneGeometry(15, 15, 10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC, wireframe: true });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(-Math.PI / 2);
scene.add(plane);

// Player
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 0.5, 0);
scene.add(player);

// Obstacle
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
obstacle.position.set(0, 0.5, -10);



// Obstacle movement
let obstacleSpeed = 0.05;
let obstacleDirection = 1;

// Array to store all obstacles
const obstacles = [];



// Randomly spawn obstacles
function spawnObstacle() {
  const newObstacle = obstacle.clone();
  newObstacle.position.x = Math.random() * 20 - 10;
  newObstacle.position.z = Math.random() * 20 - 10;
  newObstacle.speed = Math.random() * 0.1 + 0.05; // Random speed between 0.05 and 0.15
  newObstacle.direction = Math.random() > 0.5 ? 1 : -1; // Random direction (1 or -1)
  scene.add(newObstacle);
  obstacles.push(newObstacle);
}

for (let i = 0; i < 10; i++) {
  spawnObstacle();
}




// Camera
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);


// Player movement
const playerVelocity = new THREE.Vector3();
const playerSpeed = 0.1;
let targetRotation = 0;
const rotationSpeed = 0.1;

// Score
let score = 100;
const scoreText = document.createElement('div');
scoreText.style.position = 'absolute';
scoreText.style.top = '10px';
scoreText.style.left = '10px';
scoreText.style.color = 'white';
scoreText.style.fontSize = '24px';
scoreText.innerHTML = `Score: ${score}`;
document.body.appendChild(scoreText);



// Move player on mouse click
document.addEventListener('mousedown', (event) => {
  const mousePosition = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mousePosition, camera);
  const intersection = raycaster.intersectObject(plane)[0].point;

  // Set the player's velocity towards the intersection point
  playerVelocity.copy(intersection).sub(player.position).normalize().multiplyScalar(0.1);

  // Calculate the target rotation for the player
  const playerDirection = new THREE.Vector3().subVectors(intersection, player.position).normalize();
  targetRotation = Math.atan2(playerDirection.x, playerDirection.z);
});





// Render loop
function render() {
  requestAnimationFrame(render);
  
 

  // Move all obstacles
  obstacles.forEach((obstacle) => {
    obstacle.position.z += obstacle.speed * obstacle.direction;
    if (obstacle.position.z > 10 || obstacle.position.z < -10) {
      obstacle.direction = -obstacle.direction;
    }
  });

  // Move red cube
  if (playerVelocity.length() > 0) {
    player.position.add(playerVelocity);
    const playerRotation = player.rotation.y;
    const deltaRotation = targetRotation - playerRotation;
    if (deltaRotation !== 0) {
      const direction = deltaRotation > 0 ? 1 : -1;
      player.rotation.y += 0.05 * direction;
      if (Math.abs(deltaRotation) < 0.05) {
        player.rotation.y = targetRotation;
      }
    }
    playerVelocity.multiplyScalar(0.95);
    if (playerVelocity.length() < 0.01) {
      playerVelocity.set(0, 0, 0);
    }
  }

  // Check for collision
const playerBox = new THREE.Box3().setFromObject(player);
scene.children.forEach((child) => {
  if (child === player || child === plane || child === scoreText) {
    return;
  }
  const obstacleBox = new THREE.Box3().setFromObject(child);
  if (playerBox.intersectsBox(obstacleBox)) {
    score -= 1;
    scoreText.innerHTML = `Score: ${score}`;
    child.position.z = Math.random() * 20 - 10;
    child.position.x = Math.random() * 20 - 10; // Spawn obstacle randomly
  }
});




  renderer.render(scene, camera);
}

render();


