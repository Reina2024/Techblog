// Select the HTML element with the ID 'comment-submit' (button to submit a new comment)
const addComment = document.querySelector('#comment-submit');

// Add a click event listener to the 'comment-submit' element
addComment.addEventListener('click', () => {
  // Retrieve the value from the input field for the comment content
  const commentContent = document.querySelector('#comment-content').value;

  // Send a POST request to the server to create a new comment
  fetch('/api/comments', {
    method: 'POST', // Specify the HTTP method as POST for creating a new resource
    body: JSON.stringify({ 
      content: commentContent, // Content of the new comment
      post_id: addComment.dataset.pid // Post ID from the data attribute of the 'comment-submit' element
    }),
    headers: { 'Content-Type': 'application/json' } // Set the content type to JSON
  })
  .then(response => {
    // Check if the server responded with a success status
    if (response.ok) {
      // Redirect the user to the post page after successfully adding the comment
      document.location.replace(`/post/${addComment.dataset.pid}`);
    } else {
      // Alert the user if the comment was not added successfully
      alert('Comment Not Added. Please Try Again');
    }
  })
  .catch(err => {
    // Log any errors that occur during the fetch operation
    console.error('Error adding comment:', err);
  });
});
