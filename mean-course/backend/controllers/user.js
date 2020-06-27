const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = (req, res) => {
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
                    res.status(500).send({
                        message: 'User already exists'
                    })
                });
        }).catch(err => {
            console.log(err)
        })
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: 'Authentication failed'
                })
            }
            fetchedUser = user
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if(!result) {
                return res.status(404).send({
                    message: 'Authentication failed'
                })
            }
            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id},
                'this_is_secret_fuck_off',
                {expiresIn: '1h'}
            );
            res.status(200).send({
                token,
                expiresIn: 3600,
                userId: fetchedUser._id
            })
            
        }).catch(err => {
            return res.status(404).send({
                message: 'Authentication failed'
            })
        })
}