const express = require('express');
const connectDB = require('./config/db'); //after adding db.js
const app = express();

connectDB(); 

//Init Middleware (<- api/users.js)
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));