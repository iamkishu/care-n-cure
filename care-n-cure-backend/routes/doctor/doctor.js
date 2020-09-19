const express = require("express");
const router = express.Router();
const db = require("../../helpers/db");

router.get("/patientDet", function (req, res) {
  patientDet(req, res);
});

router.get("/patientVitals", function (req, res) {
  patientVitals(req, res);
});

router.post("/prescribe", function (req, res) {
  prescribe(req, res);
});

router.post("/endChat", function (req, res) {
  endChat(req, res);
});

module.exports = router;

async function patientDet(req, res) {
  let sqlStatement = `select 
    u.userName as 'patientName', 
    us.bookedto as 'patientEmail',
    us.chatId as 'chatId' 
    from userStatus us, users u 
    where us.bookedto = u.email 
    and us.email = '${req.query.doctorEmail}' `;
  db.doSQL(sqlStatement, req, res);
}

async function patientVitals(req, res) {
  let sqlStatement = `select * from patientVitals where email = '${req.query.patientEmail}' 
                      --and updatedat = getDate()`;
  db.doSQL(sqlStatement, req, res);
}

async function prescribe(req, res) {
  let sqlStatement = `insert into prescription values('${req.body.patientEmail}','${req.body.prescription}', getDate())`;
  db.doSQL(sqlStatement, req, res);
}

async function endChat(req, res) {
  let q = [];
  let sqlStatement = `update userStatus set status = 'Online', chatId = '', bookedto = '' where email = '${req.body.doctorEmail}'`;
  q.push(sqlStatement);
  sqlStatement = `delete from patientVitals where email = '${req.body.doctorEmail}'`;
  q.push(sqlStatement);
  db.doTransaction(q, req, res);
}
