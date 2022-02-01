const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    trim: true,
    index: true,
  },
  userName: {
    type: String,
    unique: true,
    required: [true, "Please add username"],
    trim: true,
    minLength: [4, "username is too short!"],
    maxLength: 15,
  },
  mobile: {
    type: Number,
    trim: true,
    minLength: 10,
    maxLength: 10,
  },
  city: {
    type: String,
    trim: true,
  },
  stateInfo: {
    type: String,
    trim: true,
  },
  pincode: {
    type: Number,
    trim: true,
    minLength: 6,
    maxLength: 6,
  },
  profilePhoto: {
    type: String,
  },
  listedMaid: [
    {
      maidId: String,
    }
  ],
  hash: {
    type: String,
    required: true,
  },
  isMaid: {
    type: String,
  },
  maidId: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual("Maid", {
  ref: "Maid",
  localField: "_id",
  foreignField: "userInfo",
});

module.exports = mongoose.model("User", UserSchema);
