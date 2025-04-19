
export function openTestTab() {
    const signup = document.getElementById("signupTest");
    const login = document.getElementById("loginTest");
    const flipCard = document.getElementById("flipCard");

    const showLoginBtn = document.getElementById("showLoginBtn");
    const showSignupBtn = document.getElementById("showSignupBtn");
    const flipToProfileBtnLog = document.getElementById("flipToProfileBtnLog");
    const flipToProfileBtnSign = document.getElementById("flipToProfileBtnSign");
    const flipToLoginBtn = document.getElementById("flipToLoginBtn");

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
        flipToProfileBtnLog.addEventListener('click', (event) => {
            event.preventDefault();
            flipCard.classList.add("flipped");
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
