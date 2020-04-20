//Mongoose: A library to manage connections between mongo db and Node JS
const mongoose = require('mongoose');
// Config: A dependency for managing global variables
const config = require('config');
const db = config.get('mongoURI');

//Connecting to my database
const connectDB = async ()=> {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDB Connected...');
    } catch(error) {
        console.log(error.message)
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;