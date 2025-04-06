let player1Name = "Player 1";
let player2Name = "Player 2";

document.getElementById('addPlayer1').addEventListener('click',() => {
    const inputName = getElementById('player1').value.trim();
    if (inputName) {
        player1Name = inputName;
        console.log("Player 1 set as:", player1Name);
    }    
});

document.getElementById('addPlayer2').addEventListener('click',() => {
    const inputName = getElementById('player2').value.trim();
    if (inputName) {
        player1Name = inputName;
        console.log("Player 2 set as:", player2Name);
    }    
});

document.getElementById('startGame').addEventListener('click', async() => {
    const player1 = document.getElementById('player1').value.trim() || "Player 1";
    const player2 = document.getElementById('player2').value.trim() || "Player 2";
    await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player1, player2 })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Players saved:', data);
        startPongGame(player1, player2);
    })
    .catch(error => console.error('Error:', error));
});