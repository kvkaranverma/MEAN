const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../models/user');

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password)
        .then(hashedPassword => {
            const user = new User({
                email: req.body.email,
                password: hashedPassword
            });

            user.save()
                .then((result) => {
                    res.status(201).send({
                        message: 'User created',
                        result
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send('Not able to add user')
                });
        })
})

module.exports = router;
