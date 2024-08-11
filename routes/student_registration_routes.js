const Studentrouter = require('express').Router();
const{  GuestRegistration}=require("../controller/student_registration_controller");


Studentrouter.post("/guestregister",GuestRegistration);


module.exports= Studentrouter;