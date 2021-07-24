const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //from config file get database url 

//connect to db function
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        }); //returns a promise, and await

        console.log('MongoDB Connected')
    } catch (err) {
        console.log(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;