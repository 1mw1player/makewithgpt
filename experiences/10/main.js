const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        let polygons = [
            [
                { x: window.innerWidth - 150, y: 50 },
                { x: window.innerWidth - 50, y: 50 },
                { x: window.innerWidth - 50, y: 150 },
                { x: window.innerWidth - 150, y: 150 }
            ]
            // ... other polygons ...
        ];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        
            polygons = [
                [
                    {x: window.innerWidth - 150, y: 50},
                    {x: window.innerWidth - 50, y: 50},
                    {x: window.innerWidth - 50, y: 150},
                    {x: window.innerWidth - 150, y: 150}
                ]
            ];
        }
        

        function drawObstacles() {
            ctx.strokeStyle = '#fff';
            polygons.forEach(polygon => {
                ctx.beginPath();
                ctx.moveTo(polygon[0].x, polygon[0].y);
                for (let i = 1; i < polygon.length; i++) {
                    ctx.lineTo(polygon[i].x, polygon[i].y);
                }
                ctx.closePath();
                ctx.stroke();
            });
        }

        
        
        function castLight(sourceX, sourceY) {
            let rays = [];
            let maxDist = Math.hypot(canvas.width, canvas.height);
          
            polygons.forEach((polygon) => {
              polygon.forEach((vertex, index) => {
                // Cast two rays per vertex
                let angles = [Math.atan2(vertex.y - sourceY, vertex.x - sourceX)];
                angles.push(angles[0] - 0.00001, angles[0] + 0.00001);
                angles.forEach((angle) => {
                  let ray = {
                    x: sourceX + maxDist * Math.cos(angle),
                    y: sourceY + maxDist * Math.sin(angle),
                  };
                  let closestIntersection = null;
                  let intersectsEdge = false;
          
                  for (let i = 0; i < polygon.length; i++) {
                    let start = polygon[i];
                    let end = polygon[(i + 1) % polygon.length];
          
                    let denom =
                      (end.y - start.y) * (ray.x - sourceX) -
                      (end.x - start.x) * (ray.y - sourceY);
                    let nume_a =
                      (end.x - start.x) * (sourceY - start.y) -
                      (end.y - start.y) * (sourceX - start.x);
                    let nume_b =
                      (ray.x - sourceX) * (sourceY - start.y) -
                      (ray.y - sourceY) * (sourceX - start.x);
          
                    if (denom === 0) {
                      continue;
                    }
          
                    let u_a = nume_a / denom;
                    let u_b = nume_b / denom;
          
                    if (u_a >= 0 && u_a <= 1 && u_b > 0) {
                      let pt = {
                        x: sourceX + u_a * (ray.x - sourceX),
                        y: sourceY + u_a * (ray.y - sourceY),
                      };
          
                      // Check if the point is on the edge of the square
                      if (
                        (pt.x === polygon[0].x && pt.y >= polygon[0].y && pt.y <= polygon[2].y) || // Left edge
                        (pt.x === polygon[1].x && pt.y >= polygon[0].y && pt.y <= polygon[2].y) || // Right edge
                        (pt.y === polygon[0].y && pt.x >= polygon[0].x && pt.x <= polygon[1].x) || // Top edge
                        (pt.y === polygon[2].y && pt.x >= polygon[0].x && pt.x <= polygon[1].x)    // Bottom edge
                      ) {
                        intersectsEdge = true;
                        break;
                      }
          
                      if (
                        !closestIntersection ||
                        Math.hypot(sourceX - pt.x, sourceY - pt.y) <
                          Math.hypot(
                            sourceX - closestIntersection.x,
                            sourceY - closestIntersection.y
                          )
                      ) {
                        closestIntersection = pt;
                      }
                    }
                  }
          
                  if (closestIntersection && !intersectsEdge) {
                    rays.push(closestIntersection);
                  } else {
                    rays.push(ray);
                  }
                });
              });
            });
          
            // Sort rays based on angle relative to the light source
            rays.sort((a, b) => {
              let angleA = Math.atan2(a.y - sourceY, a.x - sourceX);
              let angleB = Math.atan2(b.y - sourceY, b.x - sourceX);
              return angleA - angleB;
            });
          
            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY); // Start from the light source
            rays.forEach((ray) => ctx.lineTo(ray.x, ray.y));
            ctx.closePath();
          
            let gradient = ctx.createRadialGradient(
              sourceX,
              sourceY,
              0,
              sourceX,
              sourceY,
              maxDist
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // white at the center
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // fades to transparent
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