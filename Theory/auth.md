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


