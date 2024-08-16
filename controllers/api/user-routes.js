// Import the Express router module and the User model
const router = require('express').Router();
const { User } = require('../../models');

// POST route for user registration
router.post('/', async (req, res) => {
  try {
    // Create a new user with the provided username and password
    const dbUserData = (await User.create({
      username: req.body.username,
      password: req.body.password,
    })).toJSON();
    
    // Save user data to the session and mark the user as logged in
    req.session.save(() => {
      req.session.loggedIn = true; // Set loggedIn status to true
      req.session.uid = dbUserData.id; // Store the new user's ID in the session

      // Respond with the newly created user data
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    // Log error and respond with a 500 status code
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    // Find a user with the provided username
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // If no user is found, respond with an error message
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    // Check if the provided password is correct
    const validPassword = await dbUserData.checkPassword(req.body.password);

    // If the password is incorrect, respond with an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    // Save user data to the session and mark the user as logged in
    req.session.save(() => {
      req.session.loggedIn = true; // Set loggedIn status to true
      req.session.uid = dbUserData.toJSON().id; // Store the user's ID in the session
      res.status(200).json({ message: 'You are now logged in!' }); // Respond with a success message
    });
  } catch (err) {
    // Log error and respond with a 500 status code
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // If the user is logged in, destroy the session and respond with a 204 status code
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If no user is logged in, respond with a 404 status code
    res.status(404).end();
  }
});

// Export the router for use in other parts of the application
module.exports = router;
