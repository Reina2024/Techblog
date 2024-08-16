const addComment = document.querySelector('#comment-submit');

addComment.addEventListener('click', () => {
    const commentContent = document.querySelector('#comment-content').value;
    fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content: commentContent, post_id: addComment.dataset.pid }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (response.ok) {
            document.location.replace(`/post/${addCommentComment.dataset.pid}`);
        } else {
            alert('Comment Not Added. Please Try Again');
        }
    })
    .catch(err => {
        console.error(err);
    });
});