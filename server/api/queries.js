const promise = require('bluebird');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connection = {
	host: 'localhost',
	port: 5432,
	database: 'postgres',
	user: 'postgres',
	password: 'postgres'
}
const db = pgp(connection);

const getAll = (req, res, next) => {
	db.any('SELECT * FROM users')
		.then(function(data) {
			res.status(200)
			.json(data)
		})
		.catch(function(err) {
			return next(err);
		});
}

const getUserByEmail = (req, res, next) => {
	db.any('SELECT * FROM users WHERE email = $1', [req.body.email])
		.then(function(data) {
			console.log(data)
			res.status(200)
			.json(data)
		})
		.catch(function(err) {
			return next(err);
		});
}

const registerUser = (req, res, next) => {
	db.any('INSERT INTO users VALUES($1, $2, $3)', [req.body.email, req.body.password, req.body.name])
		.then(function(data) {
			res.status(200)
			.json(data)
		})
		.catch(function(err) {
			return next(err);
		});
}

const login = (req, res, next) => {
	db.any('SELECT password FROM users WHERE email = $1', [req.body.email])
		.then(function(data) {

			console.log(req.body.password);
			console.log(data[0].password);

			if (req.body.password === data[0].password) {
				const token = Math.round((new Date()).getMilliseconds() * Math.random() * 10000000000000).toString();
				db.any('UPDATE users SET token = $2 WHERE email = $1', [req.body.email, token])
					.then(function(data) {
						res.status(200)
						.json({ token: token, success: true})
					})
			} else {
				res.status(500)
				.json({ error: 'Wrong password' })
			}

		})
		.catch(function(err) {
			return next(err);
		});
}

module.exports = { getAll, registerUser, getUserByEmail, login };
