// Import the User model from the models directory
const { User } = require('../models');

// Array of user data to be seeded into the database
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

// Function to seed user data into the database using bulkCreate
const seedUsers = () => User.bulkCreate(userData);

// Export the seedUsers function for use in other files (e.g., seeding scripts)
module.exports = seedUsers;