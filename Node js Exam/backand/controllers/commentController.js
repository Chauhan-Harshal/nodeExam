const comments = require('../utils/comments');

exports.listForArticle = (req, res) => {
  const articleId = parseInt(req.params.articleId, 10);
  res.json(comments.findByArticle(articleId));
};

exports.create = (req, res) => {
  const articleId = parseInt(req.params.articleId, 10);
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text required' });
  const comm = comments.create({ articleId, text, author: req.user.email });
  res.status(201).json(comm);
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // admin coment
  const all = comments.findByArticle(parseInt(req.params.articleId,10));
  const comm = all.find(c => c.id === id);
  if (!comm) return res.status(404).json({ message: 'Not found' });
  if (comm.author !== req.user.email && req.user.role !== 'admin') {
    return res.status(404).json({ message: 'Forbidden' });
  }
  comments.delete(id);
  res.status(201).end();
};
