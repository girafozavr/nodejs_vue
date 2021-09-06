require("module-alias/register");

const http = require("http"),
  node_app = require("@node_app"),
  NodeAppServer = http.Server(node_app),
  NodeAppPort = process.env.PORT || 3001,
  LOCAL = "0.0.0.0";
NodeAppServer.listen(NodeAppPort, LOCAL, () =>
  console.log(`NodeApp running on ${NodeAppPort}`)
);
