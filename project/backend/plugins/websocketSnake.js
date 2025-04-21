import * as snake from './snakeLogic.js';
const WIDTH = 800;
const HEIGHT = 600;

let gameLoopStarted = false;
const gameClients = new Set();
let players = [];

function broadcastGameState() {
    const { 
        leftPlayer, 
        rightPlayer,
        apple } = snake.getGameState();

    const state = {
        type: 'stateUpdate',
        leftPlayer,  // Passing the whole leftPlayer array
        rightPlayer, // Passing the whole rightPlayer array
        apple
    };
    const message = JSON.stringify(state);

    for (const client of gameClients) {
        if (client.readyState === 1) {
            client.send(message);
        }
    }
}

//setInterval(callback, delay, ...args);
//updateBall(); Moves the ball, checks for collisions, updates the score, etc.

//broadcastGameState(); Sends the updated game state to all connected clients via WebSocket.
//delay - 60 FPS (frames per second).
//setInterval returns an ID, which can be used to stop the interval later 
// using clearInterval(intervalId).




const startGameLoop = () => {
    if (!gameLoopStarted) {
        gameLoopStarted = true;
        setInterval(() => {
            //snake.getRandomApplePosition(WIDTH, HEIGHT); // optionally only update on apple eaten
            broadcastGameState();
        }, 1000 / 10); // 10 FPS for Snake
    }
};



const snakeWebsocketHandler = (socket) => {
    gameClients.add(socket);
    if (players.length > 2) {
        socket.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
        socket.close();
        return;
    }

    //otherwise, add the player to the game
    players.push(socket);
    const playerId = players.indexOf(socket) + 1; //was: players.length + 1, but the problem if someone reconnects, 
    // //id might be the same

    //send the player IDs
    socket.send(JSON.stringify({ type: 'playerId', playerId })); //send the player ID to the client
    

    startGameLoop();

    socket.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'move') {
            if (playerId === 1) snake.movePlayer(data.key, 1);
            else if (playerId === 2) snake.movePlayer(data.key, 2);
        }
    });

    socket.on('close', () => {
        gameClients.delete(socket);
        players = players.filter(p => p !== socket);
    });
};

export default {
    snakeWebsocketHandler
};