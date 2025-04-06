import {getAllUsersHandler, deleteUserHandler, createUserHandler} from '../controllers/userControllers.js';


export default async function userRoutes(fastify) {
    fastify.get('/api/users', getAllUsersHandler);
    fastify.delete('/api/users', deleteUserHandler);
    fastify.post('/api/users', createUserHandler);
}
