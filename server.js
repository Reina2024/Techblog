// Importing necessary modules and configurations
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { clog } = require('./utils/clog');

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Create Handlebars instance with custom helpers
const hbs = exphbs.create({ helpers });

// Configure session middleware, Use Sequelize to store session data
const sess = {
    secret: 'this is very secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  }; 
    
  // Register a custom Handlebars helper for formatting dates
  hbs.handlebars.registerHelper('last_updated', function(date) {
    return new Date(date).toLocaleDateString();
  });

  // Set up Handlebars as the view engine
  app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use custom logging middleware
app.use(clog);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use imported routes for handling requests
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});