const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const authParentRouter = express.Router();

const ParentModel = require('../models/parentModel');

authParentRouter.post('/login', (req,res) => {
    const { username, password } = req.body;
    if(!username && !password){
        res.status(400).send({ success: 0, message: "Missing username or password"});
    } else {
        ParentModel.findOne({ username })
            .then(parentFound => {
                if(!parentFound) res.status(404).send({ success: 0, message: "No parent" })
                else {
                    const compare = bcrypt.compareSync(password, parentFound.hashPassword);
                    if(compare) {
                        req.session.parent = { username: parentFound.username, name: parentFound.fullname, parentId: parentFound._id };
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

