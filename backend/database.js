//create and intialize a database:
//Not connected to js yet
import Database from 'better-sqlite3';
const db = new Database('database.sqlite');

db.exec(`
    CREATE TABLE IF NOT EXISTS  users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alias TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

`);

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

// Export the database instance for direct use if needed
export default db;