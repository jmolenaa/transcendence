// versions:     
//     "@fastify/websocket": "^5.0.0",
//     "fastify": "^3.29.0",
//     "fastify-static": "^4.7.0",
//     "ws": "^8.18.1"
//      npm install @fastify/websocket@^5.0.0 fastify@^3.29.0 fastify-static@^4.7.0 ws@^8.18.1


const Fastify = require('fastify');
const fastifyWebSocket = require('@fastify/websocket');
const fastifyStatic = require('fastify-static');
const path = require('path');

const fastify = Fastify();
fastify.register(fastifyWebSocket);
fastify.register(fastifyStatic, {
  root: path.join(__dirname),
  prefix: '/', // Serve index.html from root
});

const clients = new Set(); // store all connected clients

fastify.get('/ws', { websocket: true }, (connection, req) => {
  clients.add(connection.socket);
  console.log('Client connected. Total:', clients.size);

  connection.socket.on('message', (message) => {
    const msgText = message.toString();
    console.log('Received:', msgText);

    // Broadcast to all connected clients
    for (const client of clients) {
      if (client.readyState === 1 &&  client !== connection.socket){
        client.send(msgText);
      }
    }
  });

  connection.socket.on('close', () => {
    clients.delete(connection.socket);
    console.log('Client disconnected. Total:', clients.size);
  });

  // Optional: greet the new client
  connection.socket.send('Welcome! You are now connected.');
});

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
