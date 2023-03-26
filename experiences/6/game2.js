const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'lightblue';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circleRadius = 20;
let circleX = canvas.width / 2;
let circleY = circleRadius + 10;
let circle2X = canvas.width / 2;
let circle2Y = canvas.height - circleRadius - 10;

let isDraggingCircle1 = false;
let isDraggingCircle2 = false;
let previousMousePosition = {};

const squareSize = 55;
const squareColor = 'white';

// Define x and y coordinates for the squares
const square1X = circleX - 25;
const square1Y = circleY - 25;
const square2X = circle2X - 25;
const square2Y = circle2Y - 25;

function drawCircle(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, circleRadius, 0, Math.PI*2);
  ctx.fill();
}

// Define drawSquare function to draw a square at given x and y coordinates with given color
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, squareSize, squareSize);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();
  // Call drawSquare twice to draw both squares
  drawSquare(square1X, square1Y, squareColor);
  drawSquare(square2X, square2Y, squareColor);
  drawCircle(circleX, circleY, 'red');
  drawCircle(circle2X, circle2Y, 'blue');
  requestAnimationFrame(render);
}

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener('mousedown', (event) => {
  const mousePosition = getMousePosition(event);
  if (Math.sqrt((mousePosition.x - circleX)**2 + (mousePosition.y - circleY)**2) <= circleRadius) {
    isDraggingCircle1 = true;
  }
  if (Math.sqrt((mousePosition.x - circle2X)**2 + (mousePosition.y - circle2Y)**2) <= circleRadius) {
    isDraggingCircle2 = true;
  }
  previousMousePosition = mousePosition;
});

canvas.addEventListener('mousemove', (event) => {
    const mousePosition = getMousePosition(event);
    if (isDraggingCircle1) {
      circleX += mousePosition.x - previousMousePosition.x;
      circleY += mousePosition.y - previousMousePosition.y;
      if (circleY > canvas.height/2 - circleRadius) {
        circleY = canvas.height/2 - circleRadius;
      }
    }
    if (isDraggingCircle2) {
      circle2X += mousePosition.x - previousMousePosition.x;
      circle2Y += mousePosition.y - previousMousePosition.y;
      if (circle2Y < canvas.height/2 + circleRadius) {
        circle2Y = canvas.height/2 + circleRadius;
      }
    }
    previousMousePosition = mousePosition;
  });
  

canvas.addEventListener('mouseup', (event) => {
  isDraggingCircle1 = false;
  isDraggingCircle2 = false;
});

// Draw two static squares of 50 pixels where the circles are
ctx.fillStyle = squareColor;
ctx.fillRect(circleX - squareSize / 2, circleY - squareSize / 2, squareSize, squareSize);
ctx.fillRect(circle2X - squareSize / 2, circle2Y - squareSize / 2, squareSize, squareSize);



render();
