// user not logged in then they are redirected
const withAuth = (req, res, next) => {  
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
    console.log(req.session.uid + "login")
    next();
  };
  
  module.exports = withAuth;
