# transcendence

**Node.js** lets to run JavaScript on the server. Without Node we can't handle user input or store data dynamically. If we want dynamic data, we'd need an actual backend (which JavaScript alone can't create without Node.js).
But.....without **Fastify** we can handle requests and return data. And no built-in routing, JSON parsing, or request validation.
Fastify is a framework that helps to build web servers easily using Node.js.

What is **routing**?
	Routing is the process of handling different URL requests in a web server:
		Return all users when a request is made to /users
		Return a specific user when a request is made to /users/:id
		Create a new user when a POST request is made to /users

What is **JSON Parsing**?
	When a client sends data to the backend using a POST request, the body is in JSON format. Without Fastify we would manually parse strings of data.
What is **request validation**?
	Instead of validating request with if... else .... statements, we can:
		const userSchema = {
			schema: {
				body: {
					type: "object",
					required: ["name"],
					properties: {
						name: { type: "string" }
					}
				}
			}
		};

There are two types of modules in JS (ways to import and export code): 
- Common JS
    const varName = require(locationName);
- ES modules (new way of im-/exporting)
    import varName from 'locationName' 

### Start working:
Initialize a Node.js Project in the Folder:  npm init -y
npm install fastify@4
npm install @fastify/static@7 for working with html
npm install sqlite3 better-sqlite3 for working with a database

npm init -y && npm install fastify@4 && npm install @fastify/static@7 && npm install sqlite3 better-sqlite3 fastify-sqlite && npm install @fastify/websocket@10


Run the server: node index.js

**API stands for Application Programming Interface**, which is just a way for one software (e.g., your React app) to talk to another software (e.g., Fastify) using standard methods (like GET, POST). The API server takes requests from the frontend, processes them (by talking to databases, other services, or logic), and sends back responses. API: Canvas, MapTiles, Google Search, Youtube.


