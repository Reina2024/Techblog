// Import the Post model from the models directory
const { Post } = require('../models');

// Array of post data to be seeded into the database
const postdata = [
  { title: 'Pepsi is best', content: 'Detailed content about Pepsi.', user_id: 1, created_at: new Date(), updated_at: new Date() },
  { title: 'Coke is best', content: 'Detailed content about Coke.', user_id: 2, created_at: new Date(), updated_at: new Date() },
  { title: 'What Does that have to do with tech?', content: 'Exploring the connection between tech and various topics.', user_id: 2, created_at: new Date(), updated_at: new Date() },
  { title: 'Tech is super cool', content: 'An article about the excitement in technology.', user_id: 3, created_at: new Date(), updated_at: new Date() }
];

// Function to seed post data into the database using bulkCreate
const seedPost = () => Post.bulkCreate(postdata);

// Export the seedPost function for use in other files
module.exports = seedPost;