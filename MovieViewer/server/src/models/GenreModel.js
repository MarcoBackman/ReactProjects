const mongoose = require('mongoose');

let genreSchema = new mongoose.Schema({
    genre: String,
    amount: {
        type:Number,
        default:0
    }
});

//Create Movie model based on movieData Schema
module.exports = mongoose.model('Genre', genreSchema); // export 1 module per file