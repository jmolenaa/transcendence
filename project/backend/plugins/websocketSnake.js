import * as snake from './snakeLogic.js';

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


const startGameLoop = () => {
    if (!gameLoopStarted) {
        gameLoopStarted = true;

        setInterval(() => {
            broadcastGameState();
        }, 1000 / 10); // 10 FPS for Snake
    }
};



const snakeWebsocketHandler = (socket) => {

    gameClients.add(socket);

    const newPlayer = { id: players.length + 1, socket };
    players.push(newPlayer);

    // Send player ID to the new client
    socket.send(JSON.stringify({
        type: 'playerId',
        playerId: newPlayer.id
    }));

    // Send waiting room list
    // socket.send(JSON.stringify({
    //     type: "waitingRoom",
    //     players: players.map(p => ({ id: p.id }))
    // }));
    

    startGameLoop();

    socket.on('message', (message) => {
        const data = JSON.parse(message);
        console.log("ID " + newPlayer.id);
        if (data.type === 'move') {
            if (newPlayer.id === 1) snake.movePlayer(data.key, 1);
            else if (newPlayer.id === 2) snake.movePlayer(data.key, 2);
        }
        if (data.type === "waitingRoom") {
            const waitingRoomMessage = JSON.stringify({
                type: 'waitingRoom',
                message: `Player ${newPlayer.id} is waiting for another player`
            });
            for (const client of gameClients) {
                if (client.readyState === 1) {
                    client.send(waitingRoomMessage);
                }
            }
        }
    });

    socket.on('close', () => {
        gameClients.delete(socket);
        players = players.filter(p => p.socket !== socket);

        const disconnectMessage = JSON.stringify({
            type: 'playerDisconnected',
            message: `Player ${newPlayer.id} disconnected`
        });
        for (const client of gameClients) {
            if (client.readyState === 1) {
                client.send(disconnectMessage);
            }
        }
        snake.resetGame()
    });
};

export default {
    snakeWebsocketHandler
};