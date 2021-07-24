const express = require('express');
const connectDB = require('./config/db'); //after adding db.js
const app = express();

//Connect Database
connectDB(); //after adding db.js

//Init Middleware (<- api/users.js) console.log(req.body);
app.use(express.json({ extended: false}));

//get request and send message to browser
//app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
//users.js ---> router.get('/', (req, res) => res.send('User route'));
//router.get('/' ==== './api/users')
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));



//look for environment 
const PORT = process.env.PORT || 5000;

//receive the port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));