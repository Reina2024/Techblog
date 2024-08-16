// const addComment = document.querySelector('#add-comment');
// const editPost = document.querySelector('#edit-post');

// addComment.addEventListener('click', () => {
//     window.location.replace(`/comment/${addComment.dataset.pid}`);   
// });

// if (editPost) {
//   editPost.addEventListener('click', () => {
//       window.location.replace(`/post/edit/${editPost.dataset.pid}`);   
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
  const addComment = document.querySelector('#add-comment');
  const editPost = document.querySelector('#edit-post');
  const deletePost = document.querySelector('#delete-post');

  if (addComment) {
    addComment.addEventListener('click', () => {
      window.location.replace(`/comment/${addComment.dataset.pid}`);   
    });
  }

  if (editPost) {
    editPost.addEventListener('click', () => {
      window.location.replace(`/post/edit/${editPost.dataset.pid}`);   
    });
  }

  if (deletePost) {
    deletePost.addEventListener('click', async () => {
      const postId = deletePost.dataset.pid;

      if (confirm('Are you sure you want to delete this post?')) {
        try {
          const response = await fetch(`/posts/${postId}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            alert('Post deleted successfully');
            window.location.replace('/'); // Redirect to home or another page
          } else {
            const result = await response.json();
            alert(`Failed to delete post: ${result.message}`);
          }
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    });
  }
});
