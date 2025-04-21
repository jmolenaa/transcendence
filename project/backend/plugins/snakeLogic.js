const WIDTH = 800;
const HEIGHT = 600;

let gameState = {
    leftPlayer: [{x: 0, y: 0}],
    rightPlayer: [{x: WIDTH - 10, y: HEIGHT - 10}],
    apple: { x: 400, y: 300 },
    directionLeft: { x: 1, y: 0 },
    directionRight: { x: -1, y: 0 }
};

export function resetGame() {
    gameState.leftPlayer = [{x: 0, y: 0}];
    gameState.rightPlayer = [{x: WIDTH - 10, y: HEIGHT - 10}];
    gameState.apple = { x: 400, y: 300 };
    gameState.directionLeft = { x: 1, y: 0 };
    gameState.directionRight = { x: -1, y: 0 };
    console.log("Game reset");
}

export function getRandomApplePosition() {
    let maxAttempts = WIDTH * HEIGHT;
    let x, y;
    let applePositionValid = false;
    let attempts = 0;
    while (!applePositionValid && attempts < maxAttempts) {
        x = Math.floor(Math.random() * WIDTH / 10) * 10;
        y = Math.floor(Math.random() * HEIGHT / 10) * 10;
        applePositionValid = true;
        for (let segment of gameState.leftPlayer) {
            if (segment.x === x && segment.y === y) {
                applePositionValid = false;
                break;
            }
        }
        for (let segment of gameState.rightPlayer) {
            if (segment.x === x && segment.y === y) {
                applePositionValid = false;
                break;
            }
        }
        if (!applePositionValid) {
            getRandomApplePosition(WIDTH, HEIGHT);
        }
        attempts++;
        if (attempts >= maxAttempts) {
            console.error("Failed to find a valid apple position after " + maxAttempts + " attempts.");
            resetGame(WIDTH, HEIGHT);
        }
    }
    gameState.apple = { x, y };
}

export function checkCollisions() {
    const leftHead = gameState.leftPlayer[0];
    const rightHead = gameState.rightPlayer[0];
    // Check for collision with walls
    if (leftHead.x < 0 || leftHead.x >= WIDTH || leftHead.y < 0 || leftHead.y >= HEIGHT) {
        console.log("Left player hit the wall");
        resetGame();
    }
    if (rightHead.x < 0 || rightHead.x >= WIDTH || rightHead.y < 0 || rightHead.y >= HEIGHT) {
        console.log("Right player hit the wall");
        resetGame();
    }
    // Check for collision with self
    for (let i = 1; i < gameState.leftPlayer.length; i++) {
        if (leftHead.x === gameState.leftPlayer[i].x && leftHead.y === gameState.leftPlayer[i].y) {
            console.log("Left player hit itself");
            resetGame();
        }
    }
    for (let i = 1; i < gameState.rightPlayer.length; i++) {
        if (rightHead.x === gameState.rightPlayer[i].x && rightHead.y === gameState.rightPlayer[i].y) {
            console.log("Right player hit itself");
            resetGame();
        }
    }
    // Check for collision with other player
    for (let i = 0; i < gameState.rightPlayer.length; i++) {
        if (leftHead.x === gameState.rightPlayer[i].x && leftHead.y === gameState.rightPlayer[i].y) {
            console.log("Left player hit right player");
            resetGame();
        }
    }
    for (let i = 0; i < gameState.leftPlayer.length; i++) {
        if (rightHead.x === gameState.leftPlayer[i].x && rightHead.y === gameState.leftPlayer[i].y) {
            console.log("Right player hit left player");
            resetGame();
        }
    }
}

export function movePlayer(key, player) {
    if (player === 1) {
        if (key === 'ArrowUp') gameState.directionLeft = { x: 0, y: -1 };
        else if (key === 'ArrowDown') gameState.directionLeft = { x: 0, y: 1 };
        else if (key === 'ArrowLeft') gameState.directionLeft = { x: -1, y: 0 };
        else if (key === 'ArrowRight') gameState.directionLeft = { x: 1, y: 0 };


        const newHead = {
            x: gameState.leftPlayer[0].x + gameState.directionLeft.x * 10,
            y: gameState.leftPlayer[0].y + gameState.directionLeft.y * 10
        }
        gameState.leftPlayer.unshift(newHead);
        console.log(gameState.leftPlayer);
        if (newHead.x === gameState.apple.x && newHead.y === gameState.apple.y) {
            getRandomApplePosition(800, 600);
        } else {
            gameState.leftPlayer.pop();
        }
    }
    if (player === 2) {
        if (key === 'ArrowUp') gameState.directionRight = { x: 0, y: -1 };
        else if (key === 'ArrowDown') gameState.directionRight = { x: 0, y: 1 };
        else if (key === 'ArrowLeft') gameState.directionRight = { x: -1, y: 0 };
        else if (key === 'ArrowRight') gameState.directionRight = { x: 1, y: 0 };


        const newHead = {
            x: gameState.rightPlayer[0].x + gameState.directionRight.x * 10,
            y: gameState.rightPlayer[0].y + gameState.directionRight.y * 10
        }
        gameState.rightPlayer.unshift(newHead);
        console.log(gameState.rightPlayer);
        if (newHead.x === gameState.apple.x && newHead.y === gameState.apple.y) {
            getRandomApplePosition(800, 600);
        } else {
            gameState.rightPlayer.pop();
        }
    }
    checkCollisions();
}


export function getGameState() {
    return {
        leftPlayer: gameState.leftPlayer,
        rightPlayer: gameState.rightPlayer,
        apple: gameState.apple,
        directionLeft: gameState.directionLeft,
        directionRight: gameState.directionRight
    };
}