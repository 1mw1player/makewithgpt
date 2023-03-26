// Part 1: Creating the canvas and context

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Part 2: Creating the paddles

let paddle1X = 20;
let paddle1Y = canvas.height / 2;
let paddle2X = canvas.width - 20;
let paddle2Y = canvas.height / 2;
const paddleRadius = 30;

// Part 3: Creating the ball

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeed = 5;
let ballVelocityX = Math.random() < 0.5 ? -ballSpeed : ballSpeed;
let ballVelocityY = Math.random() < 0.5 ? -ballSpeed : ballSpeed;

// Part 4: Drawing the game objects

function draw() {
// Clear the canvas
context.clearRect(0, 0, canvas.width, canvas.height);

// Draw the paddles
context.beginPath();
context.arc(paddle1X, paddle1Y, paddleRadius, 0, Math.PI * 2);
context.fillStyle = "blue";
context.fill();
context.closePath();

context.beginPath();
context.arc(paddle2X, paddle2Y, paddleRadius, 0, Math.PI * 2);
context.fillStyle = "red";
context.fill();
context.closePath();

// Draw the ball
context.beginPath();
context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
context.fillStyle = "black";
context.fill();
context.closePath();
}

// Part 5: Moving the paddles with the mouse

canvas.addEventListener("mousemove", (event) => {
paddle1Y = event.clientY;
});

// Part 6: Moving the ball and detecting collisions

function moveBall() {
ballX += ballVelocityX;
ballY += ballVelocityY;

// Detect collision with the left paddle
if (
ballX - ballRadius <= paddle1X + paddleRadius &&
ballY >= paddle1Y - paddleRadius &&
ballY <= paddle1Y + paddleRadius
) {
ballVelocityX = -ballVelocityX;
ballVelocityY = (ballY - paddle1Y) * 0.2;
}

// Detect collision with the right paddle
if (
ballX + ballRadius >= paddle2X - paddleRadius &&
ballY >= paddle2Y - paddleRadius &&
ballY <= paddle2Y + paddleRadius
) {
ballVelocityX = -ballVelocityX;
ballVelocityY = (ballY - paddle2Y) * 0.2;
}

// Detect collision with the top wall
if (ballY - ballRadius <= 0) {
ballVelocityY = -ballVelocityY;
}

// Detect collision with the bottom wall
if (ballY + ballRadius >= canvas.height) {
ballVelocityY = -ballVelocityY;
}
}

// Part 7: Animating the game

function animate() {
// Move the ball
moveBall();

// Draw the game objects
draw();

// Request the next frame
requestAnimationFrame(animate);
}

// Initialize the game
function init() {
canvas.width = 800;
canvas.height = 600;

animate();
}

init();