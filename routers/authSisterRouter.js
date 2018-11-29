const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const authSisterRouter = express.Router();

const SisterModel = require("../models/sisterModel");

authSisterRouter.post("/login", (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber && !password) {
    res
      .status(400)
      .send({ success: 0, message: "Missing phone number or password" });
  } else {
    SisterModel.findOne({ phoneNumber })
      .then((sisterFound) => {
        if (!sisterFound)
          res.status(404).send({ success: 0, message: "No sister" });
        else {
          const compare = bcrypt.compareSync(
            password,
            sisterFound.hashPassword
          );
          if (compare) {
            req.session.sister = {
              phoneNumber: sisterFound.phoneNumber,
              name: sisterFound.fullname,
              sisterId: sisterFound._id
            };
            res.send({
              success: 0,
              message: "Login success",
              sisterId: sisterFound._id
            });
          } else
            res.status(401).send({ success: 0, message: "Wrong password" });
        }
      })
      .catch((err) => res.status(500).send({ success: 0, err }));
  }
});

authSisterRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).send({ success: 0, err });
    else res.send({ success: 1, message: "Success !" });
  });
});

module.exports = authSisterRouter;
