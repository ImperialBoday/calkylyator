
//поле
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//мячь
var ballRadius = 10;

//кирпичи
var brickRowCount =3;
var brickColumnCount = 5;
var brickWidth =75;
var brickHeight =20;
var brickPadding =20;
var brickOffsetTop = 30;
var brickOffsetLeft= 30;
var bricks =[]; //массив с позицией кирпичей

//цветовой массив
var arrColors = [ "red", "brown", "green", "orange", "aqua", "violet" ];


for(c=0; c<brickColumnCount; c++){
    bricks[c]=[];
    for (r=0; r<brickRowCount; r++){
        bricks [c][r]= {x: 0, y: 0, status:1 };
        bricks [c][r].x=(c*(brickWidth+brickPadding))+brickOffsetLeft;
        bricks [c][r].y=(r*(brickHeight+brickPadding))+brickOffsetTop;
    }
}

function drawBricks() {
    for (c=0; c<brickColumnCount; c++){
        for (r=0; r<brickRowCount; r++){
            if (bricks[c][r].status == 1) {
                ctx.beginPath();
                ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                ctx.fillStyle = "brown";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function collisionDetection(){
    for (c=0; c<brickColumnCount; c++){
        for (r=0; r<brickRowCount; r++){
            b = bricks[c][r];
            if (b.status == 1 ){
              if (x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight)
               {
                   dy=-dy;
                   b.status = 0;
               }
            }
      }
    }
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    ctx.beginPath();

    x += dx;
    y += dy;
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    collisionDetection();
    ctx.closePath();
}
setInterval(draw, 6);
