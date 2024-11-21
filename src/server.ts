import * as http from "http";
import * as url from "url";
import { filehandler } from "./filehandler";

const config = require("../config");
export const server = http.createServer();

server.on("request", onRequest);

function onRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage }
): void {
  var filename = url.parse(String(req.url)).pathname,
    fullPath,
    extension: string;

  if (filename === "/") {
    filename = config.defaultIndex;
  }

  fullPath = config.rootFolder + filename;
  extension = String(filename?.substring(filename.lastIndexOf(".") + 1));

  filehandler(
    fullPath,
    function (data: any) {
      res.writeHead(200, {
        "Content-Type": config.types[extension] || "text/plain",
        "Content-Length": data.length,
      });
      res.end(data);
    },
    function (err: any) {
      res.writeHead(404);
      res.end();
    }
  );
}
