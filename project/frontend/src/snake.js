export function openSnakeTab() {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');

    const socket = new WebSocket('wss://congenial-system-x76557wwgx93px46-3000.app.github.dev/ws/snake');

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
        if (data.type === 'stateUpdate') {
            gameState.leftPlayer = data.leftPlayer || [];
            gameState.rightPlayer = data.rightPlayer || [];
            gameState.apple = data.apple || { x: 0, y: 0 };
        }
    };

    document.addEventListener('keydown', (event) => {
        const data = { type: 'move', key: event.key };
        socket.send(JSON.stringify(data));
    });

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
}
