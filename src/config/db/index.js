const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect Successfully");
  } catch (error) {
    console.log("Connect Failure");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

module.exports = { connect };
