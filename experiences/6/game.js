var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var gm = true;
var ball_speed = 10;
var xspeed = 0;
var yspeed = 0;
var com_score = 0;
var player_score = 0;
var x_min=30;
var x_max=460;
var y_min=30;
var y_max=600;

function draw_rect(x,y,w,h,b)
{
    ctx.beginPath();
    if(b)
    {
        ctx.strokeStyle = "#151B54";
        ctx.lineWidth = 40;
    }
    else
    {
        ctx.strokeStyle = "#1589FF";
        ctx.lineWidth = 4;
    }    
    ctx.strokeRect(x,y,w,h);
    ctx.closePath();
}  
  
function draw_goal(x,y,r,s)
{
    ctx.beginPath();
    ctx.lineWidth=4;
    if(s)
      ctx.arc(x, y, r, 0, Math.PI, false);
    else
      ctx.arc(x, y, r, Math.PI, 0, false);

    ctx.strokeStyle = "#1589FF";
    ctx.stroke();
    ctx.closePath();
}

function draw_circle(x,y,r,w)
{
    ctx.beginPath();
    ctx.lineWidth=w;
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.strokeStyle = "#1589FF";
    ctx.stroke();
    ctx.closePath();
}

function draw_filled_circle(x,y,r,d)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    if(d==1)
    {
     ctx.fillStyle = "#F87217";
     ctx.strokeStyle = "#9F000F";
    }
    else if(d==2)
    {
     ctx.fillStyle = "#ffdc00";
     ctx.strokeStyle = "#9F000F";
    }
    else
    {
     ctx.fillStyle = "#7D0552";
     ctx.strokeStyle = "#4CC417";   
    }    
    
    ctx.fill();
    ctx.lineWidth = 3;
    
    ctx.stroke();
    ctx.closePath();
}

function draw_board()
{
    draw_rect(0,0,520,660,1);
    draw_rect(30,30,460,600,0);
    draw_goal(260,30,70,1);
    draw_goal(260,30,150,1);
    draw_goal(260,630,70,0);
    draw_goal(260,630,150,0);
    draw_circle(260,330,40,4);
    draw_circle(260,330,5,4);
    
    ctx.beginPath();
    ctx.moveTo(30, 330);
    ctx.lineTo(490, 330);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(190, 30);
    ctx.lineTo(330, 30);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(190, 630);
    ctx.lineTo(330, 630);
    //ctx.strokeStyle("#FFFFFF");
    ctx.stroke();
    ctx.closePath();

    ctx.font = "50px Pristina";
    ctx.lineWidth = 2
    ctx.strokeText(com_score,440,300);
    ctx.strokeText(player_score,440,380);
}

function distance(x1,y1,x2,y2)
{
    var tempx = x2-x1;
    var tempy = y2-y1;
    tempx*=tempx;
    tempy*=tempy;
    return Math.sqrt(tempx+tempy);
}

var Mallet = function(x,y,r)
{

    this.x = x;
    this.y = y;
    this.radius = r;
}
// Player's object
var pMallet = new Mallet(260,canvas.height-100,30);

var cMallet = new Mallet(260,100,30);

// Ball class
var Ball = function (x,y,r) {
    this.x = x;
    this.y = y;
    this.radius = r;
}
// ball object
var ball = new Ball(canvas.width/2,canvas.height-200,15); 