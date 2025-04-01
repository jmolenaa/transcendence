import Fastify from 'fastify';
import path from 'path';
// @ts-ignore
import fastifyStatic from '@fastify/static';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const port = process.env.PORT || 3000;
const fastify = Fastify({
    logger: true
    //is an option that enables logs about incoming requests and any errors that occur.
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
});

//we use the register API, which is the core of the Fastify framework. 
// It is the only way to add routes, plugins, et cetera.
fastify.get('/',(request, reply) => {
    reply.sendFile('index.html');
});

fastify.get('/api/message', (request, reply) => {
    reply.send({ message: 'Hello from Fastify' });
  });

fastify.listen({port: port}, (err, address) =>{
     if (err) {
        fastify.log.error(err);
        process.exit(1)
     }
});