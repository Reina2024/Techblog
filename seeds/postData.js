const { Post } = require('../models');

// const postdata = [
//   {
//     title: 'Pepsi is best',
//     text: 'its better the coke!',
//     user_id: 1,
//   },
//   {
//     title: 'Coke is best',
//     text: 'coke is better then Pepsi',
//     user_id: 2,
//   },
//   {
//     title: 'What Does that have to do with tech?',
//     text: 'is this not a tech blog, what are you going on about?',
//     user_id: 2,
//   },
//   {
//     title: 'Tech is super cool',
//     text: 'tech is so cool when it works',
//     user_id: 3,
//   },
// ];

const postdata = [
  { title: 'Pepsi is best', content: 'Detailed content about Pepsi.', user_id: 1, created_at: new Date(), updated_at: new Date() },
  { title: 'Coke is best', content: 'Detailed content about Coke.', user_id: 2, created_at: new Date(), updated_at: new Date() },
  { title: 'What Does that have to do with tech?', content: 'Exploring the connection between tech and various topics.', user_id: 2, created_at: new Date(), updated_at: new Date() },
  { title: 'Tech is super cool', content: 'An article about the excitement in technology.', user_id: 3, created_at: new Date(), updated_at: new Date() }
];




const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;