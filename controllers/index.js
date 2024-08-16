// Import the Express Router
const router = require('express').Router();

// Import route modules
const apiRoutes = require('./api/index.js'); // API routes
const homeRoutes = require('./home-routes.js'); // Home page routes
const dashboardRoutes = require('./dashBoard-routes.js'); // Dashboard routes
const postRoutes = require('./post-routes.js'); // Post-related routes
const commentRoutes = require('./comment-routes.js'); // Comment-related routes

const userRoutes = require('./api/user-routes');
app.use('/api/users', userRoutes);


// Define route paths and associate them with their respective route modules
router.use('/comment', commentRoutes); 
// All routes starting with '/comment' will use the routes defined in commentRoutes

router.use('/post', postRoutes); 
// All routes starting with '/post' will use the routes defined in postRoutes

router.use('/dashboard', dashboardRoutes); 
// All routes starting with '/dashboard' will use the routes defined in dashboardRoutes

router.use('/', homeRoutes); 
// The root path ('/') will use the routes defined in homeRoutes

router.use('/api', apiRoutes); 
// All routes starting with '/api' will use the routes defined in apiRoutes

// Export the router to be used in other parts of the application
module.exports = router;
