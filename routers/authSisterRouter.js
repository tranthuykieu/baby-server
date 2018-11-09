const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const authSisterRouter = express.Router();

const SisterModel = require('../models/sisterModel');

authSisterRouter.post('/login', (req,res) => {
    const { username, password } = req.body;
    if(!username && !password){
        res.status(400).send({ success: 0, message: "Missing username or password"});
    } else {
        SisterModel.findOne({ username })
            .then(sisterFound => {
                if(!sisterFound) res.status(404).send({ success: 0, message: "No parent" })
                else {
                    const compare = bcrypt.compareSync(password, sisterFound.hashPassword);
                    if(compare){
                        req.session.sister = { username: sisterFound.username, name: sisterFound.fullname, sisterId: sisterFound._id };
                        res.send({ success: 0, message: "Login success"})
                    } 
                    else res.status(401).send({ success: 0, message: "Wrong password"});
                }
            })
            .catch( err => res.status(500).send({ success: 0, err }));
    }

});

authSisterRouter.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, message: "Success !" });
    });
});

module.exports = authSisterRouter;



