require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('./../models/userModel');

module.exports = {
  createUser,
  getUser,
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
              statusCode: 200,
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
          userId: user._id.toString(),
        });
      } else {
        response.status(401).send("Invalid Credentials! Please try again.");
      }
    });
  } else response.status(404).send("User Not Registered.");
}