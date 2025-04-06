let player1Name = "Player 1";
let player2Name = "Player 2";

// Corrected event listener for setting player1 name
document.getElementById('addPlayer1').addEventListener('click', () => {
    const inputName = document.getElementById('player1').value.trim(); // Fixed typo
    if (inputName) {
        player1Name = inputName;
        console.log("Player 1 set as:", player1Name);
    }    
});

// Corrected event listener for setting player2 name
document.getElementById('addPlayer2').addEventListener('click', () => {
    const inputName = document.getElementById('player2').value.trim(); // Fixed typo
    if (inputName) {
        player2Name = inputName; // Fixed player2Name update
        console.log("Player 2 set as:", player2Name);
    }    
});

// Start game after both players are set
document.getElementById('startGame').addEventListener('click', async() => {
    const player1 = document.getElementById('player1').value.trim() || player1Name; // Default if not entered
    const player2 = document.getElementById('player2').value.trim() || player2Name; // Default if not entered

    // Send API request to save players and start the game
    await fetch('/api/players', { // Correct route for adding players
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player1, player2 })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Players saved:', data);
        startPongGame(player1, player2); // Start game after API response
    })
    .catch(error => console.error('Error:', error));
});