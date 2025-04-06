import userControllers from '../controllers/userControllers.js';
import websocket from '../plugins/websocket.js';

export default async function userRoutes(fastify) {
    fastify.get('/api/users', userControllers.getAllUsersHandler);
    fastify.delete('/api/users', userControllers.deleteUserHandler);
    fastify.post('/api/users', userControllers.createUserHandler);
    fastify.post('/api/players', userControllers.addingPlayers);

    //Chat:
    fastify.get('/ws', websocket.getWebsocketHandler);
}
