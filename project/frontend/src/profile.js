import AuthManager from "./managers/authManager.js";

let email = {};
let password = {};
let username = {};

export async function openProfileTab() {
	const signup = document.getElementById("signupTest");
    const login = document.getElementById("loginTest");
    const flipCard = document.getElementById("flipCard");
	
    const showLoginBtn = document.getElementById("showLoginBtn");
    const showSignupBtn = document.getElementById("showSignupBtn");
    const flipToProfileBtnLog = document.getElementById("flipToProfileBtnLog");
    const flipToProfileBtnSign = document.getElementById("flipToProfileBtnSign");
    const logoutBtn = document.getElementById("logoutBtn");
	
	const loginWarning = document.getElementById("loginWarning"); //?????
	const emailInput = document.getElementById("emailInput");
	const passwordInput = document.getElementById("passwordInput");

	const emailInputSign = document.getElementById("emailInputSign");
	const passwordInputSign = document.getElementById("passwordInputSign");
	const usernameInputSign = document.getElementById("usernameInputSign");	


    if (AuthManager.isLoggedIn()) {
        console.log('User is logged in profile.js');
		flipCard.classList.add("flipped");
		flipCard.style.display = "block";
	}
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            login.style.display = "flex";
            signup.style.display = "none";
        });
    }

    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', () => {
            login.style.display = "none";
            signup.style.display = "flex";
        });
    }

    if (flipToProfileBtnLog) {
        flipToProfileBtnLog.addEventListener('click', async(event) => {
            event.preventDefault();
			email = emailInput.value;
			password = passwordInput.value;
			try {
				const response = await fetch('/api/auth/login', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify({ email, password }),
				  credentials: 'include' // Include cookies in the request
				});
				if (!response.ok) {
					loginWarning.style.display = "block";
					setTimeout(() => {loginWarning.style.display = "none"}, 3000);
					console.log('Login failed:', response.statusText);
				  return;
				}
				flipCard.classList.add("flipped");
			} catch (error) {
				console.error('Error:', error);
			}
        });
    }
    if (flipToProfileBtnSign) {
        flipToProfileBtnSign.addEventListener('click', async(event) => {
            event.preventDefault();
			email = emailInputSign.value;
			password = passwordInputSign.value;
            username = usernameInputSign.value;
			try {
				const response = await fetch('/api/auth/register', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify({ email, password, username }),
				  credentials: 'include' // Include cookies in the request
				});
				if (!response.ok) {
					loginWarning.style.display = "block";
					setTimeout(() => {loginWarning.style.display = "none"}, 3000);
					// console.log('Sign up failed:', response.statusText);
				  return;
				}
				flipCard.classList.add("flipped");
			} catch (error) {
				console.error('Error:', error);
			}
        });
    }
    if (flipCard) {
        flipCard.style.display = "block";
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // Include cookies in the request
            })
            .then(response => {
                if (response.ok) {
                    AuthManager.logout();
                    console.log('User logged out');
                    flipCard.classList.remove("flipped");
                } else {
                    console.error('Logout failed:', response.statusText);
                }
            })
        });
    }

}
