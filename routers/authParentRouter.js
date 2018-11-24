const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const authParentRouter = express.Router();

const ParentModel = require('../models/parentModel');

authParentRouter.post('/login', (req,res) => {
    const { phoneNumber, password } = req.body;
    if(!phoneNumber && !password){
        res.status(400).send({ success: 0, message: "Missing phone number or password"});
    } else {
        ParentModel.findOne({ phoneNumber })
            .then(parentFound => {
                if(!parentFound) res.status(404).send({ success: 0, message: "No parent" })
                else {
                    const compare = bcrypt.compareSync(password, parentFound.hashPassword);
                    if(compare) {
                        req.session.parent = { phoneNumber: parentFound.phoneNumber, name: parentFound.fullname, parentId: parentFound._id };
                        res.send({ success: 0, message: "Login success"});
                    }
                    else res.status(401).send({ success: 0, message: "Wrong password"});
                }
            })
            .catch( err => res.status(500).send({ success: 0, err }));
    }
});

authParentRouter.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, message: "Success !" });
    });
});


module.exports = authParentRouter;

