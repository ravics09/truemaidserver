require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./../models/userModel");

module.exports = {
  createUser,
  getUser,
  editProfile,
  getProfile,
  resetPassword,
  uploadProfilePhoto,
  addToListedMaid,
  removeFromListedMaid,
};

async function createUser(request, response, next) {
  const user = await User.findOne({ userName: request.userName });

  if (!user) {
    if (request.userName && request.password) {
      bcrypt.hash(request.password, 12, (err, passwordHash) => {
        if (err) {
          response.status(500).send("Couldn't hash the password");
        } else if (passwordHash) {
          return User.create({
            userName: request.userName,
            hash: passwordHash,
          }).then(() => {
            response.status(200).json({
              message: "You have signed up successfully. Please sign in!!",
              status: 200,
            });
          });
        }
      });
    } else response.status(400).send("Please Enter Required Details");
  } else
    response.status(409).send("User already registered, Please Sign In...");
}

async function getUser(request, response, next) {
  const user = await User.findOne({ userName: request.userName });
  if (user) {
    bcrypt.compare(request.password, user.hash, (err, compareRes) => {
      if (err) {
        response.status(502).send("Server error while checking user password");
      } else if (compareRes) {
        const token = jwt.sign(
          { userName: request.userName },
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.EXPIRE_IN,
          }
        );

        response.status(200).json({
          accessToken: token,
          user: user,
          status: 200,
        });
      } else {
        response.status(401).send("Invalid Credentials! Please try again.");
      }
    });
  } else response.status(404).send("User Not Registered.");
}

async function getProfile(request, response, next) {
  const user = await User.findById(request.params.id);
  if (user) {
    response.status(200).json({
      user: user,
    });
  } else response.status(400).send("User Information Not Found");
}

async function editProfile(request, response, next) {
  const user = await User.findById(request.params.id);
  if (user) {
    const updatedInfo = new User({
      _id: request.params.id,
      fullName: request.body.fullName,
      email: request.body.email,
      mobile: request.body.mobile,
      city: request.body.city,
      stateInfo: request.body.stateInfo,
      pincode: request.body.pincode,
    });

    User.findByIdAndUpdate(request.params.id, updatedInfo, {
      new: true,
      runValidators: true,
    }).then((dbUser) => {
      response.status(200).json({
        status: 200,
        user: dbUser,
      });
    });
  } else response.status(404).send("User Information Not Found.");
}

async function resetPassword(request, response, next) {
  const user = await User.findById(request.params.id);
  if (user) {
    if (request.body.password) {
      bcrypt.hash(request.body.password, 12, (err, passwordHash) => {
        if (err) {
          return response
            .status(500)
            .json({ message: "couldn't hash the password" });
        } else if (passwordHash) {
          user.hash = passwordHash;
          user.save();
          response.status(200).json({
            message: "Password Updated successfully.",
            status: 200,
          });
        }
      });
    }
  } else return response.status(400).send("User doesn't exist.");
}

async function uploadProfilePhoto(request, response, next) {
  const { id } = request.params;

  var profilePic = request.file.path;
  User.findById(id, (err, data) => {
    data.profilePhoto = profilePic ? profilePic : data.profilePhoto;
    data
      .save()
      .then((doc) => {
        response.status(200).json({
          user: doc,
          status: 200,
        });
      })
      .catch((err) => {
        response.json(err);
      });
  });
}

async function addToListedMaid(request, response) {
  const { id } = request.params;
  const { maidId, maidName, maidSalary } = request.body;

  const user = await User.findById(id);
  const listedOne = await User.find({ "listedMaid.maidId": maidId });

  if (user && listedOne.length === 0) {
    const newItem = {
      maidId: maidId,
      maidName: maidName,
      maidSalary: maidSalary,
    };

    const updateListedMaid = {
      $push: { listedMaid: newItem },
    };

    User.findByIdAndUpdate(id, updateListedMaid, {
      new: true,
      runValidators: true,
    }).then((res) => {
      response.status(200).json({
        message: "Maid Added To Listed Section!",
        user: res,
        status: 200,
      });
    });
  } else {
    response.status(400).send("Maid Already added!");
  }
}

async function removeFromListedMaid(request, response) {
  const { id } = request.params;
  const { maid_Id } = request.body;
  const listedOne = await User.find({ "listedMaid._id": maid_Id });

  if (listedOne.length > 0) {
    User.findByIdAndUpdate(
      id,
      {
        $pull: { listedMaid: { _id: maid_Id } },
      },
      {
        new: true,
        runValidators: true,
      }
    ).then((res) => {
      response.status(200).json({
        message: "Maid Successfully Removed From The List!",
        user: res,
        status: 200,
      });
    });
  } else {
    response.status(400).send("Maid Not Exist In The List");
  }
}
