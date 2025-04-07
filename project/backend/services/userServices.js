import db from '../database/index.js';

// Function to insert a user
export function addUser(alias) {
    const checkUser = db.prepare('SELECT * FROM users WHERE alias = ?').get(alias);
    if (checkUser) {
        console.log("User already exists:", checkUser);
        return ;
    }
    const stmt = db.prepare('INSERT INTO users (alias) VALUES (?)');
    const info = stmt.run(alias);
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


export function deleteUser(alias) {
    const stmt = db.prepare('DELETE FROM users WHERE alias = ?');
    const info = stmt.run(alias);
    console.log("Delete result:", info);
    return info.changes > 0;
}


//Not working yet
export function saveGameResults(player1, player2, winner_name) {
    const user1 = db.prepare('SELECT * FROM users WHERE alias = ?').get(player1);
    const user2 = db.prepare('SELECT * FROM users WHERE alias = ?').get(player2);

    if (!user1 || !user2) {
        console.log("One or both players not found in the database");
        return;
    }
    const winner = db.prepare('SELECT * FROM users WHERE alias = ?').get(winner_name);
    if (!winner) {
        console.log("Winner not found in the database");
        return;
    }
    const stmt = db.prepare('INSERT INTO games (player1_id, player2_id) VALUES (?, ?)');
    const info = stmt.run(user1.id, user2.id);
    return info.lastInsertRowid;
}

// Export the database instance for direct use if needed
export default db;