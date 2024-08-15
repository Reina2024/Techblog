const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// not sure I'll use this
// const { clog } = require('./utils/clog');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'this is very secret',
      
    cookie: {
      maxAge: 250000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
  app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// if using clog?
// app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});