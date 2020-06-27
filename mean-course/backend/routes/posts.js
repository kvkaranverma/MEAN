const express = require('express')
const Post = require('../models/post')
const multer = require('multer')

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

router.post('/api/posts', checkAuth, multer({storage: storage}).single('image'), async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId 
    });
    await post.save().then(result => {
        res.status(201).send({
            message: 'Post added successfully!',
            post: {
                ...result,
                id: result._id
            }
        });
    }).catch((err) => console.log(err))
});

router.get('/api/posts', async (req, res) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;

    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    await postQuery
        .then(posts => {
            fetchedPosts = posts;
            return Post.count();
        })
        .then(count => {
            res.status(200).send({
                message: 'Posts fetched successfully',
                posts: fetchedPosts,
                maxPosts: count
            })
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

router.patch('/api/posts/:id', checkAuth, multer({storage: storage}).single('image'), async (req, res) => {
    console.log(req.file);
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,

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
    }).catch((err) => console.log(err))
});

module.exports = router