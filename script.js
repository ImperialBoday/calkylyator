
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
var arrColors = [ "red", "purple", "green", "yellow", "aqua", "violet","blue", "green" ];

//Платформа
var color_paddle=Math.round(Math.random()*7);
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX= (canvas.width-paddleWidth)/2;

//Считываем движение платформы
var rightPresed=false;
var leftPressed=false;

var score = 0;
var highscore;




//_____________________________________________________________________________________________________________________



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);




function drawHighScore(){
    ctx.font = "16 Arial";

    highscore = document.cookie.split('=')[1];
    if(!!!highscore)
        highscore=0;


    ctx.fillStyle = "#9c63dd";
    ctx.fillText("HScore: "+ highscore, 88, 20);
}

function drawScore () {
    ctx.font ="16px Arial";
    ctx.fillStyle ="#9c63dd";
    ctx.fillText("Score: "+score, 8, 20);
}

function mouseMoveHandler(e) {
    var relativeX=e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}



function keyDownHandler(e) {
    if(e.keyCode==39) {
        rightPresed = true;
    }
    else if (e.keyCode ==37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39){
        rightPresed =false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


for(c=0; c<brickColumnCount; c++){
    bricks[c]=[];
    for (r=0; r<brickRowCount; r++){
        bricks [c][r]= {x: 0, y: 0, color:arrColors[Math.round(Math.random()*7)], status:1 };
        bricks [c][r].x=(c*(brickWidth+brickPadding))+brickOffsetLeft;
        bricks [c][r].y=(r*(brickHeight+brickPadding))+brickOffsetTop;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, 310, paddleWidth, paddleHeight);
    ctx.fillStyle = arrColors[color_paddle];
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (c=0; c<brickColumnCount; c++){
        for (r=0; r<brickRowCount; r++){
            if (bricks[c][r].status == 1) {
                ctx.beginPath();
                ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
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
                   ++score;
               }
                if(score == brickRowCount*brickColumnCount)
                {
                    document.cookie = "highscore="+score;
                    alert("you win, yor score: " +score +" new record!!!");
                    document.location.reload();
                }
            }
        }
    }
}



function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHighScore();
    drawScore();
    drawBricks();
    drawPaddle();
    ctx.beginPath();
    if(y+dy<ballRadius){
        dy=-dy;

    }
    else if(y+dy>canvas.height-ballRadius*2){
        if (x>paddleX && x < paddleX + paddleWidth){
            dy=-dy;
            color_paddle = Math.round(Math.random()*7);
        }
    }

    if (paddleX>=0 && paddleX<=canvas.width-paddleWidth) {
        if(rightPresed) {
            paddleX += 5;
        }
        if(leftPressed) {
            paddleX -= 5;
        }
    }
    if (paddleX > canvas.width-paddleWidth) {
        paddleX-=2;
    }
    if (paddleX < 1){
        paddleX+=2;
    }


    x += dx;
    y += dy;
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius){ //пол

        alert("game over, yor score: " +score +" old record: " +highscore);
        dy = -dy;
        if (score>highscore){
            document.cookie = "highscore="+score;
        }
        document.location.reload();
    }
    if( y + dy < ballRadius){ //поолок
        dy =- dy;

    }

    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    collisionDetection();
    ctx.closePath();
}
setInterval(draw, 6);