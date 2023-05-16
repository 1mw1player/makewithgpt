const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

 let obstacles = [
            
   // First triangle
   { start: { x: 200, y: 100 }, end: { x: 400, y: 200 } },
   { start: { x: 400, y: 200 }, end: { x: 200, y: 300 } },
   { start: { x: 200, y: 300 }, end: { x: 200, y: 100 } },
 
   // Second triangle
   { start: { x: 600, y: 400 }, end: { x: 800, y: 500 } },
   { start: { x: 800, y: 500 }, end: { x: 600, y: 600 } },
   { start: { x: 600, y: 600 }, end: { x: 600, y: 400 } },
    ];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawObstacles() {
            ctx.strokeStyle = '#fff';
            obstacles.forEach(o => {
                ctx.beginPath();
                ctx.moveTo(o.start.x, o.start.y);
                ctx.lineTo(o.end.x, o.end.y);
                ctx.stroke();
            });
        }

        
        function castLight(sourceX, sourceY) {
            let rays = [];
            let maxDist = Math.hypot(canvas.width, canvas.height);
            let startAngle = -45; // Adjust the starting angle of the rays
            let endAngle = 45; // Adjust the ending angle of the rays
            for (let i = startAngle; i <= endAngle; i += 1) { // Iterate within the desired angle range
                let rad = Math.PI / 180 * i;
                let ray = { x: sourceX + maxDist * Math.cos(rad), y: sourceY + maxDist * Math.sin(rad) };
                let closestIntersection = null;
        
                obstacles.forEach(obstacle => {
                    let denom = (sourceX - ray.x) * (obstacle.start.y - obstacle.end.y) -
                                (sourceY - ray.y) * (obstacle.start.x - obstacle.end.x);
                    let t = ((sourceX - obstacle.start.x) * (obstacle.start.y - obstacle.end.y) -
                             (sourceY - obstacle.start.y) * (obstacle.start.x - obstacle.end.x)) / denom;
                    let u = -((sourceX - ray.x) * (sourceY - obstacle.start.y) -
                              (sourceY - ray.y) * (sourceX - obstacle.start.x)) / denom;
                    if (t > 0 && t < 1 && u > 0) {
                        let pt = {
                            x: sourceX + t * (ray.x - sourceX),
                            y: sourceY + t * (ray.y - sourceY)
                        };
                        if (!closestIntersection || Math.hypot(sourceX - pt.x, sourceY - pt.y) <
                            Math.hypot(sourceX - closestIntersection.x, sourceY - closestIntersection.y)) {
                            closestIntersection = pt;
                        }
                    }
                });
        
                // If there are no obstacles or an intersection was found, add the ray
                if (!obstacles.length || closestIntersection) {
                    rays.push(closestIntersection || ray);
                }
            }
        
            if (!rays[0]) return;

              // Sort rays based on angle relative to the light source
            rays.sort((a, b) => {
            let angleA = Math.atan2(a.y - sourceY, a.x - sourceX);
            let angleB = Math.atan2(b.y - sourceY, b.x - sourceX);
            return angleA - angleB;
                });
        
            ctx.beginPath();
            ctx.moveTo(rays[0].x, rays[0].y);
            rays.forEach(ray => ctx.lineTo(ray.x, ray.y));
            ctx.closePath();
        
            let gradient = ctx.createRadialGradient(sourceX, sourceY, .1, sourceX, sourceY, 100)//canvas.width);
            //gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            //gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0, 'rgba(255, 100, 100, 1)');  // red at the center
            gradient.addColorStop(1, 'rgba(255, 100, 100, 0)');  // fades to transparent
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        

        function animate(e) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
           
            //castLight(canvas.width / 2, canvas.height / 2);  // fixed light source at center of canvascastLight(canvas.width / 2, canvas.height / 2);  // fixed light source at center of canvas
            castLight(e.clientX, e.clientY);
            drawObstacles();
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', animate);

        resizeCanvas();
        animate({ clientX: canvas.width / 2, clientY: canvas.height / 2 });