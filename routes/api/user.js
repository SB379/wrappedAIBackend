require('dotenv').config();
const { response } = require('express');
const axios = require('axios');
const router = require('./auth');

router.get('/test', (req,res) => res.send('user route testing'));

router.get('/userData', async (req, res) => {
    try {
      const authorizationHeader = req.headers.authorization;
  
      if (!authorizationHeader) {
        console.error('Access token is missing.');
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
  
      const accessToken = authorizationHeader.split(' ')[1];

      console.log(accessToken);
  
      // Make a request to the Spotify Web API to get the user's profile
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      const userData = response.data;
      console.log("succeeded");
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user data from Spotify:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/invalid', (req, res) => {console.log('invalid access token or missing')});

module.exports = router;