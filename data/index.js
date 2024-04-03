const fs = require('fs');
const mongoose = require('mongoose');
const Anime = require('../lib/models/anime');

const connectionString = process.env.CONNECTION_STRING || 'mongodb+srv://api:api@api.pldyojn.mongodb.net/?retryWrites=true&w=majority&appName=api';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const folder = './animes';

fs.readdir(folder, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    let count = 0;
    files.forEach(file => {
        fs.readFile(`${folder}/${file}`, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            const animeData = JSON.parse(data);
            const anime = new Anime(animeData);
            console.log(anime.title);
            anime.save(err => {
                if (err) {
                    console.error('Error saving anime:', err);
                    return;
                }
                console.log(`Saved anime: ${anime.title}`);
                count++;
                if (count === files.length) {
                    console.log('All animes saved successfully.');
                    mongoose.disconnect();
                }
            });
        });
    });
});
