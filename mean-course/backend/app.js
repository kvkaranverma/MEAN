const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

const Post = require('./models/post');

mongoose.connect("mongodb+srv://Karan:Whynotme1@cluster0-1cn7x.mongodb.net/node-angular?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log('Connection failed', err);
    }
);

router.post('/api/posts', async (req, res) => {
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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
    next();
})
app.use(bodyParser.json())
app.use(router)
app.use(router);

module.exports = app;