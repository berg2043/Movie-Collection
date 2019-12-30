const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const movies = require('./routes/movies')

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('build'));

// Routes
app.use('/api/movies', movies)

// Start Server
app.listen(port, function () {
  console.log('Listening on port: ', port);
});