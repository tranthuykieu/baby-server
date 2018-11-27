const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session"); // 1 midleware
const cors = require("cors");

const apiRouter = require("./routers/apiRouter");

const port = 1998;

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "babyserer",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, httpOnly: false } //deploy-secure: true
  })
);

app.use("/api", apiRouter);
app.use(express.static("./uploadFile"));

mongoose.connect(
  "mongodb://localhost/baby-service",
  { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log("DB connect success !!");
  }
);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is listening at ${port}`);
});
