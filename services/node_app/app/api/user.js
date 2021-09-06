const mongoose = require("mongoose");
const api = {};
api.setup = (User) => (request, response) => {
  const admin = new User({
    username: "admin",
    password: "admin",
    pets: [],
  });
  admin.save((error) => {
    if (error) throw error;
    console.log("Admin account was succesfully set up");
    response.json({ success: true });
  });
};

api.index = (User, NodeToken) => (request, response) => {
  const token = NodeToken;
  if (token) {
    User.find({}, (error, users) => {
      if (error) throw error;
      response.status(200).json(users);
    });
  } else
    return response
      .status(403)
      .send({ success: false, message: "Unauthorized" });
};

api.signup = (User) => (request, response) => {
  if (!request.body.username || !request.body.password)
    response.json({
      success: false,
      message: "Please, pass a username and password.",
    });
  else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      clients: [],
    });
    newUser.save((error) => {
      if (error)
        return response
          .status(400)
          .json({ success: false, message: "Username already exists." });
      response.json({ success: true, message: "Account created successfully" });
    });
  }
};
module.exports = api;
