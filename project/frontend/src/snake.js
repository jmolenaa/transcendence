export function openSnakeTab() {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');

    const socket = new WebSocket('wss://congenial-system-x76557wwgx93px46-3000.app.github.dev/ws/snake');
    const playersList = document.getElementById('playersList');
    // const startGameButton = document.getElementById('startGameButton');
    // console.log('Visibility changed:', document.visibilityState);
    let currentPlayerId;
    let gameState = {
        leftPlayer: [{ x: 0, y: 0 }],
        rightPlayer: [{ x: canvas.width - 10, y: canvas.height - 10 }],
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
        //I received game invitation and need to make a choice
        if (data.type === 'gameInvitationReceived') {
            // document.getElementById('playerList').style.display = "none";
            const { inviterId, message } = data;
            document.getElementById('invitation').style.display = "block";
            document.getElementById('acceptInvite').addEventListener('click', () => {
                document.getElementById('invitation').style.display = "none";
                socket.send(JSON.stringify({
                    type: 'gameAccepted',
                    inviterId: inviterId,
                    opponentId: currentPlayerId
                }));
            });
            document.getElementById('declineInvite').addEventListener('click', () => {
                document.getElementById('invitation').style.display = "none";
                socket.send(JSON.stringify({
                    type: 'gameDenied',
                    inviterId: inviterId,
                    opponentId: currentPlayerId
                }));
            });
        }
        if (data.type === 'gameAccepted') {
            // Start the game
            console.log(`Player ${currentPlayerId} accepted the game invitation from player ${data.inviterId}`);
            // Hide waiting room and show game
            document.getElementById('waitingRoom').style.display = 'none';
            document.getElementById('snakeContainer').style.display = 'block';
        }
        if (data.type === 'gameDenied') {
            const popup = document.getElementById('rejection');
            const room = document.getElementById('waitingRoom');
            // document.getElementById('playerList').style.display = "block";
            popup.style.display = "block";
            room.style.display = "none";
            setTimeout(() => {
                // Double-check they still exist in the DOM
                if (document.contains(popup)) {
                    popup.style.display = "none";
                    room.style.display = "block";
                }
            }, 4000);
        }
    };

    document.addEventListener('keydown', (event) => {
        const data = { type: 'move', key: event.key };
        socket.send(JSON.stringify(data));
    });

    let animationFrame;

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

        animationFrame = requestAnimationFrame(drawGame);
    }

    drawGame();
    document.addEventListener('visibilitychange', () => {
        console.log('Visibility changed:', document.visibilityState);
        if (document.visibilityState === 'hidden') {
            socket.send(JSON.stringify({ 
                type: 'stopGame', 
                opponentId: opponentId,
                inviterId: currentPlayerId
            }));
            if (animationFrame != null) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }

        } 
    });

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

    // document.addEventListener('visibilitychange', () => {
    //     console.log('Visibility changed:', document.visibilityState);
    //     if (document.visibilityState === 'hidden') {
    //         socket.send(JSON.stringify({ 
    //             type: 'leaveGame', 
    //             opponentId: opponentId,
    //             inviterId: currentPlayerId
    //         }));
    //         if (animationFrame != null) {
    //             cancelAnimationFrame(animationFrame);
    //             animationFrame = null;
    //         }

    //     } 
    // });

    // socket.onclose = () => {
    //     console.log('CLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOSED!');
    //     socket.send(JSON.stringify({
    //         type: 'leaveGame',
    //         opponentId: opponentId,
    //         inviterId: currentPlayerId
    //     }));
    //     if (animationFrame != null) {
    //         cancelAnimationFrame(animationFrame);
    //         animationFrame = null;
    //     }
    // };

}
// }