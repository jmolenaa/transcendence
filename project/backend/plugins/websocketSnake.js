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

function broadcastWaitingRoom(message) {
    const stringifiedMessage = JSON.stringify(message);
    for (const client of gameClients) {
        if (client.readyState === 1)
            client.send(stringifiedMessage);
    }
}


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
    broadcastWaitingRoom({
        type: "waitingRoom",
        //.map() is a JavaScript array method that goes through each element in an array and 
        // creates a new array by applying a function to every element.
        players: players.map(p => ({ id: p.id }))
    });


    startGameLoop();

    socket.on('message', (message) => {
        const data = JSON.parse(message);
        console.log("ID " + newPlayer.id);
        if (data.type === 'move') {
            if (newPlayer.id === 1) snake.movePlayer(data.key, 1);
            else if (newPlayer.id === 2) snake.movePlayer(data.key, 2);
        }
        if (data.type === 'gameInvitation') {
            const { opponentId, inviterId } = data;
            console.log(`Player ${inviterId} is inviting player ${opponentId} to play!`);
            // Find the opponent's socket
            const opponent = players.find(p => p.id === opponentId);
            if (opponent) {
                console.log(`Sending game invitation to player ${opponentId}`);
                // Send game invitation to the opponent
                opponent.socket.send(JSON.stringify({
                    type: 'gameInvitationReceived',
                    inviterId: inviterId,
                    message: `Player ${inviterId} wants to play! Accept or deny the game.`
                }));
            }
        }
        if (data.type === 'gameAccepted') {
            const {inviterId, opponentId} = data;
            console.log(`Player ${newPlayer.id} accepted the game invitation from player ${inviterId}`);
            const inviter = players.find(p => p.id === inviterId);
            const opponent = players.find(p => p.id === opponentId);
            //snake.startGame();
        }
    });

    socket.on('close', () => {
        gameClients.delete(socket);
        players = players.filter(p => p.socket !== socket);
        players.forEach((players, index) => {
            players.id = index + 1;
        });

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