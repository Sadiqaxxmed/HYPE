const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config(); 


const authRoute = require('./routes/auth')
const outfitsRoute = require('./routes/outfit');
const outfitPieceRoute = require('./routes/outfitpiece');
const reviewRoute = require('./routes/review');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Use the routes
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
