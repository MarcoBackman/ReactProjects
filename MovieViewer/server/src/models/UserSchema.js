const mongoose = require('mongoose');
const { Schema } = mongoose;

let userSchema = new Schema(
    {
        id: String,
        password: String,
        session: Boolean,
        favoriteList: Map,
        recentWatchList: Array,
    });

function getModel() {
        let user = mongoose.model("userModel", userSchema);
        return user;
}