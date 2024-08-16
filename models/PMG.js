// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model, extending Sequelize's Model class
class Post extends Model {}

// Initialize the Post model with Sequelize
Post.init(
  {
    // Define the 'id' column with integer type, not nullable, as primary key, and auto-incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'title' column with string type and not nullable
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'content' column with string type and not nullable
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'user_id' column with integer type and reference to 'users' model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // References the 'users' table
        key: 'id', // Column in the 'users' table to reference
      },
    },
  },
  {
    sequelize, // Pass the Sequelize instance for database connection
    underscored: true, // Use underscored naming convention for columns (e.g., `user_id` instead of `userId`)
  }
);

// Export the Post model for use in other parts of the application
module.exports = Post;
