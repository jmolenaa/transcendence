// import { openProfileTab } from './original/profile.js';
// import { openGameTab } from './original/game.js';
// import { openChatTab } from './original/chat.js';
// import { openTournamentTab } from './original/tournament.js';
// import { setupAuth } from './original/auth.js';
// import { openTestTab } from './original/test.js';
// import { openRemoteTab } from './original/remote.js';
// import {openSnakeTab} from './original/snake.js';

//managers
import  AuthManager  from './managers/authManager.js';

let user = null

let snakeOn = false
let currentTab = null;
// /**
//  * Sets up tab functionality for the webpage.
//  * When a tab button is clicked, it hides all tab contents and shows the corresponding content.
//  * @returns {void}
//  */

// function setupTabs() {
//     const tabButtons = document.querySelectorAll('.tablinks'); //array
//     const tabContents = document.querySelectorAll('.tabcontent'); //array
//     tabButtons.forEach(button => {
//         button.addEventListener('click', (event) => { //run it after click
//             const tabName = button.dataset.tab;
//             // if (currentTab === 'Snake' && tabName !== 'Snake') {
//             //     pauseSnakeGame();
//             // }
//             //Hide all tab contents
//             tabContents.forEach(tab => {
//                 tab.style.display = 'none';
//             });
//             //Remove "active" class from all tab buttons
//             tabButtons.forEach(btn => {
//                 btn.classList.remove('active');
//             });
//             const activeTab = document.getElementById(tabName);
//             if (activeTab) {
//                 activeTab.style.display = 'block';
//             }
//             //Add "active" class to the clicked button
//             button.classList.add('active');
//             currentTab = tabName;
//             if (tabName === 'Profile') {
//                 openProfileTab();
//             }
//             if (tabName === 'Game') {
//                 openGameTab();
//             }
//             if (tabName === 'Chat') {
//                 openChatTab();
//             }
//             if (tabName === 'Tournament') {
//                 openTournamentTab();
//             }
//             if (tabName === 'TestGame') {
//                 openTestTab()
//             }
//             if (tabName === 'Remote') {
//                 openRemoteTab();
//             }
//             if (tabName === 'Snake') {
//                 openSnakeTab();
//             }
//         });
//     });
// }

// const verifyLogin = async () => {
// 	const response = await fetch('/api/auth/me', {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		credentials: 'include' // Include cookies in the request
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
//         AuthManager.login(data.username);
// 		console.log('User is logged in:', user);
// 	}
// 	else {
// 		AuthManager.logout();
// 		console.log('User is not logged in');
// 	}
// };

async function loadTabHtml(tabName, fileName) {
    const response = await fetch(fileName);
    if (!response.ok) {
        console.error(`Failed to load ${tabName}`);
        return;
    }
    const html = await response.text();
    document.getElementById(tabName).innerHTML = html;
}

async function loadAllTabs() {
    // await loadTabHtml ("Profile", "./original/profile.js");
    // await loadTabHtml ("Practice", "./original/practice.js");
    // await loadTabHtml ("Pong", "./original/pong.js");
    // await loadTabHtml ("Chat", "./original/chat.js");
    await loadTabHtml ("Tournament", "./original/tournament.js");
}

// function hideTabsIfNeeded() {
//     if (!AuthManager.isLoggedIn) {
//         const blockedTabs = ["Tournament", "Chat"];
//         blockedTabs.forEach(tabName => {
//             const button = document.querySelector(`.tablinks[data-tab="$(tabName)"]`);
//             if (button) {
//                 button.style.display = 'none';
//             }
//         })
//     }
// }

window.onload = async function () {
    console.log('Page loaded');
    await loadAllTabs();
    // await verifyLogin();
    // setupTabs();
    // hideTabsIfNeeded();
    // selectDefaultTab();

    //Adding test.html
    // const response = await fetch('test.html');
    // const html = await response.text();
    // document.getElementById('TestGame').innerHTML = html;
    // //Adding game.html
    // const responseRemote = await fetch('remote.html');   
    // const htmlRemote = await responseRemote.text();
    // document.getElementById('Remote').innerHTML = htmlRemote;
    // //Adding snake.html
    // const responseSnake = await fetch('snake.html');   
    // const htmlSnake = await responseSnake.text();
    // document.getElementById('Snake').innerHTML = htmlSnake;
	// verifyLogin();
    // setupTabs();
};



// This function creates tabbed navigation on a webpage. When you click a tab button (like “Game” or “Profile”), it:
// Hides all other tab contents.
// Highlights the clicked tab button.
// Displays only the corresponding tab content.
/*
- `document.querySelectorAll()` finds **all HTML elements** that match the selector (like `.tablinks` or `.tabcontent`) and returns a **NodeList** (like an array).
- So now you have:
  - `tabButtons`: all the `<button>` elements used to switch tabs.
  - `tabContents`: all the `<div>` sections that hold tab content (hidden/shown dynamically).
  */





/*
What is dataset?
dataset is a special property in JavaScript that lets you access custom attributes in your HTML that start with data-.

🔸 Example:

<button data-tab="Profile">Profile</button>
This button has a custom attribute: data-tab="Profile"


const button = document.querySelector('button');
console.log(button.dataset.tab); // Output: "Profile"
button.dataset.tab gets the value of data-tab

You can treat dataset like an object with keys based on your data-* attributes
*/



/*
.className[attribute="value"]	Find element with that class and attribute
Template string `${var}`	Insert dynamic value
querySelector(...)	Returns the first matching element
querySelectorAll(...)	Returns all matching elements (NodeList)
*/