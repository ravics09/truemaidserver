const mongoose = require("mongoose");
const URI = process.env.ATLAS_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectDB = async () => {
  mongoose.connect(URI, connectionParams);
  mongoose.Promise = global.Promise;

  mongoose.connection.on("connected", () => {
    console.log("Connected to database " + URI);
  });

  mongoose.connection.on("error", (err) => {
    console.log("Database connection error " + err);
  });
};

module.exports = connectDB;