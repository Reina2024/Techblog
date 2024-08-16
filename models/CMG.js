// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model, extending Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with Sequelize
Comment.init(
  {
    // Define the 'content' column with text type and enforce it to be non-nullable
    content: {
      type: DataTypes.TEXT, // Use TEXT type for potentially large comment content
      allowNull: false, // Enforces that content cannot be null
    },
    // Define the 'user_id' column with integer type and enforce it to be non-nullable
    user_id: {
      type: DataTypes.INTEGER, // Use INTEGER type to reference a User
      allowNull: false, // Enforces that user_id cannot be null
    },
    // Define the 'post_id' column with integer type and enforce it to be non-nullable
    post_id: {
      type: DataTypes.INTEGER, // Use INTEGER type to reference a Post
      allowNull: false, // Enforces that post_id cannot be null
    },
    // Define the 'created_at' column with date type and set a default value to the current date and time
    created_at: {
      type: DataTypes.DATE, // Use DATE type for timestamp
      defaultValue: DataTypes.NOW, // Default value is the current date and time
    },
    // Define the 'updated_at' column with date type and set a default value to the current date and time
    updated_at: {
      type: DataTypes.DATE, // Use DATE type for timestamp
      defaultValue: DataTypes.NOW, // Default value is the current date and time
    },
  },
  {
    sequelize, // Pass the Sequelize instance for database connection
    modelName: 'Comment', // Set the model name to 'Comment'
    tableName: 'Comment', // Specify the table name as 'Comment'
    timestamps: true, // Enable automatic handling of 'created_at' and 'updated_at' timestamps
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
