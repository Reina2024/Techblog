const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    if (!commentData) {
      res.status(404).json({ message: 'No post!' });
      return;
    }
    const comments = commentData.map((comment) => comment.toJSON());
    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:post_id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.post_id,
      },
      include: [{model: User, attributes: {exclude: ['password']}}]
    });
            
    if (!commentData) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }

    const comments = commentData.map((comment) => comment.toJSON());
    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.uid,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (commentData === 0) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;