//npm install -g wscat
//npm install typescript
//npx tsc --init


import Fastify from 'fastify';
import fastifyWebSocket from '@fastify/websocket';
import path from 'path';
import fastifyStatic from '@fastify/static';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const port = 3000;
const fastify = Fastify({
    logger: true
    //is an option that enables logs about incoming requests and any errors that occur.
});

// Регистрируем плагин для WebSocket
fastify.register(fastifyWebSocket);

fastify.register(fastifyStatic, {
	root: path.join(__dirname, 'public'),
    prefix: '/',
});

// Хранение всех подключений
// let clients = [];

fastify.get('/ws', { websocket: true }, (connection, request) => {
    connection.socket.on('message', (message) => {
        console.log('Received:', message);
    });
});

// fastify.get('/ws', { websocket: true }, (connection, req) => {
//     console.log('Connection!')
//     // Добавляем клиента в список при подключении
//     // clients.push(connection); 

//     // Обработка сообщений
//     connection.socket.on('message', (message) => {
//         console.log(`Received: ${message}`);

//         // Отправляем сообщение всем подключенным клиентам
//         clients.forEach(client => {
//             if (client !== connection.socket && client.readyState === 1) {  // Чтобы не отправлять сообщение обратно самому себе
//                 client.send(message);
//             }
//         });
//     });

//     // Удаление клиента из списка при отключении
//     connection.socket.on('close', () => {
		
//         clients = clients.filter(client => client !== connection);
//         console.log('Client disconnected');
//     });
// });
fastify.get('/', (req, reply) => {
	reply.sendFile('index.html');  // Make sure the HTML file is in the 'public' folder
  });
// Запуск сервера
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    } 
    console.log(`Server running at ${address}`);
});
