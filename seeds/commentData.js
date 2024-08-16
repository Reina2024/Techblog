// Import the Comment model from the models directory
const { Comment } = require('../models');

// Array of comment data to be seeded into the database
const commentdata = [
  
  { content: 'Great post!', user_id: 1, post_id: 2, created_at: new Date(), updated_at: new Date() },
  { content: 'Very informative, thanks!', user_id: 2, post_id: 3, created_at: new Date(), updated_at: new Date() },
  { content: 'I disagree with some points.', user_id: 1, post_id: 2, created_at: new Date(), updated_at: new Date() },
  { content: 'Excellent read.', user_id: 3, post_id: 2, created_at: new Date(), updated_at: new Date() }
];

// Function to seed comment data into the database using bulkCreate
const seedComment = () => Comment.bulkCreate(commentdata);

// Export the seedComment function for use in other files 
module.exports = seedComment;