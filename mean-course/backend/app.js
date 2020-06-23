const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {id: 'sdkjfhdjs', title: 'First server side post', content: 'first content coming from server'},
        {id: 'sdkjfhddd', title: 'Second server side post', content: 'second content coming from server'},
    ];
    return res.status(200).json({
        message: 'Posts fetched successfully!',
        posts
    });
    next();
});

module.exports = app;