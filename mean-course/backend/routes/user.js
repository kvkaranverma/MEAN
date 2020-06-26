const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../models/user');

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

module.exports = router;
