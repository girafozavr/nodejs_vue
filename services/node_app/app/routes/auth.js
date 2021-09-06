const models = require("@NodeApp/app/setup");
module.exports = (app) => {
  const api = app.node_app.app.api.auth;
  app.route("/").get((req, res) => res.send("Node App API"));
  app.route("/api/v1/auth").post(api.login(models.User));
};
