const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  fullName: "",
  profession: "",
  email: "",
  phone: "",
  country: "",
  town: "",
  filePath: "",
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
