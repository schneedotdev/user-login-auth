const Mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
	await Mongoose.connect(process.env.RemoteDB).then((client) => {
		console.log('MongoDB connection successful');
	});
};

module.exports = connectDB;
