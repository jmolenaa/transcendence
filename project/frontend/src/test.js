
let email = {};
let password = {};
let username = {};

export async function openTestTab() {
	const signup = document.getElementById("signupTest");
    const login = document.getElementById("loginTest");
    const flipCard = document.getElementById("flipCard");
	
    const showLoginBtn = document.getElementById("showLoginBtn");
    const showSignupBtn = document.getElementById("showSignupBtn");
    const flipToProfileBtnLog = document.getElementById("flipToProfileBtnLog");
    const flipToProfileBtnSign = document.getElementById("flipToProfileBtnSign");
    const flipToLoginBtn = document.getElementById("flipToLoginBtn");
	
	const loginWarning = document.getElementById("loginWarning");
	// const emailInput = document.getElementById("emailInput");
	// const passwordInput = document.getElementById("passwordInput");
	// const usernameInput = document.getElementById("usernameInput");
	
	const isLoggedIn = localStorage.getItem('isLoggedIn'); //check!!!!!!!!!!!
	if (isLoggedIn === 'true') {
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
        flipToProfileBtnSign.addEventListener('click', (event) => {
            event.preventDefault();
            flipCard.classList.add("flipped");
        });
    }
    if (flipCard) {
        flipCard.style.display = "block";
    }
    if (flipToLoginBtn) {
        flipToLoginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            flipCard.classList.remove("flipped");
        });
    }
    console.log('TestGame tab opened');
}
