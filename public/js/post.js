// Add an event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select the DOM elements for add, edit, and delete actions
  const addComment = document.querySelector('#add-comment'); // Button to add a comment
  const editPost = document.querySelector('#edit-post'); // Button to edit a post
  const deletePost = document.querySelector('#delete-post'); // Button to delete a post

  // If the 'addComment' button exists on the page, add a click event listener
  if (addComment) {
    addComment.addEventListener('click', () => {
      // Redirect the user to the comment page for the specific post
      window.location.replace(`/comment/${addComment.dataset.pid}`);   
    });
  }

  // If the 'editPost' button exists on the page, add a click event listener
  if (editPost) {
    editPost.addEventListener('click', () => {
      // Redirect the user to the edit page for the specific post
      window.location.replace(`/post/edit/${editPost.dataset.pid}`);   
    });
  }

  // If the 'deletePost' button exists on the page, add a click event listener
  if (deletePost) {
    deletePost.addEventListener('click', async () => {
      // Get the post ID from the button's data attributes
      const postId = deletePost.dataset.pid;

      // Confirm with the user before proceeding with the delete operation
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          // Send a DELETE request to the server to delete the post
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });

          // Check if the response indicates success
          if (response.ok) {
            alert('Post deleted successfully');
            // Redirect the user to the home page or another page
            window.location.replace('/'); 
          } else {
            // Parse and display error message if the delete operation failed
            const result = await response.json();
            alert(`Failed to delete post: ${result.message}`);
          }
        } catch (error) {
          // Log any errors that occur during the delete operation
          console.error('Error deleting post:', error);
        }
      }
    });
  }
});
