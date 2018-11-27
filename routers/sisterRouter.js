const multer = require("multer");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");

const sisterRouter = express.Router();

const SisterModel = require("../models/sisterModel");

// get storage for file
const storage = multer.diskStorage({
  destination: "./uploadFile",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// upload file
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

//show all sister: GET -> /api/sister
sisterRouter.get("/", (req, res) => {
  SisterModel.find({}, (err, sisters) => {
    if (err) res.status(500).send({ success: 0, err });
    else res.send({ success: 1, sisters });
  });
});

// receive image
sisterRouter.post("/upload", upload.single("myAvatar"), function(req, res) {
  console.log("Request file ---", req.file); // get file here
  console.log("Upload image successfully!");
});

// Create new: POST
sisterRouter.post("/", (req, res) => {
  const {
    phoneNumber,
    password,
    fullname,
    avatar,
    sex,
    age,
    address,
    district,
    city,
    email,
    note,
    comment
  } = req.body;

  const hashAvatar = "localhost:1998/" + avatar;
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);

  SisterModel.create(
    {
      phoneNumber,
      hashPassword,
      fullname,
      hashAvatar,
      sex,
      age,
      address,
      district,
      city,
      email,
      note,
      comment
    },
    (err, sisterCreated) => {
      if (err) res.status(500).send({ success: 0, err });
      else res.status(201).send({ success: 1, sisterCreated });
    }
  );
  console.log("Register successfully!");
});

// update by id
sisterRouter.put("/:sisterId", async (req, res) => {
  const {
    fullname,
    password,
    sex,
    age,
    avatar,
    address,
    district,
    city,
    email,
    note,
    comment
  } = req.body;

  const updateInfo = {
    fullname,
    password,
    sex,
    age,
    avatar,
    address,
    district,
    city,
    email,
    note,
    comment
  };

  try {
    let sisterFound = await SisterModel.findById(req.params.sisterId).exec();
    if (!sisterFound)
      res.status(404).send({ success: 0, message: "Sister not exist" });
    else {
      for (let key in updateInfo) {
        if (key == "password" && updateInfo[key]) {
          let compare = bcrypt.compareSync(
            updateInfo.password,
            sisterFound.hashPassword
          );
          if (!compare) {
            sisterFound.hashPassword = bcrypt.hashSync(
              updateInfo.password,
              bcrypt.genSaltSync()
            );
          }
        } else if (updateInfo[key]) {
          sisterFound[key] = updateInfo[key];
        }
      }
      const sisterUpdated = await sisterFound.save();
      res.send({ success: 1, sisterUpdated });
    }
  } catch (error) {
    res.status(500).send({ success: 0, err });
  }
});

// delete by id
sisterRouter.delete("/:sisterId", (req, res) => {
  SisterModel.findByIdAndRemove(req.params.sisterId, (err, sisterDeleted) => {
    if (err) res.statu(500).send({ success: 0, err });
    else if (!sisterDeleted)
      res.status(404).send({ success: 0, message: "Sister not exist !" });
    else res.send({ success: 1, message: "Delete success !" });
  });
});

//get one by id
sisterRouter.get("/:sisterId", (req, res) => {
  SisterModel.findById(req.params.sisterId)
    .populate("comment.parent", "fullname avatarUrl")
    .exec((err, sisterFound) => {
      if (err) res.status(500).send({ success: 0, err });
      else if (!sisterFound)
        res.status(404).send({ success: 0, message: "Sister not found." });
      else res.send({ success: 1, sisterFound });
    });
});

module.exports = sisterRouter;
