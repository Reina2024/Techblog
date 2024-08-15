const { Comment } = require('../models');

const commentdata = [
  {
    text: 'comment 1',
    user_id: 1,
    post_id: 2,
  },
  {
    text: 'comment 2',
    user_id: 2,
    post_id: 3,
  },  
  {
    text: 'comment 3',
    user_id: 1,
    post_id: 2,
  },  
  {
    text: 'comment 1',
    user_id: 3,
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;