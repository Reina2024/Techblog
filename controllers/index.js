const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashBoard-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/comment', commentRoutes); 
router.use('/post', postRoutes); 
router.use('/dashboard', dashboardRoutes); 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
