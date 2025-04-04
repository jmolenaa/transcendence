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
url: the path of the URL to match this route (alias: path).
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