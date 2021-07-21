const express = require('express');
//const connectDB = require('./config/db'); //after adding db.js
const app = express();

//Connect Database
//connectDB(); //after adding db.js

//get request and send message to browser
app.get('/', (req, res) => res.send('API Running'));

//look for environment 
const PORT = process.env.PORT || 5000

//receive the port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));