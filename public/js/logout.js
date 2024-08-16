// Asynchronous function to handle user logout
const logout = async () => {
  try {
    // Send a POST request to the server to log out the user
    const response = await fetch('/api/users/logout', {
      method: 'POST', // Use the POST method for the logout request
      headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
    });

    // Check if the response indicates a successful logout
    if (response.ok) {
      // Redirect the user to the home page after successful logout
      document.location.replace('/');
    } else {
      // Alert the user if the logout request failed
      alert('Failed to log out.');
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error('Error logging out:', error);
    alert('An error occurred while trying to log out.');
  }
};

// Add a click event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);
