const clients = new Set();

const getWebsocketHandler  = (connection, req) => {
    clients.add(connection.socket);
    console.log('Client connected. Total:', clients.size);
  
    connection.socket.on('message', (message) => {
      const msgText = message.toString();
      console.log('Received:', msgText);
  
      // Broadcast to all connected clients
      for (const client of clients) {
        if (client.readyState === 1 &&  client !== connection.socket){
          client.send(msgText);
        }
      }
    });
  
    connection.socket.on('close', () => {
      clients.delete(connection.socket);
      console.log('Client disconnected. Total:', clients.size);
    });
  
    // Optional: greet the new client
    connection.socket.send('Welcome! You are now connected.');
  };

  export default {
    getWebsocketHandler
};