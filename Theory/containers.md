
# Containers:
-backend + sqlite
-nginx




1 Backend Container (Fastify)
Purpose:
Runs your API and game logic
Manages authentication, matchmaking, and tournament handling
Interacts with SQLite (or another database)
Integrates with the blockchain (Avalanche testnet)

Why separate?
Keeps business logic independent of the frontend
Allows scalability (e.g., multiple backend instances with a load balancer)
Ensures security (backend is isolated, not exposed directly to users)

Dependencies:
✅ Blockchain API


2 Frontend Container (React/Vanilla TS) Are we doing it?
Purpose:
Serves the Single-Page Application (SPA)
Calls the backend API to get/update user data
Displays live game updates & matchmaking
Handles Google authentication & WebSockets

Why separate?
Separation of Concerns: The frontend handles user interactions, and the backend handles data and logic. They have different roles.

Scalability: In the future, you might need to scale them separately. The backend may need more resources for data processing, while the frontend might need to be served faster.

Better Deployment: It’s easier to deploy and update them separately.

Nginx Serving: NGINX serves static files for the frontend (like HTML, CSS, JS), which are bundled and optimized. These files don’t need the backend to run; they just need a web server to serve them.

Dependencies:
✅ Backend API
✅ NGINX Proxy


3 Reverse Proxy Container (NGINX or Traefik)
Purpose:
NGINX will manage traffic between the user and your frontend, handling things like load balancing, SSL termination, and caching. It will also help route requests efficiently to the backend when needed.
Routes traffic to backend/frontend
Enforces HTTPS (SSL certificates)
Prevents attacks (DDoS, rate limiting, CORS, security headers)
Handles WebSockets for real-time game updates

Why separate?
Security & Scalability → Exposes only necessary ports
Performance Boost → Caches frontend assets
Required for HTTPS → Secure communication

Dependencies:
✅ Backend (API requests)
✅ Frontend (SPA serving)




How These Containers Work Together
+------------+      +--------+      +------------+
|   User     | ---> | NGINX  | ---> |  React     |
|   Browser  |      | Proxy  |      |  Frontend  |
+------------+      +--------+      +------------+
                            |
                            v
                  +-----------------+
                  |  Fastify (API)  |
                  +-----------------+
                            |
                            v
                +----------------------+
                |   SQLite Database    |
                +----------------------+
                            |
                            v
                +----------------------+
                | Avalanche Testnet    |
                | (Blockchain)         |
                +----------------------+


User accesses the system through their browser.

NGINX routes the requests:
	Serves static assets (React frontend).
	For API requests (/api/*), NGINX proxies these to Fastify.

React Frontend communicates with Fastify through API requests (e.g.,  POST /api/users, GET /api/users).

Fastify interacts with SQLite to read and write data, such as adding or retrieving users.

Fastify may also interact with the Avalanche Testnet for blockchain-related data or smart contract interactions.