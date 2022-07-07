const User = require('../model/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
	const { username, password } = req.body;

	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: 'password less than 6 characters.' });
	}

	try {
		bcrypt.hash(password, process.env.SALT).then(async (hash) => {
			await User.create({
				username,
				password: hash,
			}).then((user) => {
				res.status(200).json({
					message: 'User successfully created.',
					user,
				});
			});
		});
	} catch (err) {
		res.status(401).json({
			message: 'User creation not successful.',
			error: error.message,
		});
	}
};

exports.login = async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			message: 'Username or Password is empty.',
		});
	}

	try {
		const user = await User.findOne({ username });
		if (!user) {
			res.status(401).json({
				message: 'Login unsuccessful.',
			});
		} else {
			bcrypt.compare(password, user.password).then((result) => {
				if (result) {
					res.status(200).json({
						message: 'Login successful',
						user,
					});
				} else {
					res.status(400).json({
						message: 'Invalid login',
					});
				}
			});
		}
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
};

exports.update = async (req, res, next) => {
	const { role, id } = req.body;

	if (role && id) {
		if (role === 'admin') {
			await User.findById(id)
				.then((user) => {
					if (user.role !== 'admin') {
						user.role = role;
						user.save((err) => {
							if (err) {
								res.status(400).json({
									message: err,
								});
								process.exit(1);
							}

							res.status(201).json({
								message: 'Update successful.',
								user,
							});
						});
					} else {
						res.status(400).json({
							message: 'User already an admin.',
						});
					}
				})
				.catch((err) => {
					res.status(400).json({
						message: err,
					});
				});
		} else {
			res.status(400).json({
				message: 'Role is not admin.',
			});
		}
	} else {
		res.status(400).json({
			message: 'Role or id is missing.',
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	const { id } = req.body;
	await User.findById(id)
		.then((user) => {
			user.remove();
			res.status(201).json({
				message: 'User deleted',
				user,
			});
		})
		.catch((err) =>
			res.status(400).json({
				message: err,
			}),
		);
};
