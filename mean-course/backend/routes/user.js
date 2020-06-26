const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user');
const user = require('../models/user');

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 9)
        .then(hashedPassword => {
            console.log(hashedPassword)
            const user = new User({
                email: req.body.email,
                password: hashedPassword
            });

            user.save()
                .then((result) => {
                    res.status(201).send({
                        message: 'User created',
                        result: result
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send('Not able to add user')
                });
        }).catch(err => {
            console.log(err)
        })
})

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: 'Auth failed'
                })
            }
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if(!result) {
                return res.status(404).send({
                    message: 'Auth failed'
                })
            }
            const token = jwt.sign(
                {email: user.email, userId: user._id},
                'this_is_secret_fuck_off',
                {expiresIn: '1h'});

        }).catch(err => {
            return res.status(404).send({
                message: 'Auth failed'
            })
        })
})

module.exports = router;
