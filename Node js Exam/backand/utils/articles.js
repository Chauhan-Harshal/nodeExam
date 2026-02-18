
let nextId = 1;
const articles = [];// for articles

module.exports = {
  create(article) {
    article.id = nextId++;
    articles.push(article);
    return article;
  },
  findAll() {
    return articles;
  },
  findById(id) {
    return articles.find(a => a.id === id);
  },
  update(id, data) {
    const art = articles.find(a => a.id === id);
    if (art) Object.assign(art, data);
    return art;
  },
  delete(id) {
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) articles.splice(index, 1);
  }
};
