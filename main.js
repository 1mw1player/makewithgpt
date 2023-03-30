
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);


      const planeSize = 10;
      const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

      
      const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);

      const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
      const playerMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      const player = new THREE.Mesh(playerGeometry, playerMaterial);
      player.position.y = 0.5;
      scene.add(player);

      const light = new THREE.AmbientLight(0xffffff);
      scene.add(light);

      camera.position.set(0, 5, 10);
      camera.lookAt(scene.position);

      let score = 0;

      class Obstacle extends THREE.Mesh {
        constructor(position) {
          const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
          super(geometry, material);
          this.position.copy(position);
          this.box = new THREE.Box3().setFromObject(this);
        }
      }


      function spawnObstacles() {
  // Randomly spawn new obstacles with a certain probability
  if (Math.random() < 0.1) {
    const position = new THREE.Vector3(
      THREE.MathUtils.randFloat(-planeSize / 2, planeSize / 2),
      0.5,
      THREE.MathUtils.randFloat(-planeSize / 2, planeSize / 2)
    );
    const obstacle = new Obstacle(position);
    obstacles.push(obstacle);
    scene.add(obstacle);
  }

  // Update the position and bounding box of each obstacle
  for (const obstacle of obstacles) {
    obstacle.position.z += 0.1;
    obstacle.box.setFromObject(obstacle);
    if (obstacle.position.z > planeSize / 2) {
      // Remove the obstacle if it goes off the top edge of the plane
      scene.remove(obstacle);
      obstacles.splice(obstacles.indexOf(obstacle), 1);
    } else if (playerBox.intersectsBox(obstacle.box)) {
      // Remove the obstacle and reduce player health by 1 if there is a collision
      scene.remove(obstacle);
      obstacles.splice(obstacles.indexOf(obstacle), 1);
      playerHealth -= 1;
      healthDisplay.innerText = `Health: ${playerHealth}`;
    }
  }
}

      




      // Define the player's bounding box
const playerBox = new THREE.Box3().setFromObject(player);

// Define the ground's bounding box
const groundBox = new THREE.Box3().setFromObject(plane);

function checkCollision() {
  if (playerBox.intersectsBox(groundBox)) {
    player.position.y = 0.5;
  }
}

let targetRotation = 0;
const playerVelocity = new THREE.Vector3();



document.addEventListener('mousedown', onMouseDown, false);


function onMouseDown(event) {
    // Calculate the intersection point between the mouse ray and the ground plane
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
  }

  const obstacles = [];

  function gameLoop() {

// Randomly spawn new obstacles with a certain probability
if (Math.random() < 0.1) {
    const position = new THREE.Vector3(
      THREE.MathUtils.randFloat(-planeSize/2, planeSize/2),
      0.5,
      THREE.MathUtils.randFloat(-planeSize/2, planeSize/2)
    );
    const obstacle = new Obstacle(position);
    obstacles.push(obstacle);
    scene.add(obstacle);
  }

  // Update the position and bounding box of each obstacle
  for (const obstacle of obstacles) {
    obstacle.position.z += 0.1;
    obstacle.box.setFromObject(obstacle);
    if (obstacle.position.z > planeSize/2) {
      // Remove the obstacle if it goes off the top edge of the plane
      scene.remove(obstacle);
      obstacles.splice(obstacles.indexOf(obstacle), 1);
    }
  }

    checkCollision();
  
    // Calculate the player's new position based on its velocity
    const newPosition = new THREE.Vector3().copy(player.position).add(playerVelocity);
  
    // Clamp the player's new position to the edges of the plane
    const halfSize = planeSize / 2;
    newPosition.x = THREE.MathUtils.clamp(newPosition.x, -halfSize, halfSize);
    newPosition.z = THREE.MathUtils.clamp(newPosition.z, -halfSize, halfSize);
  
    // Update the player's position and rotation
    player.position.copy(newPosition);
    player.rotation.y += (targetRotation - player.rotation.y) * 0.1;
  
    renderer.render(scene, camera);
    requestAnimationFrame(gameLoop);
  }
  

      gameLoop();

      

    