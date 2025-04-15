https://habr.com/ru/articles/842056/
https://xakep.ru/2024/08/07/jwt-deep-dive/

Идентификация — процесс получения идентификатора пользователя: логин / e-mail /id

Аутентификация — подтверждение личности пользователя (с помощью пароля, отпечатка пальца, и т.п.)

Авторизация — предоставление прав пользователю, выдача токена

Валидация — процесс проверки «куска» информации на соответствие требованиям программы, или просто на совпадение с копией, хранимой в базе данных.

Токен — ключ аутентификации пользователя

Credentials — учетные данные пользователя: логин, пароль, google id, и т.п.

БД — база данных

Клиент — уровень представления данных (см клиент-серверная архитектура). Имеет графический интерфейс для взаимодействия с пользователем. пример: веб-сайт в интернете.

Сервер — уровень получения и обработки данных (см клиент-серверная архитектура). Не имеет графического интерфейса, принимает запросы от клиентов через API.

API — Application Program Interface, набор команд, позволяющий обратиться к приложению

Метод API — конкретная команда, позволяющая обратиться к приложению

Публичные методы API — те, которые доступны без аутентификации пользователя, например: главная страница сайта в интернете.

Защищенные методы API — требующие обязательной аутентификации пользователя, например: личный кабинет пользователя на сайте.

Эндпоинт — url адрес метода API в интернете

JWT (Json Web Token) — ключ аутентификации пользователя. Используется для запросов к защищенным методам API.

Для чего нужны JWT: чтобы не передавать учетные данные пользователя с каждым запросом к серверу.



OAuth 2.0 Authorization Code Flow:
    Redirecting the user to Google’s OAuth 2.0 server
    User consents → Google redirects back with an auth code
    Exchange that code for an access token
    Use the token to fetch user data (e.g. name, email)
    Create a session or issue your own JWT ?

Implementation Steps in Fastify:
1. Setup ENV Vars:
    GOOGLE_CLIENT_ID=your-client-id
    GOOGLE_CLIENT_SECRET=your-client-secret
    GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

2. Install Required Packages
    npm install fastify axios fastify-cookie fastify-formbody

3. Add to index.js:
    import axios from 'axios'; // for HTTP calls (?)
    import dotenv from 'dotenv';
    import fastifyCookie from 'fastify-cookie';
    import fastifyFormbody from 'fastify-formbody';

    dotenv.config();
    await fastify.register(fastifyCookie); // to manage cookies/session
    await fastify.register(fastifyFormbody); //to parse URL-encoded bodies

4. Login Route – Redirect to Google
    fastify.get('/auth/google', async (request, reply) => {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&` +
        `response_type=code&` +
        `scope=openid%20email%20profile&` +
        `access_type=offline&` +
        `prompt=consent`;

    reply.redirect(redirectUrl);
    });

5. Callback Route – Handle Google Response

    fastify.get('/auth/callback', async (request, reply) => {
    const code = request.query.code;
    if (!code) return reply.code(400).send('Missing code');

    try {
        // Exchange code for token
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
        },
        });

        const { access_token, id_token } = tokenRes.data;

        // Get user info
        const userRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
        });

        const user = userRes.data;

        // Store user in session/cookie (or generate your own JWT)
        reply.setCookie('session', JSON.stringify(user), {
        httpOnly: true,
        path: '/',
        });

        reply.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        reply.code(500).send('Authentication failed');
    }
    });


6. Protect Routes

    fastify.get('/dashboard', async (request, reply) => {
        const session = request.cookies.session;
        if (!session) return reply.redirect('/auth/google');

        const user = JSON.parse(session);
        return `Hello, ${user.name}!`;
    });


Cookies are small pieces of data stored in the user's browser. They are:
Sent automatically with every request to your server (if properly set).
Often used to store session data, like a JWT token.
Can be made secure, so the frontend can’t access them (httpOnly: true).
When you set a cookie from the backend, the browser remembers it and sends it with every future request to that domain. That’s how your API knows who the user is, without the frontend having to manage tokens manually.


How Authentication Works Right Now
🔐 Register Flow
1. User submits registration form
The user enters their username, email, and password in the register form.

2. Frontend sends data to backend
In the frontend, you gather the form data and send a POST request to your backend:

await fetch('http://localhost:3000/api/auth/register', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	credentials: 'include', // Include cookies (JWT) in the request
	body: JSON.stringify({ username, email, password }),
});
✅ The credentials: 'include' option allows cookies (like your JWT) to be included in requests and responses.

3. Backend receives and processes request
Using REST API, the backend receives the request and hashes the password with bcrypt.

const hashedPassword = await bcrypt.hash(password, 10);


4. Create and sign JWT token
You then create and sign a JWT token:

const token = fastify.jwt.sign(
	{ email, username },
	JWT_SECRET,
	{ expiresIn: '1h' }
);
fastify.jwt.sign(...): Signs and creates the token.
The JWT is a JSON string, base64-encoded and signed.

The token contains:
The payload (email, username, etc.)
The algorithm used (e.g., HS256)
The signature (based on your JWT_SECRET)

For this we need to import JWT and load your .env file:

import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

5. Send the token in an HTTP-only cookie
Now we send a response to the frontend with the JWT stored securely in a cookie:

reply
	.setCookie('token', token, {
		httpOnly: true,        // Not accessible via JavaScript 
		secure: true,          // Only sent over HTTPS
		sameSite: 'Strict',    // Prevents attacks
		path: '/',             // Available on all routes
		maxAge: 7 * 24 * 60 * 60, // 7 days
	})
	.send({ message: 'Registration successful' });
💡 This cookie contains the JWT but is not visible in frontend JavaScript, making it more secure.

6. Frontend receives the response

const data = await res.json();

if (res.ok) {
	console.log(data.message); // "Registration successful"
}
The JWT is not returned in the body. It's automatically stored as a cookie in the browser.

On subsequent requests, the browser will automatically send this cookie back to your backend.

7. JWT Cookie in Action
On any protected route (e.g., /api/user/me), the cookie is sent automatically:

await fetch('/api/user/me', {
	method: 'GET',
	credentials: 'include', // Sends the token cookie
});
Your backend can then:
Extract the token from the cookie
Verify it using fastify.jwt.verify()
Grant access based on the decoded user info

✅ Summary
Step	Description
1.	User submits username, email, and password
2.	Frontend sends a POST request with credentials
3.	Backend hashes the password
4.	JWT is signed with fastify.jwt.sign(...)
5.	Token is stored in an HTTP-only, secure cookie
6.	Frontend gets a "Registration successful" message
7.	Browser sends JWT cookie automatically on future requests for protected pages


GOOGLE auth implementation:
https://dev.to/fozooni/google-oauth2-with-fastify-typescript-from-scratch-1a57


JWT (JSON Web Token) — открытый стандарт, описанный в RFC 7519. Определяет компактный способ для передачи информации между сторонами в виде JSON-объекта. Токены создаются сервером, подписываются секретным ключом и передаются клиенту. Access token — это ключ доступа к защищенному ресурсу, обычно с коротким сроком жизни, а refresh token позволяет запросить новый access и имеет длинный ttl.

OAuth 2.0 — это фреймворк/протокол авторизации, который описывает, каким образом реализовывать взаимодействие между сервисами для обеспечения стороннему приложению безопасной авторизации и ограничения доступа к ресурсам. 