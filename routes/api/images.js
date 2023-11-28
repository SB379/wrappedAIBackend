const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

const { OpenAI } = require("openai");

const openai = new OpenAI({
    //hide all this in an ENV file before deploy
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});


router.get("/test", (req, res) => {
    res.send("images route testing")
})

router.get("/trackGenerate", (req, res) => {

    //come back to this to use proper access token, also need to check DB for num of generations left
    //need to handle if Dall E fails due to restrictions

    const authorizationHeader = req.headers.authorization || null;
  
    if (!authorizationHeader) {
      console.error('Access token is missing.');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    var providerToken = req.headers.provider;
    providerToken = providerToken.split(' ')[1];

    const topTracksUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5&offset=0';

    const config = {
        headers: {
            'Authorization': `Bearer ${providerToken}`,
        },
    };

    var tracks = null

    axios.get(topTracksUrl, config)
        .then(async response => {
            tracks = response.data.items
            const songs = [tracks[0].name, tracks[1].name, tracks[2].name, tracks[3].name, tracks[4].name];
            const artists = [tracks[0].artists[0].name, tracks[1].artists[0].name, tracks[2].artists[0].name, tracks[3].artists[0].name, tracks[4].artists[0].name];
            
            // const image = await generateImage(songs);
            // console.log(image.url);

            const toFront = 
            {
                "songs": songs,
                "artists": artists,
                // "image_response": image,

            }

            res.status(200).json(toFront);
            console.log("succeeded");
            // console.log(`User\'s Top Tracks: `, response.data.items)
        })
        .catch(error => {
            console.error('Error getting top tracks: ', error)
        })
})

async function generateImage(songs)
{

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Given this list of Songs from Spotify, ${songs}, generate me an image that captures the essence of these songs.`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
    })

    return response.data;
}

module.exports = router;
