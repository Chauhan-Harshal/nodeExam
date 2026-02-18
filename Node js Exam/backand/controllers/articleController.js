const articles = require('../utils/articles');

exports.list = (req, res) => {
  res.json(articles.findAll());
};

exports.viewList = (req, res) => {
  res.render('articleList', { articles: articles.findAll(), user: req.user });
};

exports.create = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content required' });
  }
  const art = articles.create({ title, content, author: req.user.email });
  // link to user
  const users = require('../utils/users');
  users.addArticleToUser(req.user.email, art.id);
  res.status(201).json(art);
};

exports.get = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const art = articles.findById(id);
  if (!art) return res.status(404).json({ message: 'Not found' });
  res.json(art);
};

exports.viewSingle = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const art = articles.findById(id);
  if (!art) return res.status(404).send('Not found');
  res.render('article', { article: art, user: req.user });
};

exports.listByUser = (req, res) => {
  // fetch article ids linked to authenticated user
  const users = require('../utils/users');
  const ids = users.getArticles(req.user.email);
  const list = ids.map(i => articles.findById(i)).filter(Boolean);
  res.json(list);
};

exports.renderMyArticles = (req, res) => {
  const users = require('../utils/users');
  const ids = users.getArticles(req.user.email);
  const list = ids.map(i => articles.findById(i)).filter(Boolean);
  res.render('myArticles', { articles: list, user: req.user });
};

exports.listByEmail = (req, res) => {
  // either admin or same user
  const targetEmail = req.params.email;
  if (req.user.email !== targetEmail && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const users = require('../utils/users');
  const ids = users.getArticles(targetEmail);
  const list = ids.map(i => articles.findById(i)).filter(Boolean);
  res.json(list);
};

exports.renderForm = (req, res) => {
  res.render('articleForm', { article: null, user: req.user });
};

exports.renderEdit = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const art = articles.findById(id);
  if (!art) return res.status(404).send('Not found');
  if (art.author !== req.user.email && req.user.role !== 'admin') {
    return res.status(403).send('Forbidden');
  }
  res.render('articleForm', { article: art, user: req.user });
};


exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const art = articles.findById(id);
  if (!art) return res.status(404).json({ message: 'Not found' });
  // simple ownership check or admin
  if (art.author !== req.user.email && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const updated = articles.update(id, req.body);
  res.json(updated);
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const art = articles.findById(id);
  if (!art) return res.status(404).json({ message: 'Not found' });
  if (art.author !== req.user.email && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  articles.delete(id);
  res.status(204).end();
};
