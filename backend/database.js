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

    CREATE TABLE IF NOT EXISTS  tournaments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        status TEXT CHECK(status IN ('pending', 'ongoing', 'completed')) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS  matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tournament_id INTEGER NOT NULL,
        player1_id INTEGER NOT NULL,
        player2_id INTEGER NOT NULL,
        winner_id INTEGER,
        status TEXT CHECK(status IN ('scheduled', 'in_progress', 'finished')) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
        FOREIGN KEY (player1_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (player2_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (winner_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS  scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        match_id INTEGER NOT NULL,
        player_id INTEGER NOT NULL,
        score INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE SET NULL,
        FOREIGN KEY (player_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS  leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tournament_id INTEGER NOT NULL,
        player_id INTEGER NOT NULL,
        total_score INTEGER NOT NULL,
        FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE SET NULL,
        FOREIGN KEY (player_id) REFERENCES users(id) ON DELETE SET NULL
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

export function deleteUser(alias) {
	const stmt = db.prepare('DELETE FROM users WHERE alias = ?');
	const info = stmt.run(alias);
	return info.changes > 0;
	// const success = deleteUser(alias)
    // if (!success) {
    //     return reply.status(404).send({ error: 'User not found' });
    // }
}


// Export the database instance for direct use if needed
export default db;