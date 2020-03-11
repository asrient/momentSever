/**
 * @ASRIENT
 * created on 20,April 2019.
 * #DEFINES 
 * Schema & Model for users collection of the db.
 * Schema & Model for pods collection of the db.
 */
var mongoose = require('mongoose');

let user = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    created_on: Number,
    google_photos: {
        access_token: String,
        refresh_token: String,
        expiry_date: Number
    }
})


var users = mongoose.model('users', user);





let pod = new mongoose.Schema({
    code: String,
    name: String,
    about: String,
    host: String,
    art: String,
    next_refresh: Number,
    track_length: Number,
    now_playing: String,
    started_on: Number,
    songs: [{
        isrc: String,
        added_on: Number,
        votes: Number
    }]
});

var pods = mongoose.model('pods', pod);




let song = new mongoose.Schema({
    isrc: String,
    spotifyId: String,
    appleMusicId: String,
    streams_count: Number,
    title: String,
    artists: String,
    length: Number,
    modified_on: Number,
    added_on: Number
});

var songs = mongoose.model('songs', song);


let visit = new mongoose.Schema({
    page: String,
    source: Object,
    time: Number,
    ip: String,
    user: String
});

let txt = new mongoose.Schema({
    txt: String,
    source: Object,
    time: Number,
    ip: String
});

var visits = mongoose.model('visits', visit);

var txts = mongoose.model('txt', txt);



module.exports = { users: users, pods: pods, songs: songs, visits, txts };