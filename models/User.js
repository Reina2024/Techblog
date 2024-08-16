// Import necessary modules from Sequelize and bcrypt
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User model, extending Sequelize's Model class
class User extends Model {
  // Define an instance method to check if the provided password matches the hashed password
  async checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with Sequelize
User.init(
  {
    // Define the 'id' column with integer type, not nullable, as primary key, and auto-incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'username' column with string type, not nullable, and unique
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Define the 'password' column with string type, not nullable, and validate length between 4 and 100 characters
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 100],
      },
    },
  },
  {
    // Define model-specific hooks
    hooks: {
      // Before creating a new user, hash the password with bcrypt
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize, // Pass the Sequelize instance for database connection
    timestamps: false, // Disable automatic timestamps (createdAt and updatedAt)
    underscored: true, // Use underscored naming convention for columns (e.g., `user_id` instead of `userId`)
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
