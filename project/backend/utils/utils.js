
//handleError() expects an Error object (or at least something with .message)
export function handleError (reply, error, statusCode = 500) {
    console.error('\x1b[31mError: %s\x1b[0m', error);
    reply.status(statusCode).send({ error: error.message || 'Internal Server Error' });
};