const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
let Tokens = require('csrf');

//local config file import
let serverConfig = require("./config/serverConfig.json"); //Get

//Routers
//For user credentials
let userRouter = require("./api/UserAPI");
let movieRouter = require("./api/MovieAPI");
let credentialRouter = require("./api/Credentials");

//Express setup
const app = express();
const host = serverConfig.server.host;
const port = serverConfig.server.port;

//Listen requests
app.listen(port, () => console.log('Server ready on port:' + port));


//Check database data with the local file
let synchronizeData = require('./config/DataConfiguration');
const mongoose = require("mongoose");
const checkDatabase = async () => {
    await synchronizeData.synchronizeLocalFile();
}
checkDatabase();

const path = require('path')
const buildPath = path.normalize(path.join(__dirname, '../baekflix/build/'));

app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(buildPath));

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser("secret"));

//Session depended on cookie
app.use(session({
    secret: '379heghkhk0088bh', //secret key
}));

//Generate and set secret token
let csrf = new Tokens();
csrf.secret(function (err, secret) {
    if (err) throw err
// do something with the secret
});

console.log(buildPath);

app.use('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/credential", credentialRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
