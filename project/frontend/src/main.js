import { setupAuth } from './auth.js';
import { createPlayers } from './players.js';
import { startPongGame } from './pong.js';

function loadGameScript() {
    const player1 = document.getElementById('player1').value.trim() || 'Player 1';
    const player2 = document.getElementById('player2').value.trim() || 'Player 2';
    
    if (player1 === player2) {
        alert('Player names must be different!');
        return;
    }
    
    document.getElementById('player1').classList.add('hidden');
    document.getElementById('player2').classList.add('hidden');
    document.getElementById('startGame').classList.add('hidden');
    
    if (!document.querySelector('script[src="./players.js"]')) {
        const scriptPlayers = document.createElement('script');
        scriptPlayers.src = './players.js';
        scriptPlayers.onload = () => createPlayers(player1, player2);
        document.head.appendChild(scriptPlayers);
    }
    
    if (!document.querySelector('script[src="./pong.js"]')) {
        const scriptGame = document.createElement('script');
        scriptGame.src = './pong.js';
        scriptGame.onload = () => startPongGame(player1, player2);
        document.head.appendChild(scriptGame);
    }
}

function setupGameLoader() {
    const startBtn = document.getElementById('startGame');
    startBtn.addEventListener('click', loadGameScript);
}


function setupTabs() {
    const tabLinks = document.querySelectorAll('.tablinks');
    const tabContents = document.querySelectorAll('.tabcontent');

    tabLinks.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            tabContents.forEach(c => c.style.display = 'none');
            tabLinks.forEach(t => t.classList.remove('active'));

            const tabName = tab.getAttribute('data-tab');
            document.getElementById(tabName).style.display = 'block';
            tab.classList.add('active');

            if (tabName === 'Chat') window.loadChatScript?.();
            if (tabName === 'Login') window.setupAuthForms?.();
        });
    });

    tabLinks[0].click(); // Auto-click first tab
}





window.onload = function () {
    console.log('Page loaded');
    setupTabs();
    setupAuth();
    setupGameLoader();
    // setupChatLoader();
};