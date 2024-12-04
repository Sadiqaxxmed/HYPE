const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const session = require('express-session');

require('./config/passport'); // Make sure to require the passport config
const passport = require('passport');
const cookieParser = require('cookie-parser');


const authRoute = require('./routes/auth')
const outfitsRoute = require('./routes/outfit');
const outfitPieceRoute = require('./routes/outfitpiece');
const reviewRoute = require('./routes/review');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


app.use(passport.initialize());
app.use(passport.session());


// Use the routes
app.use('/auth', authRoute)
app.use('/outfits', outfitsRoute);
app.use('/outfitPieces', outfitPieceRoute);
app.use('/reviews', reviewRoute);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
