const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./db.js');

connectDB();

app.use(express.json());

const server = app.listen(PORT, () =>
	console.log(`Server is running on PORT ${PORT}`),
);

process.on('unhandledRejection', (err) => {
	console.error(err.message);
	server.close(() => process.exit(1));
});
