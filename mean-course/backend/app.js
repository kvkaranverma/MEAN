const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const posts = [
    {id: 'sdkjfhdjs', title: 'First server side post', content: 'first content coming from server'},
    {id: 'sdkjfhddd', title: 'Second server side post', content: 'second content coming from server'},
];

router.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).send({
        message: 'Post added successfully!'
    });
});

router.get('/api/posts', (req, res, next) => {
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts
    });
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