// Middleware function for logging HTTP requests
const clog = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    // Switch based on the HTTP request method, then log request with the book emoji in the corresponding colour
    switch (req.method) {
      case 'GET': {
        console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      default:
        console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
    }
  // Pass control to the next middleware or route handler
    next();
  };
  
  // Export the clog middleware function for use in other files
  exports.clog = clog;

  // I got this completely from in class activities