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
let circleSpeedX = 5;
let circleSpeedY = 5;

let isDraggingCircle1 = false;
let isDraggingCircle2 = false;
let previousMousePosition = {};

const squareSize = 80;
const squareColor = 'white';



// Define x and y coordinates for the squares
// Define x and y coordinates for the squares
const square1X = canvas.width / 2;
const square1Y = 0; // Top of the canvas
const square2X = canvas.width / 2;
const square2Y = canvas.height - squareSize; // Bottom of the canvas, assuming you have a squareSize variable

let blackBallX = canvas.width / 2;
let blackBallY = canvas.height / 2;
let blackBallSpeedX = 5;
let blackBallSpeedY = 5;
const blackBallRadius = 25;

let collidedWithCircle1 = false;
let collidedWithCircle2 = false;
let collidedWithSquare1 = false;
let collidedWithSquare2 = false;


///Drawing funtions///

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

function drawBlackBall(x, y) {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(x, y, 5, 0, Math.PI*2);
  ctx.fill();
}

///mouse funtions///

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

///touch funtions///

// Create an object to hold active touches
let activeTouches = {};

function getTouchPosition(touch, canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    for (let touch of event.changedTouches) {
        const touchPosition = getTouchPosition(touch, canvas);
        if (Math.sqrt((touchPosition.x - circleX)**2 + (touchPosition.y - circleY)**2) <= circleRadius) {
            activeTouches[touch.identifier] = { circle: 'circle1', previousTouchPosition: touchPosition };
        } else if (Math.sqrt((touchPosition.x - circle2X)**2 + (touchPosition.y - circle2Y)**2) <= circleRadius) {
            activeTouches[touch.identifier] = { circle: 'circle2', previousTouchPosition: touchPosition };
        }
    }
}, {passive: false});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    for (let touch of event.changedTouches) {
        if (touch.identifier in activeTouches) {
            const touchPosition = getTouchPosition(touch, canvas);
            const previousTouchPosition = activeTouches[touch.identifier].previousTouchPosition;
            if (activeTouches[touch.identifier].circle === 'circle1') {
                circleX += touchPosition.x - previousTouchPosition.x;
                circleY += touchPosition.y - previousTouchPosition.y;
                if (circleY > canvas.height/2 - circleRadius) {
                    circleY = canvas.height/2 - circleRadius;
                }
            } else if (activeTouches[touch.identifier].circle === 'circle2') {
                circle2X += touchPosition.x - previousTouchPosition.x;
                circle2Y += touchPosition.y - previousTouchPosition.y;
                if (circle2Y < canvas.height/2 + circleRadius) {
                    circle2Y = canvas.height/2 + circleRadius;
                }
            }
            activeTouches[touch.identifier].previousTouchPosition = touchPosition;
        }
    }
}, {passive: false});

canvas.addEventListener('touchend', (event) => {
    event.preventDefault();
    for (let touch of event.changedTouches) {
        if (touch.identifier in activeTouches) {
            delete activeTouches[touch.identifier];
        }
    }
}, {passive: false});


///collision funtions////

let score1 = 0; // Score for the left side
let score2 = 0; // Score for the right side

function checkCollision() {
    // Check for collision with the red circle
    const distanceToCircle1 = Math.sqrt((blackBallX - circleX) ** 2 + (blackBallY - circleY) ** 2);
    if (distanceToCircle1 < circleRadius + 25) {
      blackBallSpeedX *= -1;
      blackBallSpeedY *= -1;
      blackBallX += blackBallSpeedX;
      blackBallY += blackBallSpeedY;
    }
  
    // Check for collision with the blue circle
    const distanceToCircle2 = Math.sqrt((blackBallX - circle2X) ** 2 + (blackBallY - circle2Y) ** 2);
    if (distanceToCircle2 < circleRadius + 25) {
      blackBallSpeedX *= -1;
      blackBallSpeedY *= -1;
      blackBallX += blackBallSpeedX;
      blackBallY += blackBallSpeedY;
    }
  
    // Check for collision with the white squares
    if (
      blackBallX >= square1X &&
      blackBallX <= square1X + squareSize &&
      blackBallY >= square1Y &&
      blackBallY <= square1Y + squareSize
    ) {
      blackBallX = canvas.width / 2;
      blackBallY = canvas.height / 2;
      score1 = 0; // Reset score for the left side
      score2++; // Increase score for the right side
    }
  
    if (
      blackBallX >= square2X &&
      blackBallX <= square2X + squareSize &&
      blackBallY >= square2Y &&
      blackBallY <= square2Y + squareSize
    ) {
      blackBallX = canvas.width / 2;
      blackBallY = canvas.height / 2;
      score2 = 0; // Reset score for the right side
      score1++; // Increase score for the left side
    }
  }
  


///render funtions////


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Check for collision with red circle
    if (checkCollision(blackBallX, blackBallY, circleX, circleY, circleRadius)) {
      blackBallSpeedX *= -1;
      blackBallSpeedY *= -1;
      blackBallX += blackBallSpeedX;
      blackBallY += blackBallSpeedY;
    }
    
    // Check for collision with blue circle
    if (checkCollision(blackBallX, blackBallY, circle2X, circle2Y, circleRadius)) {
      blackBallSpeedX *= -1;
      blackBallSpeedY *= -1;
      blackBallX += blackBallSpeedX;
      blackBallY += blackBallSpeedY;
    }

    // Check for collision with white squares
    if (
      blackBallX >= square1X &&
      blackBallX <= square1X + squareSize &&
      blackBallY >= square1Y &&
      blackBallY <= square1Y + squareSize
    ) {
      blackBallX = canvas.width / 2;
      blackBallY = canvas.height / 2;
    
    }
    
    if (
      blackBallX >= square2X &&
      blackBallX <= square2X + squareSize &&
      blackBallY >= square2Y &&
      blackBallY <= square2Y + squareSize
    ) {
      blackBallX = canvas.width / 2;
      blackBallY = canvas.height / 2;
     
    }
    
    // Draw the black ball and update its position
    drawBlackBall(blackBallX, blackBallY);
    blackBallX += blackBallSpeedX;
    blackBallY += blackBallSpeedY;
    if (blackBallX - 25 < 0 || blackBallX + 25 > canvas.width) {
      blackBallSpeedX *= -1;
    }
    if (blackBallY - 25 < 0 || blackBallY + 25 > canvas.height) {
      blackBallSpeedY *= -1;
    }
  
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
  
    drawSquare(square1X, square1Y, squareColor);
    drawSquare(square2X, square2Y, squareColor);
  
    drawCircle(circleX, circleY, 'red');
    drawCircle(circle2X, circle2Y, 'blue');

  
    let ctx1 = canvas.getContext('2d');
    ctx1.font = '20px Arial';
    ctx1.fillStyle = 'black';
    ctx1.textAlign = 'center';
    ctx1.fillText(`Score: ${score1}`, canvas.width / 4, 30); // Display score1
    ctx1.fillText(`Score: ${score2}`, (3 * canvas.width) / 4, 30); // Display score2

    
  
    requestAnimationFrame(render);
  }

  
  
  render();
  