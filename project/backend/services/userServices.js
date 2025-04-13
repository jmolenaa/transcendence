import db from '../database/index.js';
import bcrypt from 'bcrypt';
// Function to insert a user
export function addUser(username) {
    const checkUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (checkUser) {
        console.log("User already exists:", checkUser);
        return ;
    }
    const stmt = db.prepare('INSERT INTO users (username) VALUES (?)');
    const info = stmt.run(username);
    return info.lastInsertRowid;
}

// Function to get all users
export function getUsers() {
    return db.prepare('SELECT * FROM users').all();
    
}

// Function to get a user by ID
export function getUserById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

export function addPlayers(player1, player2) {
    console.log('In userServices players:', player1, player2);
    const info1 = addUser(player1);
    const info2 = addUser(player2);
    return [info1, info2];
}


export function deleteUser(username) {
    const stmt = db.prepare('DELETE FROM users WHERE username = ?');
    const info = stmt.run(username);
    console.log("Delete result:", info);
    return info.changes > 0;
}


//Not working yet
export function saveGameResults(player1, player2, winner_name) {
    const user1 = db.prepare('SELECT * FROM users WHERE username = ?').get(player1);
    const user2 = db.prepare('SELECT * FROM users WHERE username = ?').get(player2);

    if (!user1 || !user2) {
        console.log("One or both players not found in the database");
        return;
    }
    const winner = db.prepare('SELECT * FROM users WHERE username = ?').get(winner_name);
    if (!winner) {
        console.log("Winner not found in the database");
        return;
    }
    const stmt = db.prepare('INSERT INTO games (player1_id, player2_id) VALUES (?, ?)');
    const info = stmt.run(user1.id, user2.id);
    return info.lastInsertRowid;
}

//get(email) in sqlite3 is asynchronous,it returns promise, need await
export async function checkCredentials (email){
	const user = await db.prepare('SELECT * FROM users WHERE email = ?').get(email);
	console.log("User found: ", user.password);
    console.log("Type of function: ",typeof user.then); // Will be 'function' if it's a Promise and needs await
	return user;
}

//bcrypt is asynchronous, I have to use await
export async function registerInDatabase(email, password, username) {
	const hashedPassword = await bcrypt.hash(password, 10); 
	const stmt = db.prepare('INSERT INTO users (email, password, username) VALUES (?, ?, ?)');
	const info = stmt.run(email, hashedPassword, username);
	console.log("User registered: ", user.password);
	return info;
}


// Export the database instance for direct use if needed
export default db;