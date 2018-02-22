const sha256 = require('sha256');

const getDate = () => {
  const date = new Date();
  return (
    date.toISOString().substring(0, 10) +
    ' ' +
    date.toString().substring(16, 24)
  );
};

const login = (req, res, next) => {
  db
    .any('SELECT id, password, name FROM users WHERE email = $1', [
      req.body.email
    ])
    .then(function(data) {
      if (!data.length) {
        res.status(200).json({ error: 'User not found' });
        return next();
      }

      if (req.body.password === data[0].password) {
        const token = sha256(
          Math.round(
            new Date().getMilliseconds() * Math.random() * 10000000000000
          ).toString()
        );
        const { id, name } = data[0];
        db
          .any('UPDATE users SET token = $2, lastLogin = $3 WHERE email = $1', [
            req.body.email,
            token,
            getDate()
          ])
          .then(function(data) {
            res.status(200).json({ id, name, token, success: true });
          });
      } else {
        res.status(200).json({ error: 'Wrong password' });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const loginWithToken = (req, res, next, db) => {
  db
    .any(
      'SELECT id, password, name FROM users WHERE email = $1 AND token = $2',
      [req.body.email, req.body.token]
    )
    .then(function(data) {
      if (!data.length) {
        res.status(200).json({ error: 'User not found' });
      } else {
        const { id, name } = data[0];
        res
          .status(200)
          .json({ id, name, token: req.body.token, success: true });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const logout = (req, res, next, db) => {
  db
    .any("UPDATE users SET token = '' WHERE id = $1", [req.body.id])
    .then(function(data) {
      res.status(200).json({ success: true });
    });
};

module.exports = { login, loginWithToken, logout };
