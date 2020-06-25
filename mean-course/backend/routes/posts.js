const express = require('express')
const Post = require('../models/post')
const multer = require('multer')

const router = express.Router();

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
        callback(error, 'mean-course/backend/images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('/api/posts', multer(storage).single('image'), async (req, res) => {
    const post = new Post(req.body);
    console.log(post);
    await post.save().then(result => {
        res.status(201).send({
            message: 'Post added successfully!',
            postId: result._id
        });
    })
});

router.get('/api/posts', async (req, res) => {
    await Post.find()
        .then(posts => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: posts
            });
        })
        .catch(error => console.log('error in fetching posts'));
    
});

router.get('/api/posts/:id', async (req, res) => {
    await Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).send(post);
        }
        else {
            res.status(404).send({message: 'Post not found'});
        }
    }).catch(err => console.log(err))
})

router.patch('/api/posts/:id', async (req, res) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    })
    console.log(post, req.params.id)
    await Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).send({message: 'Update successful!'});
    }).catch(err => {
        console.log('Error updating!');
        res.status(400).send({message: 'Error in updating'});
    })
})

router.delete('/api/posts/:id', async (req, res) => {
    await Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).send({
            message: 'Post deleted'
        })
    })
});

module.exports = router