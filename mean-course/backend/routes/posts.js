const express = require('express')

const PostController = require('../controllers/posts')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')

router.post('/api/posts', checkAuth, extractFile, PostController.createPost);

router.get('/api/posts', PostController.getPosts);

router.get('/api/posts/:id', PostController.getPost)

router.patch('/api/posts/:id', checkAuth, extractFile, PostController.updatePost)

router.delete('/api/posts/:id', checkAuth, PostController.deletePost);

module.exports = router