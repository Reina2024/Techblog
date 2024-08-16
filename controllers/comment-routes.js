// Import the Express router module
const router = require('express').Router();

// Define a GET route handler for the path '/:id'
router.get('/:id', async (req, res) => {
  // Save the post ID from the URL parameters to the session
  req.session.save(() => {
    req.session.pid = req.params.id; // Store the post ID in the session under 'pid'
  });

  // Render the 'addComment' view, passing along the login status and post ID
  res.render("addComment", {
    loggedIn: req.session.loggedIn, // Pass whether the user is logged in
    pid: req.params.id // Pass the post ID to the view
  });
});

// Export the router for use in other parts of the application
module.exports = router;
