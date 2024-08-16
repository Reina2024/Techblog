// Import the Express Router and the models (Post, User, Comment)
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Route to render the 'addPost' page
router.get('/', async (req, res) => {
  try {
    // Render the 'addPost' view and pass the user ID from the session
    res.render('addPost', {
      uid: req.session.uid,
    });
  } catch (err) {
    // If an error occurs, send a 500 status with the error message
    res.status(500).json(err);
  }
});

// Route to render a specific post page based on post ID
router.get('/:id', async (req, res) => {
  try {
    // Find the post by primary key (ID) and include associated User and Comment models
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ['password'] } }, // Include User model without password attribute
        { model: Comment, include: [{ model: User, attributes: { exclude: ['password'] } }] } // Include Comment model with associated User, excluding password
      ]
    });

    // If no post is found, send a 404 status with an error message
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    // Convert the post data to JSON format
    const post = postData.toJSON();
    console.log(post); // Log the post data for debugging purposes

    // Determine if the current user is the author of the post
    const author = (post.user_id == req.session.uid) ? true : false;

    // Render the 'post' view with the post data, login status, and author status
    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
      author: author
    });
  } catch (err) {
    // If an error occurs, send a 500 status with the error message
    res.status(500).json(err);
  }
});

// Route to render the 'post' page for editing a specific post based on post ID
router.get('/edit/:id', async (req, res) => {
  try {
    // Find the post by primary key (ID)
    const postData = await Post.findByPk(req.params.id);

    // If no post is found, send a 404 status with an error message
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    // Convert the post data to JSON format
    const post = postData.toJSON();
    console.log(post); // Log the post data for debugging purposes

    // Check if the current user is the author of the post
    if (post.user_id != req.session.uid) {
      // If the user is not the author, send a 404 status
      res.status(404).json();
      return;
    }

    // Render the 'post' view with the post data, login status, and edit mode enabled
    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
      edit: true
    });
  } catch (err) {
    // If an error occurs, send a 500 status with the error message
    res.status(500).json(err);
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
