// Import necessary modules
const router = require('express').Router(); // Create a new Express router instance
const { User, Post, Comment } = require('../models'); // Import models for User, Post, and Comment
const auth = require('../utils/authGuard'); // Import authentication middleware

// GET request handler for the dashboard
router.get('/', auth, async (req, res) => {
  try {
    // Fetch all posts created by the logged-in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.uid, // Filter posts by the user ID from the session
      },
      include: [{ 
        model: User, 
        attributes: ['username'] // Include the username attribute from the User model
      }]
    });

    // Convert the fetched post data to plain JSON format
    const posts = postData.map((post) => post.toJSON());
    console.log(posts); // Log the posts for debugging

    // Render the 'dashboard' view with posts and session data
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn, // Indicate whether the user is logged in
      uid: req.session.uid // Pass the user ID from the session to the view
    });
  } catch (err) {
    console.log(err); // Log errors for debugging
    res.status(500).json(err); // Send a 500 error response if something goes wrong
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
