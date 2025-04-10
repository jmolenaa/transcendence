let player1Name = "";
let player2Name = "";


function createPlayers(player1, player2){
    player1Name = player1 || "Player 1"; // Default to "Player 1" if no name is provided
    player2Name = player2 || "Player 2"; 
    console.log('Inserting players:', player1Name, player2Name);
    fetch('/api/players', { // Correct route for adding players
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ player1: player1Name, player2: player2Name })  
    })
    .then(response => response.json())
    .then(data => {
        console.log('Players saved:', data);
    })
    .catch(error => console.error('Error:', error));
}
