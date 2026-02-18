const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

//  list and get
router.get('/', articleCtrl.list);
// authenticated user'(JSON)
router.get('/mine', authenticateToken, articleCtrl.listByUser);
// view pages
router.get('/mine/view', authenticateToken, articleCtrl.renderMyArticles);
router.get('/create', authenticateToken, articleCtrl.renderForm);
router.get('/:id/edit', authenticateToken, articleCtrl.renderEdit);
// admin can fetch by email
router.get('/user/:email', authenticateToken, articleCtrl.listByEmail);

router.get('/view', articleCtrl.viewList);
router.get('/:id', articleCtrl.get);
router.get('/:id/view', articleCtrl.viewSingle);

//  create/update/delete
router.post('/', authenticateToken, articleCtrl.create);
router.put('/:id', authenticateToken, articleCtrl.update);
router.delete('/:id', authenticateToken, requireRole('admin'), articleCtrl.delete);

module.exports = router;
