import { getUsers, addUser, deleteUser, addPlayers } from '../services/userServices.js';

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

const addingPlayers = (request, reply) => {
    const { player1, player2 } = request.body;

    if (!player1 || !player2) {
        return reply.status(400).send({ error: 'Both player names are required' });
    }

    const userId = addPlayers(player1, player2);
    reply.send({ message: 'Players added', gameId: userId });
}

export default {
    getAllUsersHandler,
    createUserHandler,
    deleteUserHandler,
    addingPlayers
};

