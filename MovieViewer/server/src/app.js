let createError = require('http-errors');
const express = require('express')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//Models
import UserSchema from './models/UserSchema';
import MovieSchema from './models/MovieSchema';

const app = express();
const port = 5000;

app.listen(port, () => console.log('Server ready on port:' + port))

/* GET React App */

app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use("/api/credential",
    recipeAPIRouter);
app.use("/api/",
    populateDBRouter);
app.use("/api/",
    getRecipeAPIRouter);
app.use("/api/",
    getPopulateDBRouter);

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
