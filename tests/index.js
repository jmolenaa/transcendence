import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import {getUsers, addUser, getUserById, deleteUser} from './database.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const port = 3000;
const fastify = Fastify({
    logger: true
    //is an option that enables logs about incoming requests and any errors that occur.
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
});

// we use the register API, which is the core of the Fastify framework. 
// It is the only way to add routes, plugins, et cetera.
fastify.get('/',(request, reply) => {
    reply.sendFile('index.html');
});

fastify.get('/api/message', (request, reply) => {
    reply.send({ message: 'Hello from Fastify' });
  });

// API: Fetch all users
fastify.get('/api/users', (request, reply) => {
    const users = getUsers();  // Retrieve all users from the database
    reply.send(users);  // Send the list of users as the response
});

fastify.delete('/api/users', async(request, reply) => {
    const { username } = request.body;  
    console.log("Deleting user with username:", username); // Debugging
    if (!username) {
        return reply.status(400).send({ error: 'username is required' });
    }
	const success = deleteUser(username)
    if (!success) {
        return reply.status(404).send({ error: 'User not found' });
    }
    reply.send({ success: true, username });	
});

// API: Add a new user
fastify.post('/api/users', async (request, reply) => {
    const { username } = request.body;
    if (!username) {
        return reply.status(400).send({ error: 'username is required' });
    }
    const userId = addUser(username);
    reply.send({ id: userId, username });
});

fastify.listen({port: port}, (err, address) =>{
     if (err) {
        fastify.log.error(err);
        process.exit(1)
     }
});




//npm install fastify fastify-websocket