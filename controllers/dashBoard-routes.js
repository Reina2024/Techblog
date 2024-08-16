const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/authGuard');

router.get('/', auth, async (req, res) => {
  try {
        const postData = await Post.findAll({
      where: {
        user_id: req.session.uid,
      },
      include: [{ model: User, attributes: ['username']}]
    });

    const posts = postData.map((post) => post.toJSON());
    console.log(posts);
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      uid: req.session.uid
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;