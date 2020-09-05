let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

const BALL_COLOR = "#e0e0e0";
const BALL_SIZE = 10;
const PADDLE_COLOR = "#e0e0e0";
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 120;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 4;
let ballDY = 4;
let ballTop;
let ballBottom;

// paddles initialized opposite each other
let opponentPaddle = {name: "opponent", x: 765, y: (canvas.height - PADDLE_HEIGHT)/2};
let playerPaddle = {name: "player", x: 20, y: (canvas.height - PADDLE_HEIGHT)/2};

/**
 * Draws the ball
 */
function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, BALL_SIZE, 0, Math.PI * 2);
    context.fillStyle = BALL_COLOR;
    context.fill();
    context.closePath();
}

/**
 * Draws a paddle
 * 
 * @param {Paddle} paddle 
 */
function drawPaddle(paddle) {
    context.beginPath();
    context.rect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    context.fillStyle = PADDLE_COLOR;
    context.fill();
    context.closePath();
}

/**
 * Handles collision between the ball and the walls 
 */
function handleCollision() {
    ballTop = ballY - BALL_SIZE;
    ballBottom = ballY + BALL_SIZE;

    // Handle collision with the walls
    if (ballTop + ballDY < 0 || ballBottom > canvas.height) {
        ballDY = -ballDY;
    }
}

/**
 * Draws the game
 */
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(playerPaddle);
    drawPaddle(opponentPaddle);
    handleCollision();
    requestAnimationFrame(draw);
    ballX += ballDX;
    ballY += ballDY;
}

draw();
