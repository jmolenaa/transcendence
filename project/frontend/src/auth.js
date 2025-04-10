// function initializeAuthForms() {
//     console.log("Im in AUTH");
//     // Login form event listener
//     document.getElementById('loginForm').addEventListener('submit', async function(event) {
//       event.preventDefault(); // Prevent the form from submitting normally
//       var email = document.getElementById('email').value;
//       var password = document.getElementById('password').value;
//       const loginError = document.getElementById('loginError');
//       loginError.style.display = "none";
      
//       try {
//         const response = await fetch('/api/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email, password })
//         });
  
//         if (!response.ok) {
//           loginError.style.display = "block";
//           return;
//         }
  
//         // Parse JSON response
//         const data = await response.json();
//         const token = data.token; // This is your JWT token
  
//         // Store JWT in localStorage (or an HTTP-only cookie for better security)
//         localStorage.setItem('jwtToken', token);
  
//         // Redirect or update UI after successful login
//         // window.location.href = '/dashboard';  // Uncomment to redirect to a dashboard
//       } catch (err) {
//         console.error('Login failed:', err);
//         loginError.style.display = 'block';
//       }
//     });
  
//     // Register form event listener
//     document.getElementById('registerForm').addEventListener('submit', async function(event) {
//       event.preventDefault(); // Prevent the form from submitting normally
//       var email = document.getElementById('emailR').value;
//       var password = document.getElementById('passwordR').value;
//       var username = document.getElementById('username').value;
//       const registerError = document.getElementById('registerError');
//       registerError.style.display = "none";
  
//       try {
//         const response = await fetch('/api/auth/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email, password, username })
//         });
  
//         if (!response.ok) {
//           registerError.style.display = "block";
//           return;
//         }
  
//         // Parse JSON response
//         const data = await response.json();
//         const token = data.token; // This is your JWT token
  
//         // Store JWT in localStorage (or an HTTP-only cookie for better security)
//         localStorage.setItem('jwtToken', token);
  
//         // Redirect or update UI after successful registration
//         // window.location.href = '/dashboard';  // Uncomment to redirect to a dashboard
//       } catch (err) {
//         console.error('registerForm failed:', err);
//         registerError.style.display = 'block';
//       }
//     });
//   }
  