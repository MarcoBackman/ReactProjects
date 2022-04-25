let mongoose = require('mongoose');
let express = require("express");

let dbConfig = require("../config/dbConfig.json");
const UserModel = require("../models/UserModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");


let host = dbConfig.database.host;
let port = dbConfig.database.port;
let dbname = dbConfig.database.dbname;
let mongoDB = `mongodb://${host}:${port}/${dbname}`;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let router = express.Router();

//Login
router.post('/login', async (req, res) => {
    //There can be only one unique id
    let user = await UserModel.findOne({
        id: req.body.id,
    });

    if (user == null) {
        res.json(false);
    } else { //Match Password
        console.log(user.hash);
        let password_result = user.validPassword(req.body.pw);
        if (password_result) {
            res.json(true);
        } else {
            res.json(false);
        }
    }
});

//Register
router.post('/register', async (req, res) => {
    console.log("Register request: " + req.body.id);

    //See if ID exist
    let result = await UserModel.exists({
        id: req.body.id,
    });

    //response false if ID exists
    if (result !== null) {
        console.log("ID exists");
        res.json(false);
        return;
    }

    //Create new model
    let userModel = new UserModel({
        id: req.body.id,
        email: req.body.email
    });

    userModel.setPassword(req.body.pw);
    userModel.save(function (err) {
        if (err) return console.error(err);
        console.log("registered user: " + req.body.id);
    });


    res.json(true);
});

module.exports = router;