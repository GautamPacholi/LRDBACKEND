const Classrouter = require("express").Router();
const {
  addClass,
  getClass,
} = require("../controller/class_controller.js");

Classrouter.post("/addClass", addClass);
Classrouter.get("/getClass", getClass);
module.exports = Classrouter;
