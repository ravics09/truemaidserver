const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaidSchema = new Schema(
  {
    userInfo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    aadhar: {
      type: Number,
      trim: true,
      minLength: 10,
      maxLength: 10,
    },
    experience: {
      type: Number,
      default: 0,
    },
    field: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 300,
    },
    salary: {
      type: Number,
      default: 0,
    },
    reference: {
      type: String,
      trim: true,
    },
    availabilityDate: {
      type: String,
      trim: true,
    },
    languages: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maid", MaidSchema);
