// Import necessary modules and models
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// GET route to fetch all posts
router.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database
    const postData = await Post.findAll();

    // If no posts are found, respond with a 404 status code
    if (!postData) {
      res.status(404).json({ message: 'No post!' });
      return;
    }

    // Convert post data to JSON format
    const posts = postData.map((post) => post.toJSON());

    // Log the posts and respond with a 200 status code and the post data
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    // Handle errors by responding with a 500 status code
    res.status(500).json(err);
  }
});

// GET route to fetch a single post by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a post by its primary key (ID) and include associated user and comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Comment, include: [{ model: User, attributes: { exclude: ['password'] } }] }
      ]
    });

    // If the post is not found, respond with a 404 status code
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    // Convert post data to JSON format and respond with a 200 status code and the post data
    const post = postData.toJSON();
    res.status(200).json(post);
  } catch (err) {
    // Handle errors by responding with a 500 status code
    res.status(500).json(err);
  }
});

// POST route to create a new post
router.post('/', async (req, res) => {
  try {
    // Create a new post with the provided title, content, and user ID from the session
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.uid,
    });

    // Log the created post and respond with a 200 status code and the post data
    console.log(postData.toJSON());
    res.status(200).json(postData);
  } catch (err) {
    // Handle errors by responding with a 400 status code
    res.status(400).json(err);
  }
});

// PUT route to update a post by ID
router.put('/:id', (req, res) => {
  console.log(req.body);

  // Update the post with the provided title and content
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

      // If no post was updated, respond with a 404 status code
      if (updatedPost[0] === 0) {
        res.status(404).json({ message: 'No post found with that id!' });
        return;
      }

      // Respond with the updated post data
      res.json(updatedPost);
    })
    .catch((err) => {
      // Handle errors by responding with a 500 status code
      console.log(err);
      res.json(err);
    });
});

// DELETE route to delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete the post with the specified ID
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no post was deleted, respond with a 404 status code
    if (postData === 0) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    // Respond with a 200 status code and the deleted post data
    res.status(200).json(postData);
  } catch (err) {
    // Handle errors by responding with a 500 status code
    res.status(500).json(err);
  }
});

// Export the router for use in other parts of the application
module.exports = router;
