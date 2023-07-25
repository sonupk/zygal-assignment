# zygal-assignment

The backend uses Express to create an HTTP server. It reads the user data from the index.js file and exposes a POST endpoint /login for user login.
The frontend contains a simple login form that collects the user's email and password. When the login button is clicked, it sends a POST request to the backend with the user's credentials.
The backend checks if the provided credentials match any of the users in the index.js file and responds with a success flag accordingly.
If the login is successful, the frontend redirects the user to page2.html, and if it fails, it redirects to index.html file.
