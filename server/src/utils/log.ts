import * as fs from "fs";

export function log(message: string) {
  fs.appendFileSync(
    "E:/Code/VsCode Extensions/aottg-custom-logic/logs.txt",
    `${message}\n`
  );
}
