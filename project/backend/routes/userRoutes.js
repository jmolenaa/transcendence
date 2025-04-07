import userControllers from '../controllers/userControllers.js';
import websocket from '../plugins/websocket.js';

export default async function userRoutes(fastify) {
    fastify.get('/api/users', userControllers.getAllUsersHandler);
    fastify.delete('/api/users', userControllers.deleteUserHandler);
    fastify.post('/api/users', userControllers.createUserHandler);
    fastify.post('/api/players', userControllers.addingPlayersHandler);
    fastify.post('/api/winner', userControllers.saveWinnerHandler);

    //Chat:
    fastify.get('/ws', { websocket: true }, websocket.getWebsocketHandler);
}
