//npm install -g wscat
//npm install typescript
//npx tsc --init


import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify();
// Register static file handler
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
}); 

// Регистрируем плагин для WebSocket
fastify.register(websocket);

// Хранение всех подключений
let clients = [];

fastify.get('/ws', { websocket: true }, (connection) => {
    console.log('Client connected');
    console.log('Total connected clients:', clients.length);
    clients.push(connection.socket);
    connection.socket.on('message', (message) => {
    console.log('Received:', message.toString());

    // 🔁 Broadcast to all clients
    clients.forEach((client) => {
    //   if (client.readyState === 1) {
        client.send(message);
    //   }
    });
  });

  connection.socket.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter((client) => client !== connection);
    console.log('Total connected clients:', clients.length);
  });
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server listening on port 3000');
});