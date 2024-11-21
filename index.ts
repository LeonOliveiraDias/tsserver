process.title = "MyWebServer";
const args = process.argv,
  port = args[2] || 7070,
  webServer = require("./src/server");

webServer.server.listen(port, function () {
  console.log("Server started at port " + port);
});
