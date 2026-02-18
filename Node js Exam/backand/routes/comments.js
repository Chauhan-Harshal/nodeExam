const express = require('express');
const router = express.Router({ mergeParams: true });
const commentCtrl = require('../controllers/commentController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// list for an article
router.get('/', commentCtrl.listForArticle);

// routes for adding/deleting comments
router.post('/', authenticateToken, commentCtrl.create);
router.delete('/:id', authenticateToken, requireRole('admin'), commentCtrl.delete);

module.exports = router;
