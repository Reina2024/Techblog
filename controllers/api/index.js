// Import the necessary modules
const router = require('express').Router();

// Import route handlers for users, posts, and comments
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Use the userRoutes for any requests starting with '/users'
router.use('/users', userRoutes);

// Use the postRoutes for any requests starting with '/posts'
router.use('/posts', postRoutes);

// Use the commentRoutes for any requests starting with '/comments'
router.use('/comments', commentRoutes);

// Export the router so it can be used in other parts of the application
module.exports = router;
