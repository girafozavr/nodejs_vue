const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  config = require("@config");

const api = {};

api.login = (User) => (request, response) => {
  User.findOne({ username: request.body.username }, (error, user) => {
    if (error) throw error;

    if (!user)
      response.status(401).send({
        success: false,
        message: "Authentication failed. User not found.",
      });
    else {
      user.comparePassword(request.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ user }, config.secret);
          response.json({ success: true, message: "Token granted", token });
        } else {
          response.status(401).send({
            success: false,
            message: "Authentication failed. Wrong password.",
          });
        }
      });
    }
  });
};

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(" ");
    if (split.length === 2) return split[1];
    else return null;
  } else return null;
};

module.exports = api;
