const WebSocket = require('ws');

// Connect to the WebSocket server
const socket = new WebSocket('ws://127.0.0.1:3000/ws');

// When the connection is established
socket.on('open', () => {
  console.log('Connected to WebSocket server!');
  socket.send('Hello from the client!');
});

// When a message is received from the server
socket.on('message', (data) => {
  console.log('Message from server:', data.toString());
});

// Handle errors
socket.on('error', (error) => {
  console.error('WebSocket Error:', error);
});

// When the connection is closed
socket.on('close', () => {
  console.log('Connection closed');
});
