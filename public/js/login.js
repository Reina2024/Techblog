// Asynchronous function to handle login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get and trim the values of the username and password fields
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both username and password fields are filled
  if (username && password) {
    try {
      // Send a POST request to the server to log in the user
      const response = await fetch('/api/users/login', {
        method: 'POST', // Use the POST method for login request
        body: JSON.stringify({ username, password }), // Send username and password as JSON
        headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
      });

      // Check if the login request was successful
      if (response.ok) {
        // Redirect the user to the home page upon successful login
        document.location.replace('/');
      } else {
        // Alert the user if the login request failed
        alert('Failed to log in.');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error logging in:', error);
      alert('An error occurred while trying to log in.');
    }
  }
};

// Asynchronous function to handle signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get and trim the values of the username and password fields
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if both username and password fields are filled
  if (username && password) {
    try {
      // Send a POST request to the server to sign up the user
      const response = await fetch('/api/users', {
        method: 'POST', // Use the POST method for signup request
        body: JSON.stringify({ username, password }), // Send username and password as JSON
        headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
      });

      // Check if the signup request was successful
      if (response.ok) {
        // Redirect the user to the home page upon successful signup
        document.location.replace('/');
      } else {
        // Alert the user if the signup request failed
        alert('Failed to sign up.');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error signing up:', error);
      alert('An error occurred while trying to sign up.');
    }
  }
};

// Add a submit event listener to the login form
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Add a submit event listener to the signup form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
