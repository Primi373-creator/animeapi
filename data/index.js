
var fs = require('fs');
var mongoose = require('mongoose');

var connectionString = process.env.CONNECTION_STRING || 'mongodb+srv://api:api@api.pldyojn.mongodb.net/?retryWrites=true&w=majority&appName=api';
mongoose.connect(connectionString);
var Anime = require('../lib/models/anime');

var folder = './animes';
var files = fs.readdirSync(folder);

function save_handler(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('OK! ' + count++);
    }
}

var count = 0;
for(var f in files){
    var file = files[f];
    var json = require(folder + '/' + file);
    var anime = new Anime(json);
    console.log(anime.title);
    anime.save(save_handler);
}
