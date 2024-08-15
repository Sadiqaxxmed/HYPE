const express = require('express');
const mongoose = require('mongoose');
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
mongoose.connect('mongodb+srv://offsznahmed:Offszn25!@cluster0.rz5qp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
