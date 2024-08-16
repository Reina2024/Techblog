// Import the User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define a one-to-many relationship between Post and Comment
// A Post can have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id', // Column in the Comment table that references the Post
  onDelete: "CASCADE", // When a Post is deleted, all related Comments will also be deleted
});

// Define a many-to-one relationship between Comment and Post
// A Comment belongs to a single Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id', // Column in the Comment table that references the Post
});

// Define a one-to-many relationship between User and Post
// A User can have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id', // Column in the Post table that references the User
  onDelete: "CASCADE", // When a User is deleted, all related Posts will also be deleted
});

// Define a many-to-one relationship between Post and User
// A Post belongs to a single User
Post.belongsTo(User, {
  foreignKey: 'user_id', // Column in the Post table that references the User
});

// Define a one-to-many relationship between User and Comment
// A User can have many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id', // Column in the Comment table that references the User
  onDelete: "CASCADE", // When a User is deleted, all related Comments will also be deleted
});

// Define a many-to-one relationship between Comment and User
// A Comment belongs to a single User
Comment.belongsTo(User, {
  foreignKey: 'user_id', // Column in the Comment table that references the User
});

// Export the models to be used in other parts of the application
module.exports = { User, Post, Comment };
