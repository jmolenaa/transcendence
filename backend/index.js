import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import {getUsers, addUser, getUserById} from './database.js';

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

// API: Add a new user
fastify.post('/api/users', async (request, reply) => {
    const { alias } = request.body;
    if (!alias) {
        return reply.status(400).send({ error: 'Alias is required' });
    }
    const userId = addUser(alias);
    reply.send({ id: userId, alias });
});

fastify.listen({port: port}, (err, address) =>{
     if (err) {
        fastify.log.error(err);
        process.exit(1)
     }
});