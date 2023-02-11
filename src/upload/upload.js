import fs from "fs"
import path from "path"
function read(fileName) {
  const person = fs.readFileSync(
    path.resolve("src/base", fileName + ".json"),
    "utf-8"
  );
  return JSON.parse(person);
}
function write(fileName, data) {
  const person = fs.writeFileSync(
    path.resolve("src/base", fileName + ".json"),JSON.stringify(data, null, 4))
  return true;
}
export {
write,
  read
}