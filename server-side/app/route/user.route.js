'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = express.Router();

var VerifyToken = require('../middleware/verifyJWTToken');

router.get('/', VerifyToken, (req, res) => {
    User.find()
        .then((users) => {

            users.forEach((user, i) => {
                user = user.toJSON();
                delete user.__v;
                delete user.password;
                users[i] = user
            });
            
            res.status(200).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
});

router.post('/', (req, res) => {
    var user = new User(req.body);
    user.password = bcrypt.hashSync(user.password, 10);
    user
        .save()
        .then((user) => {
            user = user.toJSON();
            delete user.__v;
            delete user.password;
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        });
});

module.exports = router;