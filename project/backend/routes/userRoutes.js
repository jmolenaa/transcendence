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

	//Auth:
	fastify.post('/api/auth/login', userControllers.loginHandler);
	fastify.post('/api/auth/register', userControllers.registerHandler);
	// fastify.post('/api/auth/logout', userControllers.logoutHandler);// ??
	// fastify.get('/api/auth/user', userControllers.getUserHandler); //??
	// fastify.post('/api/auth/verify', userControllers.verifyHandler); //??

    //Google
    // fastify.get('/api/auth/google', userControllers.googleHandler);
    // fastify.get('/api/auth/callback', userControllers.callbackHandler);


    //Profile only for logged in
    fastify.get('/api/profile', userControllers.profileHandler);
}
