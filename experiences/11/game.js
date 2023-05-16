window.addEventListener('load', () => {
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const foregroundCanvas = document.getElementById('foregroundCanvas');
  
    const context = backgroundCanvas.getContext('2d');
    const foregroundContext = foregroundCanvas.getContext('2d');
  
    resizeCanvas(backgroundCanvas);
    resizeCanvas(foregroundCanvas);
  
    window.addEventListener('resize', () => {
      resizeCanvas(backgroundCanvas);
      resizeCanvas(foregroundCanvas);
    });
  
    function resizeCanvas(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (canvas === backgroundCanvas) {
        drawBackground();
      } else {
        drawForeground();
      }
    }
  
    function drawBackground() {
      context.fillStyle = 'blue';
      context.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    }
  
    function drawForeground() {
      foregroundContext.fillStyle = 'red';
      const quarterWidth = backgroundCanvas.width / 4;
      const quarterHeight = backgroundCanvas.height / 4;
      foregroundContext.fillRect(0, backgroundCanvas.height - quarterHeight, quarterWidth, quarterHeight);
    }
  
    drawBackground();
    drawForeground();
  });
  