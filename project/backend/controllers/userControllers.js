import { getUsers, addUser, deleteUser } from '../services/userService.js';

const getAllUsersHandler = (request, reply) => {
    const users = getUsers();  // Retrieve all users from the database
    reply.send(users);  // Send the list of users as the response
}

const createUserHandler = (request, reply) => {
    const { alias } = request.body;
    if (!alias) {
        return reply.status(400).send({ error: 'Alias is required' });
    }
    const userId = addUser(alias);
    reply.send({ id: userId, alias }); 
}

const deleteUserHandler = (request, reply) => {
    const { alias } = request.body;  
    console.log("Deleting user with alias:", alias); // Debugging
    if (!alias) {
        return reply.status(400).send({ error: 'Alias is required' });
    }
    const success = deleteUser(alias)
    if (!success) {
        return reply.status(404).send({ error: 'User not found' });
    }
    reply.send({ success: true, alias });    
}

export default {
    getAllUsersHandler,
    createUserHandler,
    deleteUserHandler
};