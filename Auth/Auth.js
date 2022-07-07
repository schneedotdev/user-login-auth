const User = require('../User');

exports.register = async (req, res, next) => {
	const { username, password } = req.body;

	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: 'password less than 6 characters.' });
	}

	try {
		await User.create({
			username,
			password,
		}).then((user) => {
			res.status(200).json({
				message: 'User successfully created',
				user,
			});
		});
	} catch (err) {
		res.status(401).json({
			message: 'User creation not successful',
			error: error.message,
		});
	}
};
