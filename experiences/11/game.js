window.addEventListener('load', () => {
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const foregroundCanvas = document.getElementById('foregroundCanvas');
    const greenCanvas = document.getElementById('greenCanvas');
  
    const backgroundContext = backgroundCanvas.getContext('2d');
    const foregroundContext = foregroundCanvas.getContext('2d');
    const greenContext = greenCanvas.getContext('2d');
  
    resizeCanvas(backgroundCanvas);
    resizeCanvas(foregroundCanvas);
    resizeCanvas(greenCanvas);
  
    window.addEventListener('resize', () => {
      resizeCanvas(backgroundCanvas);
      resizeCanvas(foregroundCanvas);
      resizeCanvas(greenCanvas);
      drawCanvases();
    });
  
    function resizeCanvas(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function drawBackground() {
      backgroundContext.fillStyle = 'blue';
      backgroundContext.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    }
  
    function drawForeground() {
      foregroundContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
      foregroundContext.fillStyle = 'brown';
      const quarterWidth = backgroundCanvas.width / 4;
      const quarterHeight = backgroundCanvas.height / 4;
      foregroundContext.fillRect(0, backgroundCanvas.height - quarterHeight, quarterWidth, quarterHeight);
    }
  
    function drawGreen() {
      greenContext.clearRect(0, 0, greenCanvas.width, greenCanvas.height);
      greenContext.fillStyle = 'green';
      const circleRadius = Math.min(greenCanvas.width, greenCanvas.height) / 8;
      const circleX = greenCanvas.width / 2;
      const circleY = greenCanvas.height / 2;
      greenContext.beginPath();
      greenContext.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
      greenContext.closePath();
      greenContext.fill();
    }
  
    function drawCanvases() {
      drawBackground();
      drawForeground();
      drawGreen();
  
      // Render foregroundCanvas onto backgroundCanvas
      backgroundContext.drawImage(foregroundCanvas, 0, 0);
  
      // Render greenCanvas onto foregroundCanvas
      foregroundContext.drawImage(greenCanvas, 0, 0);
    }
  
    drawCanvases();
  });
  