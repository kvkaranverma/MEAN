const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const postRoutes = require('./routes/posts')

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



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
    next();
})
app.use(bodyParser.json())
app.use(postRoutes)

module.exports = app;