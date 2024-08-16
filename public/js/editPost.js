const editPost = document.querySelector('#edit-post');

editPost.addEventListener('click', () => {
    const newContent = document.querySelector('#post-content').value;
    const newtitle = document.querySelector('#post-title').value;
    fetch(`/api/posts/${editPost.dataset.pid}`, {
        method: 'PUT',
        body: JSON.stringify({ title: newtitle, content: newContent }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (response.ok) {
            document.location.replace(`/post/${editPost.dataset.pid}`);
        } else {
            alert('Comment Not Added. Try Again');
        }
    })
    .catch(err => {
        console.error(err);
    });
});