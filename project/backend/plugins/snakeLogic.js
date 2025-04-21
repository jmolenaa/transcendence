
let gameState = {
    leftPlayer: [{x: 0, y: 0}],
    rightPlayer: [{x: 100, y: 100}],
    apple: { x: 400, y: 300 },
    directionLeft: { x: 1, y: 0 },
    directionRight: { x: -1, y: 0 }
};




export function getRandomApplePosition(WIDTH, HEIGHT) {
    const x = Math.floor(Math.random() * WIDTH / 10) * 10;
    const y = Math.floor(Math.random() * HEIGHT / 10) * 10;
    gameState.apple = { x, y };
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