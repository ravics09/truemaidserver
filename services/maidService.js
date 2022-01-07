require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Maid = require("./../models/maidModel");
const User = require("./../models/userModel");

module.exports = {
  createMaid,
  getMaid,
  getAllMaid
};

async function createMaid(request, response, next) {
  const {
    userId,
    aadhar,
    experience,
    field,
    salary,
    reference,
    availabilityDate,
    languages,
  } = request.body;
  const maid = new Maid({
    otherDetails: userId,
    aadhar: aadhar,
    experience: experience,
    field: field,
    salary: salary,
    reference: reference,
    availabilityDate: availabilityDate,
    languages: languages,
  });

  maid.save().then(() => {
    response.status(200).json({
      message: "Maid information is saved successfully",
      statusCode: 200,
    });
  });
}

async function getMaid(request, response, next) {
  const { id } = request.params;
  Maid.findById({ _id: id })
    .populate("otherDetails")
    // .populate("comments.postedBy")
    .then((res) => {
      response.status(200).json({
        maidDetail: res,
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}

async function getAllMaid(request, response, next) {
  Maid.find()
    .then((res) => {
      response.status(200).json({
        maidList: res,
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}
