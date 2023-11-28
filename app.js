const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const auth = require("./routes/api/auth");
const user = require("./routes/api/user");
const images = require("./routes/api/images");

const app = express();

dotenv.config();

app.use(cookieParser());

app.use(cors({origin: true, credentials: true}));

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/images', images)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on ${port}`));