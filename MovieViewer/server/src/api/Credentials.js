/*
    This file handles cookies, session and page permissions
 */

let mongoose = require('mongoose');
let dbConfig = require("../config/dbConfig.json");

let host = dbConfig.database.host;
let port = dbConfig.database.port;
let dbname = dbConfig.database.dbname;
let mongoDB = `mongodb://${host}:${port}/${dbname}`;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let express = require("express");
let router = express.Router();

//Setup cookie -> client side
router.post('/cookieSetup', async (req, res) => {

    //Cookie options
    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }

    //Set cookie
    res.cookie('username', req.body.user, options);
    res.send('');

    //Get cookie info
    console.log('Cookies: ', req.cookies.username);

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);
});

router.get('/getCookie', async (req, res) => {
    //Get cookie info
    console.log('Cookies: ', req.cookies.username);
});


//Setup session based on the cookie -> serverside only

// This section will help you create a new document.
module.exports = router;