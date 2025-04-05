//npm install -g wscat
//npm install typescript
//npx tsc --init


const Fastify = require('fastify');
const fastifyWebSocket = require('@fastify/websocket');
const fastifyStatic = require('fastify-static');
const path = require('path');


const fastify = Fastify();
fastify.register(fastifyWebSocket);

// Register static file handler
fastify.register(fastifyStatic, {
    root: path.join(__dirname),
    prefix: '/',
}); 

// Регистрируем плагин для WebSocket

// Хранение всех подключений
let clients = [];

fastify.get('/ws', { websocket: true }, (connection, req) => {
    console.log('Client connected');
    clients.push(connection.socket);
    console.log('Total connected clients:', clients.length);
    
    connection.socket.on('message', (message) => {
        const msg = message.toString();
        // 🔁 Broadcast to all clients
        clients.forEach((client) => {
          if (client.readyState === 1 &&  client !== connection.socket) {
            client.send(msg);
          }
        });
  });

  connection.socket.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter((client) => client !== connection.socket);
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