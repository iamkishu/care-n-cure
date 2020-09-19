const express = require("express");
const router = express.Router();
const db = require("../../helpers/db");
const { v4: uuidV4 } = require("uuid");

router.get("/doctorList", function (req, res) {
  doctorList(req, res);
});

router.post("/bookDoctor", function (req, res) {
  bookDoctor(req, res);
});

router.post("/vitals", function (req, res) {
  vitals(req, res);
});

router.post("/chatId", function (req, res) {
  chatId(req, res);
});

router.post("/dairy", function (req, res) {
  dairy(req, res);
});

router.get("/dairyList", function (req, res) {
  dairyList(req, res);
});

router.get("/prescription", function (req, res) {
  prescription(req, res);
});

module.exports = router;

async function doctorList(req, res) {
  let sqlstatement = `select u.userName, u.email, u.phoneNumber 
                        from userStatus us, users u 
                        where u.email = us.email 
                        and u.role= 'Doctor'
                        and us.status= 'Online'
                        group by u.userName, u.email, u.phoneNumber `;
  db.doSQL(sqlstatement, req, res);
}

async function bookDoctor(req, res) {
  let sqlstatement = `update userStatus 
                        set status = 'Booked', 
                            bookedto = '${req.body.patientEmail}' 
                            where email = '${req.body.doctorEmail}'`;
  db.doSQL(sqlstatement, req, res);
}

async function vitals(req, res) {
  if (
    req.body.patientEmail === "" ||
    req.body.patientEmail === undefined ||
    req.body.temperature === "" ||
    req.body.temperature === undefined ||
    req.body.bp === "" ||
    req.body.bp === undefined ||
    req.body.oxy === "" ||
    req.body.oxy === undefined ||
    req.body.heartbpm === "" ||
    req.body.heartbpm === undefined
  ) {
    return res.status(200).send({
      Error: "Mandotory Fields are missing",
    });
  }
  let sqlstatement = `insert into patientVitals values
                        (
                            '${req.body.patientEmail}',
                            getDate(),
                            '${req.body.temperature}',
                            '${req.body.bp}',
                            '${req.body.oxy}',
                            '${req.body.heartbpm}'
                        )`;
  db.doSQL(sqlstatement, req, res);
}

async function chatId(req, res) {
  let chatId = uuidV4();
  let sqlstatement = `update userStatus set chatId = '${chatId}' where email = '${req.body.doctorEmail}'`;
  try {
    if (!db.pool.connected && !db.pool.connecting) {
      await db.pool.connect();
    }
    let result = await db.pool.request().query(sqlstatement);
    return res.json({ chatId: chatId });
  } catch (err) {
    return res.json(500, { err: err });
  }
}

async function dairy(req, res) {
  let sqlstatement = `insert into dairy values ('${req.body.patientEmail}','${req.body.activity}',getDate())`;
  db.doSQL(sqlstatement, req, res);
}

async function dairyList(req, res) {
  let sqlstatement = `select * from dairy  where email = '${req.query.patientEmail}' order by uploadedat desc`;
  db.doSQL(sqlstatement, req, res);
}

async function prescription(req, res) {
  let sqlstatement = `select * from prescription  where email = '${req.query.patientEmail}'`;
  db.doSQL(sqlstatement, req, res);
}

