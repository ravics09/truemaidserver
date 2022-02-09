const express = require('express');
const paymentRoutes = express.Router();
const paymentService = require('./../services/paymentService');

paymentRoutes.post('/generatechecksum', generatechecksum);


function generatechecksum(request, response) {
    paymentService.generatechecksum(request, response);
};

module.exports = paymentRoutes;