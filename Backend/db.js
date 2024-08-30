const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://bhaveshgadekar27:Bhavesh27@cluster0.kbnzj.mongodb.net/';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Successfully!!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectToMongo;
