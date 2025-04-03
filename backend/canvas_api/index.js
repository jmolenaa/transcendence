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
    root: path.join(__dirname),
    prefix: '/',
});

// we use the register API, which is the core of the Fastify framework. 
// It is the only way to add routes, plugins, et cetera.
fastify.get('/',(request, reply) => {
    reply.sendFile('index.html');
});


fastify.post('/api/users', async (request, reply) => {
    const { player1, player2 } = request.body;

    if (!player1 || !player2) {
        return reply.status(400).send({ error: 'Both player names are required' });
    }

    const userId = await addPlayers(player1, player2);
    reply.send({ message: 'Players added', gameId: userId });
});

fastify.listen({port: port}, (err, address) =>{
     if (err) {
        fastify.log.error(err);
        process.exit(1)
     }
});

