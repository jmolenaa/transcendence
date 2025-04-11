**A WebSocket** is a communication protocol that enables real-time, two-way interaction between a client (like a browser) and a server over a single, long-lived connection.

## ROUTES :
https://fastify.dev/docs/latest/Reference/Routes/ 

- fastify.get(path, [options], handler) //handler is just the function
- fastify.head(path, [options], handler)
- fastify.delete(path, [options], handler)
...
Example:
fastify.get('/example/:userId', function (request, reply) {...})

or 
fastify.get('/example/:userId', (request, reply) => {...})

or
fastify.get('/ws', {websocket: true}, (connection, req) => {...})


method: currently it supports GET, HEAD, TRACE, DELETE, OPTIONS, PATCH, PUT and POST. 
url: the path of the URL to match this route (username: path).
schema: an object containing the schemas for the request and response. They need to be in JSON Schema format
onRequest(request, reply, done): a function called as soon as a request is received, it could also be an array of functions....

....


**The request object** contains details about the incoming HTTP request, including:
Property	Description
request.params	URL parameters (e.g., /user/:id)
request.query	Query parameters (e.g., /search?q=pong)
request.body	Data sent in a POST or PUT request
request.headers	HTTP headers sent by the client
request.method	HTTP method used (GET, POST, etc.)
request.url	Full request URL

    console.log(request.params);  // { id: '123' }
    console.log(request.query);   // { name: 'John' }  (if URL is `/user/123?name=John`)
    console.log(request.headers); // Show all headers

**Reply:**
Return JSON (Auto-Handled by Fastify)
fastify.get('/hello', (request, reply) => {
    return { message: 'Hello, Fastify!' }; // Auto-transforms to JSON
});

Manually Send JSON
fastify.get('/json', (request, reply) => {
    reply.send({ message: 'Hello, JSON!' });
});

Send a String Response
fastify.get('/text', (request, reply) => {
    reply.send('Plain text response');
});

Set HTTP Status Code
fastify.get('/error', (request, reply) => {
    reply.code(400).send({ error: 'Bad Request' });
});

Redirect to Another URL
fastify.get('/redirect', (request, reply) => {
    reply.redirect('https://google.com');
});

Set Custom Headers
fastify.get('/custom-header', (request, reply) => {
    reply.header('X-Custom-Header', 'MyHeaderValue').send({ success: true });
});


**JSON Schema** is a way to define, validate, and structure JSON data. Think of it as a blueprint that describes what data should look like.
WITHOUT JSON SCHEMA:
fastify.post('/user', (request, reply) => {
    const { name, age, email } = request.body;
    
    if (!name || typeof name !== 'string') {
        return reply.code(400).send({ error: 'Name is required and must be a string' });
    }
    if (!age || typeof age !== 'number') {
        return reply.code(400).send({ error: 'Age must be a number' });
    }
    
    return reply.send({ message: 'User created successfully' });
});
WITH JSON SCHEMA:
const userSchema = {
    body: {
        type: 'object',
        required: ['name', 'age', 'email'],
        properties: {
            name: { type: 'string' },
            age: { type: 'integer', minimum: 18 },
            email: { type: 'string', format: 'email' }
        }
    }
};

fastify.post('/user', { schema: userSchema }, (request, reply) => {
    return reply.send({ message: 'User created successfully' });
});



1. Создание WebSocket-соединения:
 - Мы создаем WebSocket-соединение с сервером, указав его адрес: ws://localhost:3000/ws.
const socket = new WebSocket('ws://localhost:3000/ws');
 - Используем событие onopen, чтобы узнать, когда соединение установлено.
 socket.onopen = () => { };

2. Обработка входящих сообщений:
 - Когда сервер отправляет сообщение, мы добавляем его в элемент с ID messages, чтобы показать пользователю, что произошло.
socket.onmessage = (event) => {  }; - Сервер отправляет сообщение
3. Отправка сообщений:
 - Когда пользователь вводит сообщение и нажимает кнопку, оно отправляется на сервер через socket.send(). 
function sendMessage() {... socket.send(message); ...} - Клиент отправляет сообщение


TypeScript — это надстройка над JavaScript, которая добавляет статическую типизацию и другие возможности для улучшения качества кода. 
JavaScript:
    Он не требует явного указания типов для переменных, функций и объектов.
    Код компилируется непосредственно в браузере или сервере, как есть (через Node.js или другие среды).

TypeScript:
    Это надстройка над JavaScript, который добавляет статическую типизацию.
    TypeScript требует явного указания типов для переменных, параметров функций и других элементов кода.
    TypeScript код компилируется в обычный JavaScript перед тем, как он будет выполнен в браузере или на сервере. Это добавляет дополнительные шаги в процессе разработки, но позволяет ловить ошибки на этапе компиляции и улучшить поддержку и автодополнение в IDE.

Что делать, если ты хочешь использовать только JavaScript:
Если ты не хочешь использовать TypeScript и хочешь работать только с чистым JavaScript, убедись, что:
    Ты не устанавливаешь пакеты для TypeScript (typescript, @types/...).
    Ты не используешь файл tsconfig.json, так как это конфигурация для TypeScript.
    Ты пишешь код в файлах с расширением .js, а не .ts.

можно использовать бэкенд на JavaScript и фронтенд на TypeScript.
Бэкенд: Используется Node.js с фреймворками, как Fastify или Express, на JavaScript. Типизация не обязательна, но сервер может работать с API, предоставляя данные.
Фронтенд: Используется TypeScript для безопасности, автодополнения и типизации. Современные фреймворки, такие как React, Angular или Vue, поддерживают TypeScript, который компилируется в JavaScript для работы в браузере.
API: Бэкенд и фронтенд могут взаимодействовать через REST API или WebSockets, что позволяет легко интегрировать их между собой.




Check:

Great! It's good to know that you're able to send messages with the connection `const socket = new WebSocket('https://0.0.0.0:3000/ws');`. However, there are a few important details we should address to ensure everything works properly in your GitHub Codespaces setup:

### 1. **WebSocket over HTTPS**
   - When using `https://`, your WebSocket connection must be over **secure WebSocket (wss)**, as WebSockets over `https` require `wss` (WebSocket Secure).
   - The WebSocket protocol over HTTPS needs to be secured, which means the server must be running an SSL/TLS certificate.

   If your server is currently not configured to use SSL (which is typical in local development environments), you need to adjust it to support WebSocket Secure (`wss://`).

### 2. **Setting up HTTPS for WebSocket**
   If you're trying to use `wss://` (secure WebSocket) and need to set up HTTPS, you'll need to modify your WebSocket server to enable SSL. Here’s a basic way to enable `wss://` for your Fastify WebSocket server:

   #### Example for SSL setup with Fastify:

   First, you’ll need to install the necessary SSL libraries:
   ```bash
   npm install fastify-https
   ```

   Then, you’ll need to generate or get your SSL certificates (`cert.pem` and `key.pem` files). If you don’t have SSL certificates, you can generate self-signed ones for testing:

   ```bash
   openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout key.pem -out cert.pem
   ```

   #### Fastify with SSL configuration:

   ```javascript
   import Fastify from 'fastify';
   import websocket from '@fastify/websocket';
   import path from 'path';
   import fs from 'fs';

   const fastify = Fastify();

   // Register WebSocket and static file handler
   fastify.register(websocket);
   fastify.register(require('@fastify/static'), {
       root: path.join(__dirname, 'public'),
       prefix: '/',
   });

   // SSL setup for secure WebSocket
   const certOptions = {
       key: fs.readFileSync(path.join(__dirname, 'key.pem')),
       cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
   };

   // WebSocket clients array
   let clients = [];

   fastify.get('/ws', { websocket: true }, (connection) => {
       console.log('Client connected');
       clients.push(connection.socket);

       connection.socket.on('message', (message) => {
           console.log('Received message:', message.toString());

           // Broadcast to all clients
           clients.forEach((client) => {
               if (client.readyState === 1) {
                   client.send(message);
               }
           });
       });

       connection.socket.on('close', () => {
           console.log('Client disconnected');
           clients = clients.filter((client) => client !== connection.socket);
       });
   });

   // Start the server with HTTPS
   fastify.listen({ port: 3000, host: '0.0.0.0', https: certOptions }, (err, address) => {
       if (err) {
           console.error(err);
           process.exit(1);
       }
       console.log(`Server listening on ${address}`);
   });
   ```

   In this code:
   - The WebSocket server is secured with SSL.
   - The `wss://` protocol will now work, and clients will be able to connect using `wss://0.0.0.0:3000/ws`.

### 3. **Change WebSocket client to `wss://`**
   Since your server is now secure with `wss://`, you need to update the client connection as well:

   ```javascript
   const socket = new WebSocket('wss://0.0.0.0:3000/ws');
   ```

### 4. **Check Firewall and Port Exposure in Codespaces**
   If you are using GitHub Codespaces, you may still need to expose the port correctly:
   - Go to the **Ports** section in Codespaces and ensure port `3000` is exposed for both HTTP and HTTPS traffic.
   - Make sure to check the port URL provided by GitHub Codespaces once it's exposed. It may look like `https://<your-codespace-name>-3000.githubpreview.dev`, and you should use that URL in the client instead of `localhost` or `0.0.0.0`.

---

### Summary
1. Use `wss://` (secure WebSocket) when the server is running over `https://`.
2. Set up SSL/TLS certificates for your server to handle secure WebSocket connections.
3. Update the WebSocket connection URL in your client to `wss://0.0.0.0:3000/ws`.
4. Ensure the port `3000` is exposed properly in Codespaces.

Let me know if this helps or if you encounter any further issues!