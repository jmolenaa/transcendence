import * as userServices  from '../services/userServices.js';
import {handleError} from '../utils/utils.js';

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

    const userId = userServices.addPlayers(player1, player2);
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

const profileHandler = (request, reply) => {
    console.log("Profile handler called"); // Debugging
	const token = request.cookies.token;
	if (!token){
		return reply.code(401).send({error: "Not authorized"});
	}
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = userServices.getUserByEmail(decoded.email); 
		if (!user) {
			return reply.code(404).send({ error: 'User not found' });
		}
		reply.send({ user });
	}
	catch (err) {
		console.error('Token verification error:', err);
		reply.code(401).send({ error: 'Invalid token' });
	}
}

const uploadAvatarHandler = async(request, reply) => {
    const data = await request.file;
    const filename = `avatar_${Date.now()}_${data.filename}`;
    console.log("File name:", filename); // Debugging
    const filepath = path.join(__dirname, 'uploads', filename);
    await pump(data.file, fs.createWriteStream(filepath));
    const avatarUrl = `/uploads/${filename}`;
    return { success: true, avatar: avatarUrl };
}


export default {
    getAllUsersHandler,
    createUserHandler,
    deleteUserHandler,
    addingPlayersHandler,
    saveWinnerHandler,
	profileHandler,
    uploadAvatarHandler,
};

