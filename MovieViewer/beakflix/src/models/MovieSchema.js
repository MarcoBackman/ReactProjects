const mongoose = require('mongoose');
const { Schema } = mongoose;

let movieDataSchema = new Schema({
    title: String,
    year: Number,
    directors: String,
    rating: Number,
    genres: Array,
    image_url: String,
    running_time_secs: Number
    });

function getModel() {
    let movie = mongoose.model("movieModel", movieDataSchema);
    return movie;
}