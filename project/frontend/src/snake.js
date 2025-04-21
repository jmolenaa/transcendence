export function openSnakeTab() {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');

    const socket = new WebSocket('wss://congenial-system-x76557wwgx93px46-3000.app.github.dev/ws/snake');
    const playersList = document.getElementById('playersList');
    // const startGameButton = document.getElementById('startGameButton');

    let currentPlayerId;
    let gameState = {
        leftPlayer: [{x: 0, y: 0}],
        rightPlayer: [{x: canvas.width - 10, y: canvas.height - 10}],
        apple: { x: 400, y: 300 },
        directionLeft: { x: 1, y: 0 },
        directionRight: { x: -1, y: 0 } 
    };

    socket.onopen = () => {
        console.log('Connected to Snake WebSocket server!');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'playerId') {
            currentPlayerId = data.playerId; // <-- store your own ID
        }
        if (data.type === 'waitingRoom') {
            updatePlayersList(data.players);
        }
        if (data.type === 'stateUpdate') {
            gameState.leftPlayer = data.leftPlayer || [];
            gameState.rightPlayer = data.rightPlayer || [];
            gameState.apple = data.apple || { x: 0, y: 0 };
        }
        if (data.type === 'gameInvitationReceived') {
            const { inviterId, message } = data;
            const accept = window.confirm(`${message} Do you accept?`);
            console.log(`Player ${currentPlayerId} received the game invitation from player ${inviterId}`);

            if (accept) {
                // Send a message back to start the game
                socket.send(JSON.stringify({
                    type: 'gameAccepted',
                    inviterId: inviterId,
                    opponentId: currentPlayerId
                }));
            } else {
                // Send a message that the opponent denied the game
                socket.send(JSON.stringify({
                    type: 'gameDenied',
                    opponentId: currentPlayerId
                }));
            }
        }
    };

    document.addEventListener('keydown', (event) => {
        const data = { type: 'move', key: event.key };
        socket.send(JSON.stringify(data));
    });

    // function startGame() {
    //     document.getElementById('waitingRoom').style.display = 'none';
    //     document.getElementById('snakeContainer').style.display = 'block';
    //     // Initialize the snake game here
    // }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';

        // Now snake is an array of segments
        for (let segment of gameState.leftPlayer) {
            ctx.fillRect(segment.x, segment.y, 10, 10);
        }
        for (let segment of gameState.rightPlayer) {
            ctx.fillRect(segment.x, segment.y, 10, 10);
        }
        // Draw apple
        ctx.fillRect(gameState.apple.x, gameState.apple.y, 10, 10);

        requestAnimationFrame(drawGame);
    }

    drawGame();


    function sendGameInvitation(opponentId) {
        console.log(`Inviting player ${opponentId} to play against you!`);
        // Send a message to the backend that player is inviting the opponent
        socket.send(JSON.stringify({
            type: 'gameInvitation',
            opponentId: opponentId,
            inviterId: currentPlayerId
        }));
    }

    function updatePlayersList(players) {
        playersList.innerHTML = '';
        players.forEach(player => {
            if (player.id !== currentPlayerId) {
                const listItem = document.createElement('li');
                listItem.textContent = player.id;
                const button = document.createElement('button');
                button.textContent = 'Play';
                button.onclick = () => sendGameInvitation(player.id);
                listItem.appendChild(button);
                playersList.appendChild(listItem);
            }
        });
    }

}
// }