// npm install -g typescript
// tsc pong.ts - to compile
// pong.js will be created automatically
// open it with Live Server extension

// Get the canvas and its context
const canvas = document.getElementById('pong') as HTMLCanvasElement;
const context = canvas.getContext('2d');

// Constants for the game
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 60;
const BALL_SIZE = 10;

// Set initial positions for paddles and ball
let leftPaddleY = (HEIGHT - PADDLE_HEIGHT) / 2;
let rightPaddleY = (HEIGHT - PADDLE_HEIGHT) / 2;
let ballX = WIDTH / 2;
let ballY = HEIGHT / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Draw the paddles and the ball
function draw() {
  context.clearRect(0, 0, WIDTH, HEIGHT); // Clear the canvas

  // Draw paddles
  context.fillStyle = 'white';
  
  context.fillRect(0, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT); // Left paddle
  context.fillRect(WIDTH - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT); // Right paddle

  // Draw the ball
  context.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE); // Ball
}

// Update the ball's position
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Collision with top/bottom walls
  if (ballY <= 0 || ballY + BALL_SIZE >= HEIGHT) {
    ballSpeedY = -ballSpeedY; // Bounce
  }

  // Collision with paddles
  if (
    (ballX <= PADDLE_WIDTH && ballY + BALL_SIZE > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT) ||
    (ballX + BALL_SIZE >= WIDTH - PADDLE_WIDTH && ballY + BALL_SIZE > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT)
  ) {
    ballSpeedX = -ballSpeedX; // Bounce
  }

  // Ball goes out of bounds (left or right)
  if (ballX <= 0 || ballX + BALL_SIZE >= WIDTH) {
    // Reset ball position
    ballX = WIDTH / 2;
    ballY = HEIGHT / 2;
    ballSpeedX = -ballSpeedX; // Change ball direction
  }
}

// Control paddles with keyboard (W/S for left paddle, Arrow keys for right paddle)
function movePaddles(event: KeyboardEvent) {
  const paddleSpeed = 10;

  if (event.key === 'w' && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
  if (event.key === 's' && leftPaddleY + PADDLE_HEIGHT < HEIGHT) leftPaddleY += paddleSpeed;
  
  if (event.key === 'ArrowUp' && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
  if (event.key === 'ArrowDown' && rightPaddleY + PADDLE_HEIGHT < HEIGHT) rightPaddleY += paddleSpeed;
}

// Listen for keyboard input
document.addEventListener('keydown', movePaddles);

// Main game loop
function gameLoop() {
  draw();
  updateBall();
  requestAnimationFrame(gameLoop); // schedules the gameLoop() function 
  // to be executed on the next available frame (typically about 60 times per second, 
  // depending on your browser's refresh rate).
}

// Start the game
gameLoop();
