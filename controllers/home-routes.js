const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const auth = require('../utils/auth');

// GET homepage posts
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const posts = postData.map((post) => post.toJSON());
      console.log(posts);
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // GET one Post
router.get('/Post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: [
              'id',
              'title',
              'text',
              'user_id',
              'created_at',
            ],
          },
        ],
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
  
      const post = postData.get({ plain: true });                                     
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Login route
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
    
  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

  module.exports = router;

