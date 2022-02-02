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
userRoutes.put('/editmaidinfo/:id', editProfile);
userRoutes.put('/addtolistedmaid/:id', addToListedMaid);
userRoutes.put('/removefromlistedmaid/:id', removeFromListedMaid);

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

function addToListedMaid(request, response, next) {
    userServices.addToListedMaid(request, response, next);
};

function removeFromListedMaid(request, response, next) {
    userServices.removeFromListedMaid(request, response, next);
};



module.exports = userRoutes;