// const router = require('express').Router();

// const userRoutes = require('./user-routes');
// const postRoutes = require('./post-routes');
// const commentRoutes = require('./comment-routes');

// router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);

// module.exports = router;

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/comment', commentRoutes);
router.use('/post', postRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes); // Ensure this is placed last to catch all other routes
router.use('/api', apiRoutes);

module.exports = router;
