var express = require("express");
var router = express.Router();

router.use("/", require("./login/login"));

router.use("/patient", require("./patient/index"));

router.use("/doctor", require("./doctor/index"));

module.exports = router;
