import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const geometry = new THREE.BoxGeometry();
const material = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // red
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // green
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // blue
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // magenta
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // yellow
  new THREE.MeshBasicMaterial({ color: 0x00ffff })  // cyan
];
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.5, 0);
cube.rotation.y = THREE.MathUtils.degToRad(45);
cube.material.side = THREE.DoubleSide; // Show all faces of the cube
cube.direction = 1; // Initialize the direction to right

scene.add(cube);

let isMovingright = false;
let isMovingleft = false;
let isMovingup = false;
let isMovingdown = false;

function animate() {
  requestAnimationFrame(animate);

  if (isMovingright) {
    // Move the cube to the right by 0.1 units per frame
    cube.position.x += 0.1;
   
  }

  if (isMovingleft) {
    // Move the cube to the right by 0.1 units per frame
    cube.position.x += -0.1;
  }

  if (isMovingup) {
    // Move the cube to the up by 0.1 units per frame
    cube.position.z += 0.1;
  }

  if (isMovingdown) {
    // Move the cube to the down by 0.1 units per frame
    cube.position.z += -0.1;
  }




  renderer.render(scene, camera);
}

camera.position.set(0, 5, 10);
camera.lookAt(cube.position);

animate();

// Get references to the button and arrow elements
const button = document.getElementById('button3');
const arrow = document.getElementById('arrow3');



// Add event listeners for the mouse down and mouse up events on the button
button.addEventListener('mousedown', function() {
  isMovingright = true;
});

button.addEventListener('mouseup', function() {
  isMovingright = false;
});

// Get references to the button and arrow elements
const button1 = document.getElementById('button4');
const arrow1 = document.getElementById('arrow4');

// Add event listeners for the mouse down and mouse up events on the button
button1.addEventListener('mousedown', function() {
  isMovingleft = true;
});

button1.addEventListener('mouseup', function() {
  isMovingleft = false;
});

// Get references to the button and arrow elements
const button2 = document.getElementById('button2');
const arrow2 = document.getElementById('arrow2');

// Add event listeners for the mouse down and mouse up events on the button
button2.addEventListener('mousedown', function() {
  isMovingup = true;
});

button2.addEventListener('mouseup', function() {
  isMovingup = false;
});

// Get references to the button and arrow elements
const button3 = document.getElementById('button');
const arrow3 = document.getElementById('arrow');

// Add event listeners for the mouse down and mouse up events on the button
button3.addEventListener('mousedown', function() {
  isMovingdown = true;
});

button3.addEventListener('mouseup', function() {
  isMovingdown = false;
});




// Add event listener for window resize
window.addEventListener('resize', function() {
  // Update renderer size and aspect ratio of camera
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});