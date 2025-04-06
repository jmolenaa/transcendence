import db from '../database/index.js';

// Function to insert a user
export function addUser(alias) {
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
    const stmt = db.prepare('INSERT INTO users (alias) VALUES (?)');
    const info1 = stmt.run(player1);
    const info2 = stmt.run(player2);
    return [info1.lastInsertRowid, info2.lastInsertRowid];
}


export function deleteUser(alias) {
    const stmt = db.prepare('DELETE FROM users WHERE alias = ?');
    const info = stmt.run(alias);
    console.log("Delete result:", info);
    return info.changes > 0;
}

// Export the database instance for direct use if needed
export default db;