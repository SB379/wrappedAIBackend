const express = require('express');
const router = express.Router();

require('dotenv').config();
const { response } = require('express');
const axios = require('axios');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

router.get('/test', (req,res) => res.send('auth route testing'));

router.get('/signInWithSpotify', async (req, res) => {
    try {
        // //Redirect the user to Supabase for Spotify auth
        // res.redirect(302, supabase.auth.signIn({
        //     provider: 'spotify',
        // }));
    } catch (error) {
        console.log("Error initiating Spotify authentication: ", error);
        res.status(500).json({success: false, error: "Internal Server Error"})
    }
});

// Supabase callback endpoint
router.get('/callback', async (req, res) => {
    
});

router.get('/access', async (req, res) => {
    const authorizationHeader = req.headers.authorization || null;
  
    if (!authorizationHeader) {
      console.error('Access token is missing.');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const accessToken = authorizationHeader.split(' ')[1];

    console.log(accessToken);



})

module.exports = router;