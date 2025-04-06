import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import userRoutes from './routes/userRoutes.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const port = 3000;

const fastify = Fastify({ logger: true });

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../frontend/public'),
  prefix: '/',  // Serve static files from the root URL (e.g., /index.html, /style.css)
});

// Register the src directory to serve JS files (make sure you use a different prefix)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../frontend/src'),
  prefix: '/src/',  // Serve JS files under the /src/ path (e.g., /src/pong.js, /src/players.js)
  decorateReply: false,
});

// Serve index.html
fastify.get('/', (request, reply) => {
  reply.sendFile('index.html');
});

// Register all routes
fastify.register(userRoutes);

fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

//run: npx nodemon index.js
