# transcendence

Node.js lets to run JavaScript on the server.
Fastify is a framework that helps to build web servers easily using Node.js.
There are two types of modules in JS: 
- Common JS
    const varName = require(locationName);
- ES modules.
    import varName from 'locationName'

Start working:
Initialize a Node.js Project in the Folder:  npm init -y
npm install fastify
npm install @fastify/static for working with html
npm install sqlite3 better-sqlite3 for working with a database

Run the server: node index.js


Tables:
### 1️⃣ Users Table (Stores Players)
Each player registers before the tournament starts.

| Column      | Type     | Description                              |
|------------|---------|------------------------------------------|
| `id`       | INTEGER | Unique player ID (Primary Key, Auto-Increment) |
| `alias`    | TEXT    | Player's chosen alias (nickname)        |
| `created_at` | DATETIME | Timestamp when the player registered |

---

### 2️⃣ Tournaments Table (Stores Tournament Information)
A tournament consists of multiple matches between players.

| Column       | Type     | Description                                          |
|--------------|---------|-----------------------------------------------|
| `id`         | INTEGER | Unique tournament ID (Primary Key)                    |
| `status`     | TEXT    | Tournament status (`pending`, `ongoing`, `completed`) |
| `created_at` | DATETIME | Tournament creation time |

---

### 3️⃣ Matches Table (Tracks Each Match Within a Tournament)
Each match involves two players.

| Column      | Type     | Description                                      |
|-------------|---------|--------------------------------------------------|
| `id`        | INTEGER | Unique match ID (Primary Key)                    |
| `tournament_id` | INTEGER | Related tournament ID (Foreign Key)         |
| `player1_id`  | INTEGER | First player's ID (Foreign Key)                 |
| `player2_id`  | INTEGER | Second player's ID (Foreign Key)                |
| `winner_id`   | INTEGER | The ID of the winning player (NULL if not finished) |
| `status`      | TEXT    | Match status (`scheduled`, `in_progress`, `finished`) |
| `created_at`  | DATETIME | Match start time |

---

### 4️⃣ Scores Table (Records Match Scores)
Tracks the scores for each match.

| Column      | Type     | Description                              |
|-------------|---------|------------------------------------------|
| `id`        | INTEGER | Unique score ID (Primary Key)           |
| `match_id`  | INTEGER | The match this score belongs to (Foreign Key) |
| `player_id` | INTEGER | Player who scored (Foreign Key)         |
| `score`     | INTEGER | Number of points scored                 |
| `timestamp` | DATETIME | Time when the score was recorded |

---

### 5️⃣ Leaderboard Table (Optional: Tracks Total Scores Per Tournament)
Stores cumulative scores for each player in a tournament.

| Column       | Type     | Description                               |
|--------------|---------|-------------------------------------------|
| `id`         | INTEGER | Unique ID (Primary Key)                   |
| `tournament_id` | INTEGER | Related tournament ID (Foreign Key) |
| `player_id`  | INTEGER | Player's ID (Foreign Key)                 |
| `total_score` | INTEGER | Sum of all match scores                  |

---
