
export function openRemoteTab(){
    const canvas = document.getElementById('gameRemote');
    const ctx = canvas.getContext('2d');
    const socket = new WebSocket('wss://congenial-system-x76557wwgx93px46-3000.app.github.dev/ws/game');
    let gameState = {
        leftPaddleY: 250,
        rightPaddleY: 250,
        ball: { x: 400, y: 300 },
        score: [0, 0]
      };
    socket.onopen = function() {
        console.log('Connected to WebSocket server!');
      };
    
      // When a message is received from the server
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'stateUpdate') {
          gameState = data;
          console.log("Game state updated: ", gameState);
        }
      };

    document.addEventListener('keydown', function(event) {
      console.log("Pressed key: ", event.key);
        const data = { type: 'move', key: event.key };
        socket.send(JSON.stringify(data)); // This sends to backend!
    });


    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
    
        // Left paddle
        ctx.fillRect(0, gameState.leftPaddleY, 10, 100);
    
        // Right paddle
        ctx.fillRect(canvas.width - 10, gameState.rightPaddleY, 10, 100);
    
        // Ball
        ctx.fillRect(gameState.ball.x, gameState.ball.y, 10, 10);
    
        // Score
        ctx.font = '24px Arial';
        ctx.fillText(`${gameState.score[0]} - ${gameState.score[1]}`, 370, 50);
    
        requestAnimationFrame(drawGame);
      }
    
      drawGame();
    }