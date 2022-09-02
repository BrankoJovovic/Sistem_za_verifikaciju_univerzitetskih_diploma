var express = require("express");
let path = require("path");
const fs = require("fs");

var router = express.Router();

router.get("/", function (req, res) {
  let htmlPage = path.join(__dirname, "./views/index.html");
  res.sendFile(htmlPage);
});

router.get("/readFile", function (req, res) {
  let filePath = "./data.json";
  if (!fs.existsSync(filePath)) return "";
  let data = fs.readFileSync(filePath, { encoding: "utf8" });
  res.end(data);
});
router.get("/writeFile", (req, res) => {
  let filePath = "./data.json";
  let id = 1;
  if (!fs.existsSync(filePath)) return "";
  let data = fs.readFileSync(filePath, { encoding: "utf8" });
  let jsonObject = JSON.parse(data.toString());
  for (let i = 0; i < jsonObject.length; i++) {
    if (jsonObject[i].id > id) {
      id = jsonObject[i].id;
    }
  }
  id += 1;
  let stateObject = { id: id, firstName: req.query.firstName, lastName: req.query.lastName, street: req.query.street, city: req.query.street };
  jsonObject.push(stateObject);
  fs.writeFileSync(filePath, JSON.stringify(jsonObject));
  res.end("true");
});

router.get("/deleteRecord", function (req, res) {
  let filePath = "./data.json";
  let id = parseInt(req.query.id);
  if (!fs.existsSync(filePath)) return "";
  let data = fs.readFileSync(filePath, { encoding: "utf8" });
  let jsonObject = JSON.parse(data.toString());
  for (let i = 0; i < jsonObject.length; i++) {
    if (jsonObject[i].id === id) {
      jsonObject.splice(i, 1);
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(jsonObject));
  res.end("true");
});
module.exports = router;
