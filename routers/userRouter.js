const express = require('express');
const mainRoutes = express.Router();
const userServices = require('./../services/userService');

mainRoutes.post('/signup', signUp);
mainRoutes.post('/signin', signIn);

function signUp(request, response, next) {
    userServices.createUser(request.body, response, next);
};

function signIn(request, response, next) {
    userServices.getUser(request.body, response, next);
};

module.exports = mainRoutes;