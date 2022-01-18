const express = require('express');
const userRoutes = express.Router();
const Upload  = require('./../middleware/upload');
const userServices = require('./../services/userService');

userRoutes.post('/signup', signUp);
userRoutes.post('/signin', signIn);
userRoutes.put('/editprofile/:id', editProfile);
userRoutes.get('/getprofile/:id', getProfile);
userRoutes.put('/resetpassword/:id', resetPassword);
userRoutes.put('/uploadprofilephoto/:id', Upload.single("photo"), uploadProfilePhoto);

function signUp(request, response, next) {
    userServices.createUser(request.body, response, next);
};

function signIn(request, response, next) {
    userServices.getUser(request.body, response, next);
};

function editProfile(request, response, next) {
    userServices.editProfile(request, response, next);
};

function getProfile(request, response, next) {
    userServices.getProfile(request, response, next);
};

function resetPassword(request, response, next) {
    userServices.resetPassword(request, response, next);
};

function uploadProfilePhoto(request, response, next) {
    userServices.uploadProfilePhoto(request, response, next);
};



module.exports = userRoutes;