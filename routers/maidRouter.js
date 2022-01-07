const express = require('express');
const mainRoutes = express.Router();
const feedService = require('./../services/feedService');
const { isAuth } = require('./../services/authServices');

mainRoutes.post('/createmaid', createMaid);
mainRoutes.get('/getmaid/:id', getMaid);
mainRoutes.get('/getallmaids', getAllMaid);
mainRoutes.put('/editmaid/:id', editMaid);


function createMaid(request, response, next) {
    feedService.createMaid(request, response, next);
};

function getMaid(request, response, next) {
    feedService.getMaid(request, response, next);
};

function editMaid(request, response, next) {
    feedService.editMaid(request, response, next);
};

function getAllMaid(request, response, next) {
    feedService.getAllMaid(request, response, next);
};


module.exports = mainRoutes;