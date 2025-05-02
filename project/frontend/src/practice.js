var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

let animationId = null;
let names1 = ["NullPointerPrince","404NotFoundYou","StackOverflowed",
	"CtrlAltElite","CommitCrimes","RubberDuckieDev","PingMePlz","BrbCompiling","FatalSyntax",
	"BuggedButHappy","InfiniteLoopHole","SegFaultyLogic","ByteMeMaybe","SpaghettiCoder",
	"FullSnackDev","KernelSandwich","BoolinDev","NaNStopper","DevNullius",
	"TabbyTheDebugger","LootBoxLad","NoScopeCSharp","Lagzilla","RespawnResume", "CacheMeOutside"];
let names2 = ["AimBotany","CrashTestCutie","YeetCompiler",
	"PixelPuncher","AFKChef","TeaBagger3000","CaffeineLoop","RAMenNoodles",
	"404SnaccNotFound","HelloWorldDomination","JavaTheHutt",
	"WiFried","DebuggerDuck","ExceptionHunter","TheRealSlimShader",
	"SyntaxTerror","ClickyMcClickface","BananaForScale","Devzilla",
	"MrRobotoCallsHome","SudoNym","OopsIDidItAgain","MemeDrivenDev",
	"TypoNinja","BitFlipper"];
const randomIndex = Math.floor(Math.random() * names1.length);
let player1Name = names1[randomIndex];
let player2Name = names2[randomIndex];
let leftPlayerScore = 0;
let rightPlayerScore = 0;

class Ball {
	constructor() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.speedX = 1;
		this.speedY = 1;
		this.size = 10;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	drawBall() {
		context.fillStyle = 'red';
		context.fillRect(this.x, this.y, this.size, this.size);
	}
	reset() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.speedX = -this.speedX;
	}
}

class Paddle {
	constructor(x) {
		this.height = 100;
		this.width = 10;
		this.x = x;
		this.y = (canvas.height - this.height) / 2;
		this.paddleSpeed = 10;
	}
	drawPaddle() {
		context.fillStyle = 'white';
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

let ball = new Ball();
let leftPaddle = new Paddle(0);
let rightPaddle = new Paddle(canvas.width - 10);

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

function checkBall() {
	// Top/bottom wall collision
	if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
		ball.speedY = -ball.speedY;
	}
	// Left paddle collision
	if (ball.x <= leftPaddle.x + leftPaddle.width &&
		ball.y + ball.size >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.height) {
		ball.speedX = -ball.speedX;
	}
	// Right paddle collision
	if (ball.x <= rightPaddle.x + rightPaddle.width &&
		ball.x + ball.size >= rightPaddle.x && ball.y <= rightPaddle.y + rightPaddle.height) {
		ball.speedX = -ball.speedX;
	}
	if (ball.x <= 0) {
		rightPlayerScore++;
		ball.reset();
	}
	if (ball.x + ball.size >= canvas.width) {
		leftPlayerScore++;
		ball.reset();
	}
}

function updateGameStatus() {
	const gameStatusDiv = document.getElementById('gameStatus');
	gameStatusDiv.innerHTML = `${player1Name}   ${leftPlayerScore} - ${rightPlayerScore}   ${player2Name}`;
}

function movePaddles(event) {
	if (event.key === 'w' && leftPaddle.y > 0)
		leftPaddle.y -= leftPaddle.paddleSpeed;
	if (event.key === 's' && leftPaddle.y + leftPaddle.height < canvas.height)
		leftPaddle.y += leftPaddle.paddleSpeed;
	if (event.key === 'ArrowUp' && rightPaddle.y > 0)
		rightPaddle.y -= rightPaddle.paddleSpeed;
	if (event.key === 'ArrowDown' && rightPaddle.y + rightPaddle.height < canvas.height)
		rightPaddle.y += rightPaddle.paddleSpeed;
}

document.addEventListener('keydown', movePaddles);

function gameLoop() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ball.update();
	checkBall();
	ball.drawBall();
	leftPaddle.drawPaddle();
	rightPaddle.drawPaddle();
	updateGameStatus();
	if (leftPlayerScore >= 3 || rightPlayerScore >= 3) { //add winner here
		cancelAnimationFrame(animationId);
		return;
	}
	animationId = requestAnimationFrame(gameLoop);
}

function handleStartGame() {
	gameLoop();
}

function handleStopGame() {
	console.log('Stopping game');
	if (animationId) {
		cancelAnimationFrame(animationId);
		animationId = null; //do i need it?
		document.removeEventListener('keydown', movePaddles); //????????????
	}

	if (ball)
		ball.reset();
	leftPlayerScore = 0;
	rightPlayerScore = 0;
	updateGameStatus();
	context.clearRect(0, 0, canvas.width, canvas.height);
}
