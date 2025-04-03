//npm install -g wscat
//npm install typescript
//npx tsc --init


import Fastify from 'fastify';
import websocket from '@fastify/websocket';

const fastify = Fastify();

// Регистрируем плагин для WebSocket
fastify.register(websocket);

// Хранение всех подключений
let clients = [];

fastify.get('/ws', { websocket: true }, (connection, req) => {
    console.log('Connection!')
    // Добавляем клиента в список при подключении
    clients.push(connection);

    // Обработка сообщений
    connection.socket.on('message', (message) => {
        console.log('Received message:', message.toString());

        // Отправляем сообщение всем подключенным клиентам
        clients.forEach(client => {
            // if (client !== connection) {  // Чтобы не отправлять сообщение обратно самому себе
                client.socket.send(message);
            // }
        });
    });

    // Удаление клиента из списка при отключении
    connection.socket.on('close', () => {
        clients = clients.filter(client => client !== connection);
        console.log('Client disconnected');
    });
});

// Запуск сервера
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});
