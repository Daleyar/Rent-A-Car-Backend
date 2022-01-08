const mongoose = require("mongoose");
const config = require("config");

const connectDb = () => {
  mongoose
    .connect(config.get("mongoURI"))
    .then(() => console.log("Connected to MongoDb..."))
    .catch((err) => {
      console.log(`Could not connect to MongoDb. Error: ${err}`);
      process.exit(1);
    });
};

module.exports = connectDb;