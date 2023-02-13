const mongoose = require("mongoose");

const market = new mongoose.Schema({
  urunID: {
    type: Number, 
    unique: true
  },
  urunAd: {
   type: String,
   default: "belirsiz"
  },
  urunPara: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("market", market);