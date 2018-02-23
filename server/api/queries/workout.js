const sha256 = require('sha256');
const MAILGUN = require('../config');
const mailTemplates = require('../mailtemplates');
const mailgun = require('mailgun-js')(MAILGUN);

const getDate = () => {
  const date = new Date();
  return (
    date.toISOString().substring(0, 10) +
    ' ' +
    date.toString().substring(16, 24)
  );
};

const getWorkouts = (req, res, next, db) => {
  db
    .any('SELECT * FROM workouts')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getWorkouts
};
