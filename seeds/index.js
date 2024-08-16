// Import the Sequelize connection configuration
const sequelize = require('../config/connection');

// Import the functions for seeding data into the database
const seedUsers = require('./userData');
const seedComments = require('./commentData');
const seedPosts = require('./postData');


// Function to seed all data into the database
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComments();

 // Exit the process once all seeding operations are complete
  process.exit(0);
};

// Execute the seedAll function to start the seeding process
seedAll();