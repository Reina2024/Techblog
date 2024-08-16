const addPost = document.querySelector('#add-post');

addPost.addEventListener('click', (event) => {
  event.preventDefault();
    const newContent = document.querySelector('#post-content').value;
    const newtitle = document.querySelector('#post-title').value;
    fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({ title: newtitle, content: newContent, user_id: addPost.dataset.uid }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      console.log();
        if (response.ok) {
            response.json().then((json) => {
              document.location.replace(`/post/${json.id}`);
            });
        } else {
            alert('Post not added. Try Again');
        }
    })
    .catch(err => {
        console.error(err);
    });
});