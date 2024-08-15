const router = require('express').Router();


router.get('/:id', async (req, res) => {
  req.session.save(() => {
    req.session.pid = req.params.id;
  });

    res.render("addComment", {
      loggedIn: req.session.loggedIn,
      pid: req.params.id
    });
});

module.exports = router;