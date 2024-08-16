// Select the HTML element with the ID 'add-post' (button or link to trigger adding a new post)
const addPost = document.querySelector('#add-post');

// Add a click event listener to the 'add-post' element
addPost.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default action of the click event (e.g., form submission or page refresh)

  // Retrieve the values from the input fields for post content and title
  const newContent = document.querySelector('#post-content').value; // Get the content of the new post
  const newTitle = document.querySelector('#post-title').value; // Get the title of the new post

  // Send a POST request to the server to create a new post
  fetch(`/api/posts/`, {
    method: 'POST', // Specify the HTTP method as POST for creating a new resource
    body: JSON.stringify({ 
      title: newTitle, // Title of the new post
      content: newContent, // Content of the new post
      user_id: addPost.dataset.uid // User ID from the data attribute of the 'add-post' element
    }),
    headers: { 'Content-Type': 'application/json' } // Set the content type to JSON
  })
  .then(response => {
    // Check if the server responded with a success status
    if (response.ok) {
      response.json().then((json) => {
        // Redirect the user to the newly created post page, using the ID returned from the server
        document.location.replace(`/post/${json.id}`);
      });
    } else {
      // Alert the user if the post creation failed
      alert('Post not added. Try Again');
    }
  })
  .catch(err => {
    // Log any errors that occur during the fetch operation
    console.error('Error creating post:', err);
  });
});
