require("dotenv").config();

const Maid = require("./../models/maidModel");
const User = require("./../models/userModel");

module.exports = {
  createMaid,
  editMaid,
  getMaid,
  getAllMaid,
};

async function createMaid(request, response, next) {
  var ObjectId = require("mongoose").Types.ObjectId;
  const maid = await Maid.find({ userInfo: new ObjectId(request.params.id) });
  const user = await User.findById(request.params.id);
  console.log("maid after search ", maid);

  if (maid.length == 0) {
    console.log("New maid information Added");

    Maid.create({
      userInfo: request.params.id,
      aadhar: request.body.aadhar,
      experience: request.body.experience,
      field: request.body.field,
      salary: request.body.salary,
      reference: request.body.reference,
      availabilityDate: request.body.availabilityDate,
      languages: request.body.languages,
    }).then((res) => {
      console.log("maidID", res._id);
      user.isMaid = true;
      user.maidId = res._id;
      user.save();

      response.status(200).json({
        status: 200,
        maid: res,
      });
    });
  }
}

async function editMaid(request, response, next) {
  const maid = await Maid.findById(request.params.id);
  const {
    aadhar,
    experience,
    field,
    salary,
    reference,
    availabilityDate,
    languages,
  } = request.body;
  console.log("maid after search ", maid);

  if (maid) {
    console.log("Old maid exist");
    Maid.findByIdAndUpdate(
      request.params.id,
      { runValidators: true },
      (err, data) => {
        (data.aadhar = aadhar ? aadhar : data.aadhar),
          (data.experience = experience ? experience : data.experience),
          (data.field = field ? field : data.field),
          (data.salary = salary ? salary : data.salary),
          (data.reference = reference ? reference : data.reference),
          (data.availabilityDate = availabilityDate
            ? availabilityDate
            : data.availabilityDate),
          (data.languages = languages ? languages : data.languages),
          data
            .save()
            .then((doc) => {
              console.log("sending updated maid data as===", doc);
              response.status(200).json({
                maid: doc,
                status: 200,
              });
            })
            .catch((err) => {
              response.json(err);
            });
      }
    );
  }
}

async function getMaid(request, response, next) {
  Maid.findById(request.params.id)
    .populate("userInfo")
    .then((res) => {
      response.status(200).json({
        maid: res,
        status: 200,
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
    .populate("userInfo")
    .then((res) => {
      response.status(200).json({
        maids: res,
        status: 200,
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}
