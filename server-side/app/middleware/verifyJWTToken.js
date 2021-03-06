'use strict';

require('dotenv').load();

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.secret, function(err, decoded) {
    if (err) {
        console.log(err);
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.jwt = decoded;
    next();

  });
  
}

module.exports = verifyToken;