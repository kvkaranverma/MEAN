const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const path = require('path');

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
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
    next();
})
app.use(bodyParser.json())

app.use('/api/user', userRoutes)
app.use(postRoutes)

app.use('/images', express.static(path.join('backend/images')))

module.exports = app;