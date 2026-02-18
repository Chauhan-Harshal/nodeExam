
let nextId = 1;
const comments = [];  //for comments

module.exports = {
  create(comment) {
    comment.id = nextId++;
    comments.push(comment);
    return comment;
  },
  findByArticle(articleId) {
    return comments.filter(c => c.articleId === articleId);
  },
  delete(id) {
    const idx = comments.findIndex(c => c.id === id);
    if (idx !== -1) comments.splice(idx, 1);
  }
};
