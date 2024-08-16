// Import necessary modules and models
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// GET all comments
router.get('/', async (req, res) => {
  try {
    // Fetch all comments from the database
    const commentData = await Comment.findAll();
    
    // Check if any comments were found
    if (!commentData) {
      // Send a 404 response if no comments are found
      res.status(404).json({ message: 'No comments found!' });
      return;
    }
    
    // Convert comments to JSON format
    const comments = commentData.map((comment) => comment.toJSON());
    console.log(comments);
    
    // Send a 200 response with the comments data
    res.status(200).json(comments);
  } catch (err) {
    // Send a 500 response in case of an error
    res.status(500).json(err);
  }
});

// GET comments for a specific post
router.get('/:post_id', async (req, res) => {
  try {
    // Fetch comments for the specified post ID
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.post_id,
      },
      include: [{ model: User, attributes: { exclude: ['password'] } }]
    });
    
    // Check if any comments were found
    if (!commentData) {
      // Send a 404 response if no comments are found for the post
      res.status(404).json({ message: 'No comments for this post!' });
      return;
    }

    // Convert comments to JSON format
    const comments = commentData.map((comment) => comment.toJSON());
    console.log(comments);
    
    // Send a 200 response with the comments data
    res.status(200).json(comments);
  } catch (err) {
    // Send a 500 response in case of an error
    res.status(500).json(err);
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  try {
    // Create a new comment with the provided data
    const commentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.uid,
    });
    
    // Send a 200 response with the created comment data
    res.status(200).json(commentData);
  } catch (err) {
    // Send a 400 response in case of a bad request
    res.status(400).json(err);
  }
});

// DELETE a comment by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete the comment with the specified ID
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if the comment was deleted
    if (commentData === 0) {
      // Send a 404 response if no comment was found with the specified ID
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    // Send a 200 response with the deletion confirmation
    res.status(200).json(commentData);
  } catch (err) {
    // Send a 500 response in case of an error
    res.status(500).json(err);
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
