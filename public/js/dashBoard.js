// Select the HTML element with the ID 'add-post' (button or link to trigger adding a new post)
const addPost = document.querySelector('#add-post');

// Add a click event listener to the 'add-post' element
addPost.addEventListener('click', () => {
  // Redirect the user to the page where they can add a new post
  window.location.replace(`/Post`);
});
