const addComment = document.querySelector('#add-comment');
const editPost = document.querySelector('#edit-post');

addComment.addEventListener('click', () => {
    window.location.replace(`/comment/${addComment.dataset.pid}`);   
});

if (editPost) {
  editPost.addEventListener('click', () => {
      window.location.replace(`/post/edit/${editPost.dataset.pid}`);   
  });
}
