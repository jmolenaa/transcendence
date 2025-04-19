import {handleError} from '../utils/utils.js';

// const clients = new Set();

const chatWebsocketHandler = (connection) => {
  // Add the connection to the clients set
  // clients.add(connection);
  // console.log('Client connected. Total:', clients.size);

  // // Handle incoming messages
  // connection.on('message', (message) => {
  //   const msgText = message.toString();
  //   console.log('Received:', msgText);

  //   // Broadcast the message to all other connected clients
  //   for (const client of clients) {
  //     if (client.readyState === 1 && client!== connection) {
  //       client.send(msgText);
  //     }
  //   }
  // });

  // // Handle when the connection is closed
  // connection.on('close', () => {
  //   clients.delete(connection);
  //   console.log('Client disconnected. Total:', clients.size);
  // });
};

// pongGameServer.js
const gameClients = new Set();
let players = [];

const WIDTH = 800;
const HEIGHT = 600;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;

let leftPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
let rightPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
let ballX = WIDTH / 2;
let ballY = HEIGHT / 2;
let ballSpeedX = 4;
let ballSpeedY = 2;
let leftPlayerScore = 0;
let rightPlayerScore = 0;

function resetBall() {
  ballX = WIDTH / 2;
  ballY = HEIGHT / 2;
  ballSpeedX = -ballSpeedX;
}

function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + BALL_SIZE >= HEIGHT) {
    ballSpeedY = -ballSpeedY;
  }

  // Left paddle collision
  if (
    ballX <= 10 &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + PADDLE_HEIGHT
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Right paddle collision
  if (
    ballX >= WIDTH - 10 - BALL_SIZE &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + PADDLE_HEIGHT
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Scoring
  if (ballX <= 0) {
    rightPlayerScore++;
    resetBall();
  }
  if (ballX >= WIDTH) {
    leftPlayerScore++;
    resetBall();
  }
}

function broadcastGameState() {
  const state = {
    type: 'stateUpdate',
    ball: { x: ballX, y: ballY },
    leftPaddleY,
    rightPaddleY,
    score: [leftPlayerScore, rightPlayerScore]
  };

  const message = JSON.stringify(state);
  for (const client of gameClients) {
    if (client.readyState === 1) {
      client.send(message);
    }
  }
}

// Game loop (60 FPS)
setInterval(() => {
  updateBall();
  broadcastGameState();
}, 1000 / 60);

const gameWebsocketHandler = (socket) => {
  // // console.log('Backend connected to game client:', req.socket.remoteAddress);
  // console.log('New game client connected:', connection.socket);
  // connection.on('message', msg => {
  //   console.log('Message received:', msg);
  // });
  gameClients.add(socket);

  const playerId = players.length < 2 ? players.length + 1 : null;
  if (playerId) players.push(socket);

  socket.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'move') {
      if (playerId === 1) {
        if (data.key === 'ArrowUp') leftPaddleY -= 10;
        if (data.key === 'ArrowDown') leftPaddleY += 10;
      }
      if (playerId === 2) {
        if (data.key === 'ArrowUp') rightPaddleY -= 10;
        if (data.key === 'ArrowDown') rightPaddleY += 10;
      }
    }
  });

  socket.on('close', () => {
    gameClients.delete(socket);
    players = players.filter(p => p !== socket);
  });
};


export default {
  chatWebsocketHandler,
  gameWebsocketHandler
};