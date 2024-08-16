const { Post } = require('../models');

const postdata = [
  {
    title: 'Pepsi is best',
    text: 'its better the coke!',
    user_id: 1,
  },
  {
    title: 'Coke is best',
    text: 'coke is better then Pepsi',
    user_id: 2,
  },
  {
    title: 'What Does that have to do with tech?',
    text: 'is this not a tech blog, what are you going on about?',
    user_id: 2,
  },
  {
    title: 'Tech is super cool',
    text: 'tech is so cool when it works',
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;