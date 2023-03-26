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

const squareSize = 100;
const squareColor = 'white';


let score = 0;
let score1 = 0;






// Define x and y coordinates for the squares
const square1X = circleX ;
const square1Y = circleY -50;
const square2X = circle2X ;
const square2Y = circle2Y -50;

let blackBallX = canvas.width / 2;
let blackBallY = canvas.height / 2;
let blackBallSpeedX = 5;
let blackBallSpeedY = 5;
const blackBallRadius = 10;

let collidedWithCircle1 = false;
let collidedWithCircle2 = false;
let collidedWithSquare1 = false;
let collidedWithSquare2 = false;


const sound = new Audio();
sound.src = 'ouchnoise-96832(1)(1).wav';
sound.type = 'audio/wav';
sound.play();

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
  ctx.arc(x, y, blackBallRadius, 0, Math.PI*2);
  ctx.fill();
}

///touch controls
function getTouchPosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.touches[0].clientX - rect.left,
    y: event.touches[0].clientY - rect.top
  };
}

canvas.addEventListener('touchstart', (event) => {
  const touchPosition = getTouchPosition(event);
  if (Math.sqrt((touchPosition.x - circleX)**2 + (touchPosition.y - circleY)**2) <= circleRadius) {
    isDraggingCircle1 = true;
  }
  if (Math.sqrt((touchPosition.x - circle2X)**2 + (touchPosition.y - circle2Y)**2) <= circleRadius) {
    isDraggingCircle2 = true;
  }
  previousMousePosition = touchPosition;
});

canvas.addEventListener('touchmove', (event) => {
  const touchPosition = getTouchPosition(event);
  if (isDraggingCircle1) {
    circleX += touchPosition.x - previousMousePosition.x;
    circleY += touchPosition.y - previousMousePosition.y;
    if (circleY > canvas.height/2 - circleRadius) {
      circleY = canvas.height/2 - circleRadius;
    }
  }
  if (isDraggingCircle2) {
    circle2X += touchPosition.x - previousMousePosition.x;
    circle2Y += touchPosition.y - previousMousePosition.y;
    if (circle2Y < canvas.height/2 + circleRadius) {
      circle2Y = canvas.height/2 + circleRadius;
    }
  }
  previousMousePosition = touchPosition;
});

canvas.addEventListener('touchend', (event) => {
  isDraggingCircle1 = false;
  isDraggingCircle2 = false;
});



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
  

/// touch collision funtions////

function checkCollision(touchX, touchY) {
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
    blackBallSpeedX *= -1;
    blackBallSpeedY *= -1;
    blackBallX += blackBallSpeedX;
    blackBallY += blackBallSpeedY;
  }

  if (
    blackBallX >= square2X &&
    blackBallX <= square2X + squareSize &&
    blackBallY >= square2Y &&
    blackBallY <= square2Y + squareSize
  ) {
    blackBallSpeedX *= -1;
    blackBallSpeedY *= -1;
    blackBallX += blackBallSpeedX;
    blackBallY += blackBallSpeedY;
  }
  
  // Check for collision with touch
  const distanceToTouch = Math.sqrt((blackBallX - touchX) ** 2 + (blackBallY - touchY) ** 2);
  if (distanceToTouch < blackBallRadius + 25) {
    blackBallSpeedX *= -1;
    blackBallSpeedY *= -1;
    blackBallX += blackBallSpeedX;
    blackBallY += blackBallSpeedY;
  }
}





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
    
      score += 1; // Increment score by 1 
      sound.play();
     
   }
  
    if (
      blackBallX >= square2X &&
      blackBallX <= square2X + squareSize &&
      blackBallY >= square2Y &&
      blackBallY <= square2Y + squareSize
    ) {
      
      score1 += 1; // Increment score by 1
      sound.play();
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
    if (checkCollision(blackBallX, blackBallY, square1X, square1Y, squareSize) ||
        checkCollision(blackBallX, blackBallY, square2X, square2Y, squareSize)) {
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


  // Draw the score
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 30);

  // Draw the score1
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score1, 10, canvas.height - 10);


  
  
    requestAnimationFrame(render);
  }
  
  
  render();
  