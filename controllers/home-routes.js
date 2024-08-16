// Import necessary modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models'); // Import models for Post, User, and Comment
const auth = require('../utils/authGuard'); // Import authentication middleware

// GET request handler for the homepage, which displays all posts
router.get('/', async (req, res) => {
    try {
        // Fetch all posts along with the associated user information
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'], // Include only the username attribute from User model
                },
            ],
        });

        // Convert the post data to plain JSON format
        const posts = postData.map((post) => post.toJSON());
        console.log(posts); // Log the posts for debugging
        // Render the 'homepage' view with posts and login status
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err); // Log errors for debugging
        res.status(500).json(err); // Send a 500 error response if something goes wrong
    }
});

// GET request handler for a single post by its ID
router.get('/Post/:id', async (req, res) => {
    try {
        // Fetch a specific post by its ID along with its comments
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'text',
                        'user_id',
                        'created_at',
                    ],
                },
            ],
        });

        // Convert the post data to plain JSON format
        const post = postData.get({ plain: true });
        // Render the 'post' view with the single post and login status
        res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err); // Log errors for debugging
        res.status(500).json(err); // Send a 500 error response if something goes wrong
    }
});

// GET request handler for the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        // Redirect to homepage if the user is already logged in
        res.redirect('/');
        return;
    }
    // Render the 'login' view if the user is not logged in
    res.render('login');
});

// GET request handler for logging out and redirecting to the homepage
router.get("/js/logout.js", (req, res) => {
    req.session.destroy(); // Destroy the session to log out the user
    res.redirect("/"); // Redirect to the homepage
});

// Export the router to be used in other parts of the application
module.exports = router;
