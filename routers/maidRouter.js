const express = require('express');
const maidRoutes = express.Router();
const maidService = require('./../services/maidService');
// const { isAuth } = require('./../services/authService');

maidRoutes.post('/createmaid/:id', createMaid);
maidRoutes.put('/editmaid/:id', editMaid);
maidRoutes.get('/getmaiddetail/:id', getMaid);
maidRoutes.get('/getallmaids', getAllMaid);


function createMaid(request, response, next) {
    maidService.createMaid(request, response, next);
};

function editMaid(request, response, next) {
    maidService.editMaid(request, response, next);
};

function getMaid(request, response, next) {
    maidService.getMaid(request, response, next);
};

function getAllMaid(request, response, next) {
    maidService.getAllMaid(request, response, next);
};


module.exports = maidRoutes;