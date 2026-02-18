const bcrypt = require('bcryptjs');

// Simple in-memory user model. Replace with real DB later.
const users = [];
let nextId = 1;

async function createUser({ username, email, password, role }) {
  if (!email || !password || !username) throw new Error('username,email,password required');
  if (findByEmail(email) || findByUsername(username)) return null;
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: nextId++, username, email, password: hashed, role: role || 'user', articles: [] };
  users.push(user);
  return user;
}

function findByEmail(email) {
  return users.find(u => u.email === email);
}

function findByUsername(username) {
  return users.find(u => u.username === username);
}

async function verifyPassword(user, candidate) {
  return bcrypt.compare(candidate, user.password);
}

function addArticleToUser(email, articleId) {
  const u = findByEmail(email);
  if (u) {
    u.articles = u.articles || [];
    u.articles.push(articleId);
  }
}

function getArticles(email) {
  const u = findByEmail(email);
  return u ? u.articles || [] : [];
}

module.exports = {
  createUser,
  findByEmail,
  findByUsername,
  verifyPassword,
  addArticleToUser,
  getArticles,

  _all: users
};
