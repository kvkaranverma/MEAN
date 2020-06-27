const express = require('express')
const multer = require('multer')
const PostController = require('../controllers/posts')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type')
        if(isValid) {
            error = null;
        }
        callback(error, 'backend/images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('/api/posts', checkAuth, multer({storage: storage}).single('image'), PostController.createPost);

router.get('/api/posts', PostController.getPosts);

router.get('/api/posts/:id', PostController.getPost)

router.patch('/api/posts/:id', checkAuth, multer({storage: storage}).single('image'), PostController.updatePost)

router.delete('/api/posts/:id', checkAuth, PostController.deletePost);

module.exports = router