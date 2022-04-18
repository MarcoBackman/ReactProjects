let createError = require('http-errors');
const express = require('express')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

//For user repice
let recipeAPIRouter = require("./routes/saveRecipe"); //Post
let getRecipeAPIRouter = require("./routes/readUserRecipe"); //Post

//For local recipe fetch
let populateDBRouter = require("./routes/populateDB"); //Post
let getPopulateDBRouter = require("./routes/readPopulatedRecipe"); //Posts

const app = express();
const port = 5000;

app.listen(port, () => console.log('Server ready on port:' + port))

/* GET React App */
/* GET React App */

app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use("/api/save_recipe",
    recipeAPIRouter);
app.use("/api/populate",
    populateDBRouter);
app.use("/api/getUserRecipe",
    getRecipeAPIRouter);
app.use("/api/getPopDBRecipe",
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
