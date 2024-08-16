// Import the Sequelize library for ORM functionality
const Sequelize = require('sequelize');

// Load environment variables from the .env file
require('dotenv').config();

// Declare a variable to hold the Sequelize instance
let sequelize;

// Check if the environment variable DB_URL is defined
if (process.env.DB_URL) {
  // If DB_URL is defined, create a new Sequelize instance using the provided URL
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  // If DB_URL is not defined, create a new Sequelize instance using separate environment variables
  sequelize = new Sequelize(
    process.env.DB_NAME,        // Database name from environment variables
    process.env.DB_USER,        // Database user from environment variables
    process.env.DB_PASSWORD,    // Database password from environment variables
    {
      host: 'localhost',        // Database host (localhost in this case)
      dialect: 'postgres'       // Specify the database dialect (PostgreSQL)
    }
  );
}

// Export the Sequelize instance to be used in other parts of the application
module.exports = sequelize;
