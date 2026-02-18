

const userModel = require('../models/userModel');

module.exports = {
  addUser(user) {
   
    return userModel.createUser(user);
  },
  findByEmail(email) {
    return userModel.findByEmail(email);
  },
  addArticleToUser(email, articleId) {
    return userModel.addArticleToUser(email, articleId);
  },
  getArticles(email) {
    return userModel.getArticles(email);
  }
};
