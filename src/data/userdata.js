const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  userID: {
    type: String,
    uniqe: true, 

  },
  points: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", Users);