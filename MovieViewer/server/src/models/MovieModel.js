const mongoose = require('mongoose');

let movieDataSchema = new mongoose.Schema({
    title: String,
    year: Number,
    directors: [String],
    rating: Number,
    genres: Array,
    image_url: String,
    running_time_secs: Number
});

//Create Movie model based on movieData Schema
module.exports = mongoose.model('Movie', movieDataSchema); // export 1 module per file