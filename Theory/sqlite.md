# Work with sqlite:
sqlite3 database.sqlite
.tables
PRAGMA table_info(users); - see the Table Structure:
.exit - leave

# Tables:

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

**Create tables:**

ON DELETE CASCADE  If the parent (user) is deleted, delete all related data.
Examples:
	Scores: If a user is deleted, their score records should also be deleted, since they are tied directly to the user.
	Leaderboard: If a user is deleted, they should be removed from the leaderboard.
	Matches (if they can’t exist without players): If a match requires both players, and one is deleted, then the match should also be deleted.

ON DELETE SET NULL If the parent (user) is deleted, keep the record but remove the reference to the deleted entity.
	Matches (if they should stay even if a player is deleted): If a user is deleted, but the match should still exist in records, just without a winner, then winner_id should be set to NULL.
	Tournaments: If a tournament references a user (e.g., a tournament creator), but we still want to keep the tournament even if the user is deleted, then creator_id should be set to NULL.



Cmds:
sqlite3 mydatabase.db

Show all tables
.tables

Show schema of a table
.schema users

Select all
SELECT * FROM users;


Conditional select
SELECT * FROM users WHERE id = 1;
SELECT * FROM users ORDER BY alias;

Leave
.exit