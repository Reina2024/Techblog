const { Comment } = require('../models');

const commentdata = [
  
  { content: 'Great post!', user_id: 1, post_id: 2, created_at: new Date(), updated_at: new Date() },
  { content: 'Very informative, thanks!', user_id: 2, post_id: 3, created_at: new Date(), updated_at: new Date() },
  { content: 'I disagree with some points.', user_id: 1, post_id: 2, created_at: new Date(), updated_at: new Date() },
  { content: 'Excellent read.', user_id: 3, post_id: 2, created_at: new Date(), updated_at: new Date() }
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;