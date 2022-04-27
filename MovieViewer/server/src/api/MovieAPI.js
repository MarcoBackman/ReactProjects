let mongoose = require('mongoose');
let express = require("express");

let dbConfig = require("../config/dbConfig.json");
const MovieModel = require("../models/MovieModel");
const UserModel = require("../models/UserModel");
const GenreModel = require("../models/GenreModel");

let host = dbConfig.database.host;
let port = dbConfig.database.port;
let dbname = dbConfig.database.dbname;
let mongoDB = `mongodb://${host}:${port}/${dbname}`;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let router = express.Router();
let genres = {};

router.post('/getMovieByID', async (req, res) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    var query = { movieID: new ObjectId(req.body.movie) };
    console.log(req.body.movieID);
    let result = await MovieModel.findById(req.body.movie);
    console.log(result);
    res.json(result);
});

router.get('/getGenreTypes', async (req, res) => {
    let result = await GenreModel.find();
    res.json(result);
});

//Returns movie by genre sorted by rate descending order
router.post('/getMoviesByGenre', async (req, res) => {

    let genre_query = {"genres": req.body.genre };
    let sortByRateDescending = { 'rating' : -1};

    //Find genre value

    //Sort by rate first
    let result = await MovieModel.find(genre_query).sort(sortByRateDescending).limit(10);
    res.json(result);
});

module.exports = router;