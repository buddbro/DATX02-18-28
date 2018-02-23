const sha256 = require('sha256');
const promise = require('bluebird');

const MAILGUN = require('./config');
const mailTemplates = require('./mailtemplates');
const mailgun = require('mailgun-js')(MAILGUN);

const user = require('./queries/user');
const workout = require('./queries/workout');

const sendMail = (email, name) => {
  const data = {
    from: 'PushApp <noreply@getpushapp.com>',
    to: email,
    subject: `Welcome to PushApp, ${name}`,
    html: mailTemplates.welcome()
  };

  mailgun.messages().send(data, function(error, body) {
    if (error) {
      console.log(error);
    }
  });
};

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'pushapp_v1',
  user: 'postgres',
  password: 'postgres'
};
const db = pgp(connection);

const resetPasswordGet = (req, res, next) =>
  user.resetPasswordGet(req, res, next, db);
const resetPasswordPost = (req, res, next) =>
  user.resetPasswordPost(req, res, next, db);
const getAllUsers = (req, res, next) => user.getAllUsers(req, res, next, db);
const getUserByEmail = (req, res, next) =>
  user.getUserByEmail(req, res, next, db);
const updateUser = (req, res, next) => user.updateUser(req, res, next, db);
const registerUser = (req, res, next) => user.registerUser(req, res, next, db);
const login = (req, res, next) => userQueries.login(req, res, next, db);
const loginWithToken = (req, res, next) =>
  user.loginWithToken(req, res, next, db);
const logout = (req, res, next) => userQueries.logout(req, res, next, db);
const sendResetPasswordEmail = (req, res, next) =>
  user.sendResetPasswordEmail(req, res, next, db);

const getWorkouts = (req, res, next) => workout.getWorkouts(req, res, next, db);
const getWorkoutsForUser = (req, res, next) =>
  workout.getWorkoutsForUser(req, res, next, db);
const getWorkoutWithId = (req, res, next) =>
  workout.getWorkoutWithId(req, res, next, db);
const getSetsForExercise = (req, res, next) =>
  workout.getSetsForExercise(req, res, next, db);
const addWorkout = (req, res, next) => workout.addWorkout(req, res, next, db);
const deleteWorkout = (req, res, next) =>
  workout.deleteWorkout(req, res, next, db);
const editWorkout = (req, res, next) => workout.editWorkout(req, res, next, db);
const addExerciseToWorkout = (req, res, next) =>
  workout.addExerciseToWorkout(req, res, next, db);
const addSetToExercise = (req, res, next) =>
  workout.addSetToExercise(req, res, next, db);

const fetchExerciseList = (req, res, next) => {
  db
    .any(
      `SELECT exercise_types.id AS id, name, title AS exercise_type
          FROM exercise_types, exercise_sections
          WHERE exercise_types.section = exercise_sections.id
          ORDER BY section
        `
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getFeedback = (req, res, next) => {
  db
    .any('SELECT * FROM feedback')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const postFeedback = (req, res, next) => {
  db
    .any('INSERT INTO feedback(name, feedback) VALUES($1, $2)', [
      req.body.name,
      req.body.feedback
    ])
    .then(function() {
      res.status(200).json({ success: true });
    })
    .catch(function(err) {
      return next(err);
    });
};

const fetchExerciseDescription = (req, res, next) => {
  db
    .any(
      `SELECT name, description
          FROM exercise_types
          WHERE id = $1
        `,
      [req.params.id]
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserByEmail,
  login,
  loginWithToken,
  logout,
  sendResetPasswordEmail,
  resetPasswordGet,
  resetPasswordPost,
  getWorkouts,
  getWorkoutWithId,
  addWorkout,
  deleteWorkout,
  editWorkout,
  postFeedback,
  getFeedback,
  getWorkoutsForUser,
  fetchExerciseList,
  fetchExerciseDescription,
  addExerciseToWorkout,
  addSetToExercise,
  getSetsForExercise,
  updateUser
};
