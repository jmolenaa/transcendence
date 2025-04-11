import * as userServices  from '../services/userServices.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET; //using environmental variable for JWT secret

const getAllUsersHandler = (request, reply) => {
    const users = getUsers();  // Retrieve all users from the database
    reply.send(users);  // Send the list of users as the response
}

const createUserHandler = (request, reply) => {
    const { username } = request.body;
    if (!username) {
        return reply.status(400).send({ error: 'username is required' });
    }
    const userId = addUser(username);
    reply.send({ id: userId, username }); 
}

const deleteUserHandler = (request, reply) => {
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
}

const addingPlayersHandler = (request, reply) => {
    const { player1, player2 } = request.body;

    if (!player1 || !player2) {
        return reply.status(400).send({ error: 'Both player names are required' });
    }

    const userId = addPlayers(player1, player2);
    reply.send({ message: 'Players added in Controllers', gameId: userId });
}

const saveWinnerHandler = (request, reply) => {
    const { player1, player2, winner_name } = request.body;
    if (!player1 || !player2 || !winner_name) {
        return reply.status(400).send({ error: 'Player names and winner ID are required' });
    }

    const gameId = saveGameResults(player1, player2, winner_name);
    reply.send({ message: 'Game results saved', gameId });
}


const loginHandler = async(request, reply) => {
	const { username, password } = request.body;
	if (!username || !password) {
		return reply.status(400).send({ error: 'Username and password are required' });
	}
	const user = checkCredentials(username, password);
	if (!user) {
		return reply.status(401).send({ error: 'Invalid credentials' });
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return reply.status(401).send({ error: 'Invalid credentials' });
	}
//Generate a JWT (JSON Web Token) for the user
	const payload = {
		userId: user.id,
		username: user.username,
	}
	const token = fastify.jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

	reply.send({ token });

	//or set the JWT in an HTTP-only cookie
	    // Send the JWT as an HTTP-only cookie
		// reply.setCookie('token', token, {
		// 	httpOnly: true,  // Ensures it's not accessible via JavaScript
		// 	secure: process.env.NODE_ENV === 'production',  // Ensures the cookie is only sent over HTTPS in production
		// 	sameSite: 'Strict',  // Prevents cross-site request forgery attacks
		// 	expires: new Date(Date.now() + 3600 * 1000)  // Cookie expires in 1 hour
		// });
		// reply.send({ message: 'Login successful' });

	// and it will need:
	// const protectedRouteHandler = async (request, reply) => {
	// 	try {
	// 		// Get the JWT from the cookie
	// 		const token = request.cookies.token;
	// 		if (!token) {
	// 			return reply.status(401).send({ error: 'No token provided' });
	// 		}
	
	// 		// Verify the token
	// 		const decoded = fastify.jwt.verify(token, JWT_SECRET);
	// 		request.user = decoded;  // You can use this info in your handler
	// 		reply.send({ message: 'Protected data accessed' });
	// 	} catch (err) {
	// 		reply.status(401).send({ error: 'Invalid or expired token' });
	// 	}
	// };
}

const registerHandler = async (request, reply) => {
	const { email, password, username } = request.body;
	console.log('Incoming data:', { email, password, username });

	if (!email || !password || !username) {
		return reply.status(400).send({ error: 'Email, password and username are required' });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const registerUser = userServices.registerInDatabase(email, hashedPassword, username);

		if (!registerUser) {
			return reply.status(500).send({ error: 'Registration failed' });
		}

		reply.send({ message: 'Registration successful' });
	} catch (err) {
		console.error('Registration error:', err);
		reply.status(500).send({ error: 'Something went wrong on the server' });
	}
};

const googleHandler = async(request, reply) => {
	//https://github.com/googleapis/google-api-nodejs-client
	//https://developers.google.com/identity/protocols/oauth2

	//Theory?
};








export default {
    getAllUsersHandler,
    createUserHandler,
    deleteUserHandler,
    addingPlayersHandler,
    saveWinnerHandler,
	loginHandler,
	registerHandler

};

// Plan:
// 3. Secure the JWT Authentication Flow:
// For JWT tokens, you'll want to ensure that they are securely signed and validated.

// As you're doing in your loginHandler, you're already signing the JWT with a secret key. 
// Remember that JWTs should be stored securely on the frontend (e.g., in HTTP-only cookies) 
// to prevent XSS attacks.

// 4. Handle JWT Expiration:
// Since your JWT expires in 1 hour (expiresIn: '1h'), you'll want to handle token expiration 
// on the frontend. After the token expires, you can prompt the user to log in again or implement 
// a refresh token mechanism to extend their session.

// Refresh Tokens: A refresh token is a long-lived token that is used to obtain a new JWT when 
// the original expires. You can implement this by issuing a refresh token alongside the access token (JWT) 
// and store the refresh token in the database.