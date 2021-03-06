'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: { validator: validator.isEmail , message: 'Invalid email.' }
    },
    password: {
        type: String,
        required: true
    }
});

module.export = mongoose.model('User', userSchema);