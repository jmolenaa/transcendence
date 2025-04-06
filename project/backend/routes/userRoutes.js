import userControllers from '../controllers/userControllers.js';


export default async function userRoutes(fastify) {
    fastify.get('/api/users', userControllers.getAllUsersHandler);
    fastify.delete('/api/users', userControllers.deleteUserHandler);
    fastify.post('/api/users', userControllers.createUserHandler);
}
