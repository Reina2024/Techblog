const { Post } = require('../models');

const postdata = [
  {
    title: '',
    text: '',
    user_id: 1,
  },
  {
    title: '',
    text: '',
    user_id: 2,
  },
  {
    title: '',
    text: '',
    user_id: 2,
  },
  {
    title: '',
    text: '',
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;