const mongoose = require("mongoose"),
  UserModel = require("@NodeAppModels/user");
const models = {
  User: mongoose.model("User"),
};
module.exports = models;
