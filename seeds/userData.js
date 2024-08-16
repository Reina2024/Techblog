const { User } = require('../models');

const userData = [
  {
    username: 'Candy',
    email: 'candy@candymail.com',
    password: 'candy',
},
{
  username: 'Mary',
  email: 'mary@FSF.com',
  password: 'littlelamb',
},
{
  username: 'Cody',
  email: 'Cody@FSF.com',
  password: 'codester',
},

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;