// Select the HTML element with the ID 'edit-post' (button or link to trigger post editing)
const editPost = document.querySelector('#edit-post');

// Add a click event listener to the 'edit-post' element
editPost.addEventListener('click', () => {
  // Retrieve the new content and title from the input fields
  const newContent = document.querySelector('#post-content').value; // Content input field
  const newTitle = document.querySelector('#post-title').value; // Title input field

  // Send a PUT request to the server to update the post with the new content and title
  fetch(`/api/posts/${editPost.dataset.pid}`, { // Use the post ID from data attributes in the URL
    method: 'PUT', // Specify the PUT method to update the post
    body: JSON.stringify({ title: newTitle, content: newContent }), // Convert the new title and content to JSON
    headers: { 'Content-Type': 'application/json' }, // Indicate that the request body is in JSON format
  })
  .then(response => {
    // Check if the server responded with a success status
    if (response.ok) {
      // Redirect the user to the updated post page if the update was successful
      document.location.replace(`/post/${editPost.dataset.pid}`);
    } else {
      // Alert the user if the update request failed
      alert('Failed to update post. Try Again');
    }
  })
  .catch(err => {
    // Log any errors that occur during the fetch operation
    console.error('Error updating post:', err);
  });
});
