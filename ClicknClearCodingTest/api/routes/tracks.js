const express = require('express');
const fs = require('fs');
const router = express.Router();

const datapath = './api/data/tracks.json';

const list_tracks = [];
router.get('/', (req, res, next) => {
    fs.readFile(datapath, 'utf8', (err, data) =>{
        if(err){
            throw err;
        }

        const tracks = JSON.parse(data);
        for(let track of tracks.tracks)
            {
                
                list_tracks.push(track);
                
            }

        res.send(list_tracks);
    });
});

router.get('/:trackId', (req, res, next) => {
    const filteredtrack = [];
    fs.readFile(datapath, 'utf8', (err, data) =>{
        try{
            const id = req.params.trackId;
        const tracks = JSON.parse(data);
        for(let track of tracks.tracks)
        {
            if(track.id == id)
            {
                filteredtrack.push(track);
                res.send(filteredtrack);
                return;
            }
        }
        res.send('Track with that id Not available');
        }
        catch(err){
            throw err;
        }
        
    });    
});

router.get('/artist/:artist', (req, res, next) => {
    const list_artist = [];
    fs.readFile(datapath, 'utf8', (err, data) =>{
        try{
            const artist = req.params.artist;
            const tracks = JSON.parse(data);
            for(let track of tracks.tracks)
            {
                if(track.artist === artist && list_artist[artist] != artist)
                {
                    list_artist.push(track);
                }
            }
            if(list_artist.length != 0){
                res.send(list_artist);
                return;
            }
            res.send('Track with that Artist Not available');
        }
        catch(err){
            throw err;
        }
        
    });    
});

module.exports = router;