const ethAirBalloons = require("ethairballoons");
var express = require("express");
var path = require("path");
var routes = require("./routes");
const db = require("./connection");
const bodyParser = require("body-parser");
var abiDecoder = require("abi-decoder");
const Web3 = require("web3");
const savePath = path.resolve(__dirname + "/contracts");
const ethAirBalloonsProvider = ethAirBalloons("http://localhost:7545", savePath);
const Diplome = ethAirBalloonsProvider.createSchema({
  name: "Diplome",
  contractName: "diplomeContract",
  properties: [
    {
      name: "name",
      type: "bytes32",
      primaryKey: true,
    },
    {
      name: "jmbg",
      type: "bytes32",
    },
    { name: "city", type: "bytes32" },
  ],
});
var app = express();

app.set("port", process.env.PORT || 3000);
// app.set("views",path.join(__dirname,"views"));
// app.set("view engine", "html");

app.use(routes);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

app.get("/registration", (req, resp) => {
  let htmlPage = path.join(__dirname, "./views/registration.html");
  resp.sendFile(htmlPage);
});

async function getTrans() {
  let data = await web3.eth.getTransaction("0x7e108dec864ca8c2889c8d18853cc5c1107eabb437850da6996a0cc027123ef7");
  let input = data.input;
  console.log(input);
}

app.get("/home", (req, resp) => {
  let htmlPage = path.join(__dirname, "./views/home.html");
  resp.sendFile(htmlPage);
});

app.get("/admin", (req, resp) => {
  let htmlPage = path.join(__dirname, "./views/admin.html");
  resp.sendFile(htmlPage);
});

app.get("/verifier", (req, resp) => {
  let htmlPage = path.join(__dirname, "./views/verifier.html");
  resp.sendFile(htmlPage);
});

app.get("/myDiplome", (req, resp) => {
  let htmlPage = path.join(__dirname, "./views/myDiplome.html");
  resp.sendFile(htmlPage);
});

app.get("/verifiedDiplome", (req, resp) => {
  let htmlPage = path.join(__dirname, "./views/verifiedDiplome.html");
  resp.sendFile(htmlPage);
});

app.get("/users", db.getUsers);

app.post("/registrationData", db.registrationData);
app.post("/loginMethod", db.loginMethod);
app.post("/createDiplomaRequest", db.createDiplomaRequest);
app.post("/verifyRequest", db.verifyRequest);
app.get("/selectAllRequests", db.selectAllRequests);
app.get("/selectAllVerificationRequests", db.selectAllVerificationRequests);
app.post("/saveStudentDiploma", db.saveStudentDiploma);
app.post("/getDiploma", db.getDiploma);
app.post("/selectUserRequest", db.selectUserRequest);
app.post("/selectVerifiedDiplome", db.selectVerifiedDiplome);
app.post("/retrieveAllDiplomes", db.retrieveAllDiplomes);
app.post("/createVerification", db.createVerification);
app.post("/createVerificationHash", db.createVerificationHash);

app.get("/deploy", (req, res) => {
  Diplome.deploy(function (err, success) {
    if (!err) {
      res.send("Contract deployed successfully!");
    } else {
      res.send("Contract deployment error" + err);
    }
  });
});

app.post("/create", (req, res) => {
  const newCarObject = req.body;
  console.log(newCarObject);
  Diplome.save(newCarObject, function (err, objectSaved) {
    if (!err) {
      res.json(objectSaved);
    } else {
      res.send(err);
    }
  });
});

app.patch("/update/:id", (req, res) => {
  const newCarObject = req.body;
  Diplome.updateById(req.params.id, newCarObject, function (err, objectSaved) {
    if (!err) {
      res.json(objectSaved);
    } else {
      res.send(err);
    }
  });
});

app.get("/find", (req, res) => {
  Diplome.find(function (err, allObjects) {
    if (!err) {
      res.json(allObjects);
    } else {
      res.send(err);
    }
  });
});

app.get("/find/:id", (req, res) => {
  Diplome.findById(req.params.id, function (err, found) {
    if (!err) {
      res.json(found);
    } else {
      res.send(err);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  Diplome.deleteById(req.params.id, function (err, found) {
    if (!err) {
      res.json({ message: "Object deleted successfully" });
    } else {
      res.send(err);
    }
  });
});

app.listen(app.get("port"), function () {
  console.log("Server started on port 3000");
});
