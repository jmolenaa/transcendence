import { updateBall, getGameState, moveLeftPaddle, moveRightPaddle } from './gameLogic.js';
const WIDTH = 800;
const HEIGHT = 600;
const PADDLE_HEIGHT = 100;
let gameLoopStarted = false;
const gameClients = new Set();
let players = []; //for the names right now 1 and 2


function broadcastGameState() {
    const {
        ballX,
        ballY,
        leftPaddleY,
        rightPaddleY,
        leftPlayerScore,
        rightPlayerScore
    } = getGameState();
    const state = {
        type: 'stateUpdate',
        ball: { x: ballX, y: ballY },
        leftPaddleY,
        rightPaddleY,
        score: [leftPlayerScore, rightPlayerScore]
    };

    const message = JSON.stringify(state);
    for (const client of gameClients) {
        if (client.readyState === 1) { // 1 - Websocket is open
            client.send(message);
        }
    }
}



const startGameLoop = () => {
    console.log("Game loop started");
    if (!gameLoopStarted) {
        console.log("Game loop go to update");
        gameLoopStarted = true;
        // Game loop (60 FPS)
        setInterval(() => {
            updateBall();
            broadcastGameState();
        }, 1000 / 60);
    }
}



const gameWebsocketHandler = (socket) => {
    console.log('New game client connected:', gameClients.size);

    gameClients.add(socket);

    if (players.length > 2) {
        socket.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
        socket.close();
        return;
    }
    players.push(socket);
    const playerId = players.indexOf(socket) + 1; //was: players.length + 1, but the problem if someone reconnects

    socket.send(JSON.stringify({ type: 'playerId', playerId })); //send the player ID to the clienti
    
    
    if (players.length === 2)
        startGameLoop(); //running in the background



    socket.on('message', (message) => {
        const data = JSON.parse(message);
        console.log('Received message:', data, playerId);
        if (data.type === 'move') {
            if (playerId === 1) {
                if (data.key === 'ArrowUp') moveLeftPaddle('up');
                if (data.key === 'ArrowDown') moveLeftPaddle('down');
            }
            if (playerId === 2) {
                if (data.key === 'ArrowUp') moveRightPaddle('up');
                if (data.key === 'ArrowDown') moveRightPaddle('down');
            }
        }
    });

    socket.on('close', () => {
        gameClients.delete(socket);
        players = players.filter(p => p !== socket); //delete the player, but how??????
    });
};


export default {
    gameWebsocketHandler
};