const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTOKEN;

exports.adminAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err || decodedToken.role !== 'admin') {
				return res.status(401).json({
					message: 'Not authorized.',
				});
			} else {
				next();
			}
		});
	} else {
		return res.status(401).json({
			message: 'Not authorized, token not available',
		});
	}
};

exports.userAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err || decodedToken.role !== 'Basic') {
				return res.status(401).json({
					message: 'Not authorized.',
				});
			} else {
				next();
			}
		});
	} else {
		return res.status(401).json({
			message: 'Not authorized, token not available',
		});
	}
};
