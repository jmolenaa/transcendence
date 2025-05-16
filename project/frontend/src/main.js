

import { openPracticeTab } from './practice.js';
// import { openChatTab } from './chat.js';
// import { openTournamentTab } from './tournament.js';
// import { setupAuth } from './auth.js';
import { openProfileTab } from './profile.js'; //change
// import { openRemoteTab } from './remote.js';
// import {openSnakeTab} from './snake.js';

//managers
import AuthManager from './managers/authManager.js';


let snakeOn = false
let currentTab = null;
// /**
//  * Sets up tab functionality for the webpage.
//  * When a tab button is clicked, it hides all tab contents and shows the corresponding content.
//  * @returns {void}
//  */


function hideTabsIfNeeded(buttons, hiddenTabs) {
	buttons.forEach(button => {
		const tabName = button.dataset.tab;
		if (hiddenTabs.includes(tabName)){
			button.style.display = 'none';
		}
	});
}

function openallTabs(buttons){
	buttons.forEach(button => {
		button.style.display = 'block';
	});
}

export function setupTabs() {
	const tabButtons = document.querySelectorAll('.tablinks'); //array
	const tabContents = document.querySelectorAll('.tabcontent'); //array
	const hiddenTabs = ["Visibility"];
	if (!AuthManager.isLoggedIn()){
		hideTabsIfNeeded(tabButtons, hiddenTabs);
	}
	else {
		openallTabs(tabButtons);
	}	
	tabButtons.forEach(button => {
		button.addEventListener('click', (event) => { //run it after click
			const tabName = button.dataset.tab;
			//Hide all tab contents
			tabContents.forEach(tab => {
				tab.style.display = 'none';
			});
			//Remove "active" class from all tab buttons
			tabButtons.forEach(btn => {
				btn.classList.remove('active');
			});
			const activeTab = document.getElementById(tabName);
			if (activeTab) {
				activeTab.style.display = 'block';
			}
			//Add "active" class to the clicked button
			button.classList.add('active');
			currentTab = tabName;
			if (tabName === 'Profile') {
				openProfileTab()
			}
			if (tabName === 'Practice') {
			    openPracticeTab();
			}
			// if (tabName === 'Profile') {
			// openProfileTab();
			// }
			// if (tabName === 'Chat') {
			//     openChatTab();
			// }
			// if (tabName === 'Tournament') {
			//     openTournamentTab();
			// }
			// if (tabName === 'Remote') {
			//     openRemoteTab();
			// }
			// if (tabName === 'Snake') {
			//     openSnakeTab();
			// }
		});
	});
}

const verifyLogin = async () => {
	try {
		const response = await fetch('/api/auth/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include' // Include cookies in the request
		});
		if (response.ok) {
			const data = await response.json();
			AuthManager.login(data.username);
			console.log('User is logged in:', AuthManager.getUsername());
		}
	} catch (err) {
		AuthManager.logout();
		console.log('User is not logged in');
	}
};

async function loadTabHtml(tabName, fileName) {
	const response = await fetch(fileName);
	if (!response.ok) {
		console.error(`Failed to load ${tabName}`);
		return;
	}
	const html = await response.text();
	const container = document.getElementById(tabName);
	if (!container) {
		console.error(`Container with id "${tabName}" not found.`);
		return;
	}
	container.innerHTML = html;
}

async function loadAllHTMLpages() {
	await loadTabHtml('Profile', 'profile_login.html');
	await loadTabHtml('Remote', 'remote.html');
	await loadTabHtml('Snake', 'snake.html');
}



window.onload = async function () {
	console.log('Page loaded');
	await loadAllHTMLpages();
	await verifyLogin();
	setupTabs();
	// hideTabsIfNeeded();
	document.querySelector('.tablinks[data-tab="Profile"]').click(); //simulates click on profile
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