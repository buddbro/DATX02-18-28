const sha256 = require('sha256');
const config = require('../config');
const mailTemplates = require('../mailtemplates');
const mailgun = require('mailgun-js')(config.MAILGUN);
const { getDate, generateToken } = require('../utilities');
const jwt = require('jsonwebtoken');

const getAllUsers = (req, res, next, db) => {
  db
    .any('SELECT * FROM users ORDER BY id')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getUser = (req, res, next, db) => {
  db
    .any(
      `SELECT id, email, name, created, lastlogin, age, height, weight, notifications FROM users WHERE id = $1`,
      [req.user.id]
    )
    .then(function(data) {
      const user = data[0];

      db
        .any(`SELECT id, title, date FROM workouts WHERE user_id = $1`, [
          req.user.id
        ])
        .then(function(data) {
          user.workouts = data;
          res.status(200).json(user);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const login = (req, res, next, db) => {
  db
    .any(
      'SELECT id, password, name, age, height, weight, notifications FROM users WHERE email = $1',
      [req.body.email]
    )
    .then(function(data) {
      if (!data.length) {
        res.json({ error: 'User not found' });
      }

      if (req.body.password === data[0].password) {
        const { id, name, age, height, weight, notifications } = data[0];
        db
          .any('UPDATE users SET lastLogin = $1 WHERE email = $2', [
            getDate(),
            req.body.email
          ])
          .then(function(data) {
            jwt.sign({ id }, config.AUTH_SECRET_KEY, (err, token) => {
              res.json({ name, token, age, height, weight, notifications });
            });
          });
      } else {
        res.status(200).json({ error: 'Wrong password' });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const verifyToken = (req, res, next, db) => {
  db
    .any(
      'SELECT id, email, name, age, height, weight, notifications FROM users WHERE id = $1',
      [req.user.id]
    )
    .then(function(data) {
      const { name, email, age, height, weight, notifications } = data[0];
      res.json({ name, email, age, height, weight, notifications });
    })
    .catch(function(err) {
      return next(err);
    });
};

const sendResetPasswordEmail = (req, res, next, db) => {
  const token = generateToken();

  db
    .any('SELECT id FROM users WHERE email = $1', [req.body.email])
    .then(function(data) {
      if (data.length) {
        const { id } = data[0];
        db
          .any('UPDATE users SET reset_token = $1 WHERE email = $2', [
            token,
            req.body.email
          ])
          .then(function(data) {
            mailgun.messages().send({
              from: 'PushApp <noreply@getpushapp.com>',
              to: req.body.email,
              subject: `Reset password for PushApp`,
              html: mailTemplates.forgotPassword(id, token)
            }, function(error, body) {
              if (error) {
                console.log(error);
              }
            });
            res.status(200).json({ success: true });
          });
      } else {
        res.status(200).json({ success: false });
      }
    });
};

const getUserByEmail = (req, res, next, db) => {
  db
    .any('SELECT * FROM users WHERE email = $1', [req.body.email])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const registerUser = (req, res, next, db, sendMail) => {
  {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(req.body.email)) {
      res
        .status(200)
        .json({ success: false, error: 'Invalid email, please try again' });
      return next();
    }

    db
      .any(
        'INSERT INTO users(email, password, name, created, lastlogin) VALUES($1, $2, $3, $4, $5) RETURNING id',
        [req.body.email, req.body.password, req.body.name, getDate(), getDate()]
      )
      .then(function(data) {
        jwt.sign({ id: data[0].id }, config.AUTH_SECRET_KEY, (err, token) => {
          sendMail(req.body.email, req.body.name);
          res.json({ token });
        });
      });
  }
};

const updateUser = (req, res, next, db) => {
  console.log(req.body);
  const {
    name,
    email,
    age,
    height,
    weight,
    notifications,
    password
  } = req.body;
  db
    .any(
      'UPDATE users SET name = $1, email = $2, age = $3, height = $4, weight = $5, notifications = $6 WHERE id = $7',
      [name, email, age, height, weight, notifications, req.user.id]
    )
    .then(() => {
      if (password) {
        db
          .any('UPDATE users SET password = $1 WHERE id = $2', [
            password,
            req.user.id
          ])
          .then(() => {
            res.sendStatus(200);
          })
          .catch(function(err) {
            return next(err);
          });
      } else {
        res.sendStatus(200);
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const resetPasswordPost = (req, res, next, db) => {
  const { passwordOne, passwordTwo } = req.body;

  if (passwordOne !== passwordTwo) {
    res.status(200).json({ success: false });
  }

  db
    .any(
      "UPDATE users SET password = $1, reset_token = '' WHERE id = $2 AND reset_token = $3",
      [passwordOne, req.params.id, req.params.token]
    )
    .then(function(data) {
      res.status(200).json({ success: true });
    })
    .catch(function(err) {
      return next(err);
    });
};

const resetPasswordGet = (req, res, next, db) => {
  db
    .any('SELECT * FROM users WHERE id = $1 AND reset_token = $2', [
      req.params.id,
      req.params.token
    ])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getUser,
  getAllUsers,
  login,
  verifyToken,
  resetPasswordPost,
  resetPasswordGet,
  updateUser,
  registerUser,
  getUserByEmail,
  sendResetPasswordEmail
};
