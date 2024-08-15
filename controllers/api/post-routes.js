const router = require('express').Router();
const { Post, Comment, User } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    if (!postData) {
      res.status(404).json({ message: 'No post!' });
      return;
    }
    const posts = postData.map((post) => post.toJSON());
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{model: User, attributes: {exclude: ['password']}}, {model: Comment, include:[{model: User, attributes:{exclude: ['password']} } ]}]  
    });
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    const post = postData.toJSON();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.uid,
    });
    console.log(postData.toJSON());
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  console.log(req.body);
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      console.log(updatedPost);
      if (updatedPost[0] === 0) {
        res.status(404).json({ message: 'No post found with that id!' });
        return;
      }
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;