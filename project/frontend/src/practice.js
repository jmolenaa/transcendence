


//1. Use Classes for Game Objects!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// Benefits of Class-Based Design
// 🔁 Reusability (e.g., different modes: AI, 2-player)

// 🔧 Extensibility (easy to add sound, difficulty, pause)

// 🚫 No global state pollution

// 👀 Easier debugging and testing

// 4. Optional Enhancements
// Add AI logic for right paddle.

// Add sound effects and countdown to start.

// Use canvas scaling for responsiveness.

// Add a UI layer for game states (start screen, game over).

// Persist scores or names with localStorage.






let animationId = null;
let player1Name = "Player1";
let player2Name = "Player2";

// Called when the Game tab is opened
export function openPracticeTab() {
	const buttonStart = document.getElementById("startGame");
	const buttonStop = document.getElementById("stopGame");

	buttonStart.addEventListener("click", () => {
		buttonStart.style.display = "none";
		buttonStop.style.display = "block";
		handleStartGame();
	});
	buttonStop.addEventListener("click", () => {
		buttonStart.style.display = "block";
		buttonStop.style.display = "none";
		handleStopGame();
	});
}

// Get the canvas and its context
var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');
// Constants for the game
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var PADDLE_WIDTH = 10;
var PADDLE_HEIGHT = 100;
var BALL_SIZE = 10;
// Set initial positions for paddles and ball
var leftPaddleY = (HEIGHT - PADDLE_HEIGHT) / 2;
var rightPaddleY = (HEIGHT - PADDLE_HEIGHT) / 2;
var ballX = WIDTH / 2;
var ballY = HEIGHT / 2;
var ballSpeedX = 2;
var ballSpeedY = 2;
var leftPlayerScore = 0;
var rightPlayerScore = 0;
// var player1Name = "";
// var player2Name = "";
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
	if ((ballX <= PADDLE_WIDTH && ballY + BALL_SIZE > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT) ||
		(ballX + BALL_SIZE >= WIDTH - PADDLE_WIDTH && ballY + BALL_SIZE > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT)) {
		ballSpeedX = -ballSpeedX; // Bounce
	}
	// Ball goes out of bounds (left or right)
	if (ballX <= 0) {
		rightPlayerScore++;

		ballX = WIDTH / 2;
		ballY = HEIGHT / 2;
		ballSpeedX = -ballSpeedX; // Change ball direction
	}
	if (ballX + BALL_SIZE >= WIDTH) {
		leftPlayerScore++;

		ballX = WIDTH / 2;
		ballY = HEIGHT / 2;
		ballSpeedX = -ballSpeedX; // Change ball direction
	}
}

function updateGameStatus() {
	var gameStatusDiv = document.getElementById('gameStatus');
	console.log("Name   " ,player1Name )
	gameStatusDiv.innerHTML = `${player1Name} ${leftPlayerScore} - ${rightPlayerScore} ${player2Name}`;
}
// Control paddles with keyboard (W/S for left paddle, Arrow keys for right paddle)
function movePaddles(event) {
	var paddleSpeed = 10;
	if (event.key === 'w' && leftPaddleY > 0)
		leftPaddleY -= paddleSpeed;
	if (event.key === 's' && leftPaddleY + PADDLE_HEIGHT < HEIGHT)
		leftPaddleY += paddleSpeed;
	if (event.key === 'ArrowUp' && rightPaddleY > 0)
		rightPaddleY -= paddleSpeed;
	if (event.key === 'ArrowDown' && rightPaddleY + PADDLE_HEIGHT < HEIGHT)
		rightPaddleY += paddleSpeed;
}
// Listen for keyboard input
document.addEventListener('keydown', movePaddles);
// Main game loop
function gameLoop() {
	draw();
	updateBall();
	updateGameStatus();
	if (leftPlayerScore >= 3 || rightPlayerScore >= 3) {
		return ;
	}
	// 	fetch('api/winner', { // Correct route for saving game results
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ player1: player1Name, player2: player2Name, winner: leftPlayerScore >= 3 ? player1Name : player2Name })
	// 	})
	// 	// Game over condition, stop the game loop
	// 	console.log('Game Over!'); // Placeholder for game over logic
	// 	return;
	// }
	animationId = requestAnimationFrame(gameLoop); // Request next frame
}
// Start the game
function handleStartGame() {
	gameLoop();
}

function handleStopGame() {
	console.log('Stopping game');
	if (animationId) {
		cancelAnimationFrame(animationId); // Stop the animation frame
	}
	leftPlayerScore = 0;
	rightPlayerScore = 0;
	updateGameStatus();
	const canvas = document.getElementById("pong");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	return ;
}
