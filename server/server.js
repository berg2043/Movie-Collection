const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('build'));

// Routes

// Start Server
app.listen(port, function () {
  console.log('Listening on port: ', port);
});