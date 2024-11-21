var fs = require("fs");

export function filehandler(filename: any, successFn: any, errorFn: any) {
  fs.readFile(filename, function (err: NodeJS.ErrnoException, data: Buffer) {
    if (err) {
      errorFn(err);
    } else {
      successFn(data);
    }
  });
}
