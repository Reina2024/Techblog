const { User } = require('../models');

const userdata = [
  {
    username: '',
    email: '',
    password: '',
},
{
  username: '',
  email: '',
  password: '',
},
{
  username: '',
  email: '',
  password: '',
},

];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;