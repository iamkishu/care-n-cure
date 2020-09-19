const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig");
const db = require("../../helpers/db");

router.post("/login", function (req, res) {
  login(req, res);
});

router.post("/register", function (req, res) {
  register(req, res);
});

router.post("/logout", function (req, res) {
  logout(req, res);
});

module.exports = router;

async function login(req, res) {
  if (
    req.body.userName === "" ||
    req.body.userName === undefined ||
    req.body.password === "" ||
    req.body.password === undefined
  ) {
    return res.status(200).send({
      Error: "Mandotory Fields are missing",
    });
  }

  let userId = req.body.userName;
  let sqlStatement = `select * from users where email =  '${userId}' or userName = '${userId}'`;

  try {
    if (!db.pool.connected && !db.pool.connecting) {
      await db.pool.connect();
    }

    let result = await db.pool.request().query(sqlStatement);

    if (result.recordset.length === 0) {
      return res.json(401, {
        auth: false,
        token: null,
        message: "User not found",
      });
    } else {
      let user = result.recordset[0];

      if (req.body.password === user.password) {
        var token = jwt.sign(
          {
            id: userId,
          },
          jwtConfig.secret,
          {
            expiresIn: jwtConfig.validTill,
          }
        );

        sqlStatement = `insert into userStatus select email,'Online','',''from users where email =  '${userId}' or userName = '${userId}'`;
        await db.pool.request().query(sqlStatement);

        return res.json(200, {
          auth: true,
          token: token,
          message: "Valid User",
          user: {
            userName: user.userName,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        return res.json(401, {
          auth: false,
          token: null,
          message: "Wrong Password",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      err: err,
    });
  }
}

async function register(req, res) {
  if (
    req.body.userName === "" ||
    req.body.userName === undefined ||
    req.body.password === "" ||
    req.body.password === undefined ||
    req.body.email === "" ||
    req.body.email === undefined ||
    req.body.phoneNumber === "" ||
    req.body.phoneNumber === undefined ||
    req.body.role === "" ||
    req.body.role === undefined
  ) {
    return res.status(200).send({
      Error: "Mandotory Fields are missing",
    });
  }
  let sqlStatement = `insert into users values ('${req.body.userName}',
                                                '${req.body.email}',
                                                '${req.body.password}',
                                                '${req.body.phoneNumber}',
                                                '${req.body.role}')`;
  db.doSQL(sqlStatement, req, res);
}

async function logout(req, res) {
  if (req.body.email === "" || req.body.email === undefined) {
    return res.status(200).send({
      Error: "Mandotory Fields are missing",
    });
  }
  let sqlStatement = `delete from userStatus where email = '${req.body.email}'`;
  db.doSQL(sqlStatement, req, res);
}
