//Checks if db contains all the contents in the local json file

const dataFile = require("../moviedata.json");
let mongoose = require('mongoose');
const fs = require('fs');

const MovieModel = require("../models/MovieModel");
const GenreModel = require("../models/GenreModel");

let dbConfig = require("./dbConfig.json"); //Get

let host = dbConfig.database.host;
let port = dbConfig.database.port;
let dbname = dbConfig.database.dbname;
let mongoDB = `mongodb://${host}:${port}/${dbname}`;

async function createMovieModel(singleMovie) {
    try {
        await MovieModel.create({
            title : singleMovie.title,
            year : singleMovie.year,
            directors : singleMovie.info.directors,
            rating : singleMovie.info.rating,
            genres : singleMovie.info.genres,
            image_url : singleMovie.info.image_url,
            running_time_secs : singleMovie.info.running_time_secs
        });
    } catch (err) {
        console.log(err);
    }
    console.log("Movie added:" + singleMovie.title);
}

async function updateOrCreateGenreModel(genreName) {

    try {
        await GenreModel.findOneAndUpdate({genre : genreName},  {$inc: {amount: 1}}, {upsert: true});
    } catch(err) {
        console.log(err);
    }
}

async function findMovieModel(singleMovie) {
    //Find if data object exists
    const res = await MovieModel.exists({
        title: singleMovie.title,
        year: singleMovie.year,
    });
    return res;
}

async function initializeMovieModel (singleMovie) {
    const res = await findMovieModel(singleMovie);

    //If local data does not exist in DB
    if (res == null) {
        await createMovieModel(singleMovie);
        //Set genre
        console.log(singleMovie.info.genres);

        //Genre may not be defined
        if (typeof singleMovie.info.genres === 'undefined') {
            return;
        }

        let genreList = singleMovie.info.genres;
        for (let i = 0; i < genreList.length; i++) {
            console.log("Updating genre: " + genreList[i]);
            await updateOrCreateGenreModel(genreList[i]);
        }
    }
}

//iterate the local data and compare with db model data
async function percolateMovieListData (data) {
    //Connect before accessing DB
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    data.map(async (singleMovie) => {
        await initializeMovieModel(singleMovie);
    });
}

async function synchronizeLocalFile() {
    console.log("Checking DB data");
    try {
        const dataFile = fs.readFileSync('./src/moviedata.json', 'utf8');
        let data = JSON.parse(dataFile);
        //Check DB data
        await percolateMovieListData(data);
        console.log("Done.");
    } catch (err) {
        console.error(err)
    }
}

module.exports = { synchronizeLocalFile };