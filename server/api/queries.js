const sha256 = require('sha256');
const promise = require('bluebird');

const MAILGUN = require('./config');
const mailTemplates = require('./mailtemplates');
const mailgun = require('mailgun-js')(MAILGUN);

const user = require('./queries/user');
const workout = require('./queries/workout');
const schedule = require('./queries/schedule');
const feedback = require('./queries/feedback');
const exercise = require('./queries/exercise');

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
const login = (req, res, next) => user.login(req, res, next, db);
const loginWithToken = (req, res, next) =>
  user.loginWithToken(req, res, next, db);
const logout = (req, res, next) => user.logout(req, res, next, db);
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

const fetchSchedules = (req, res, next) =>
  schedule.fetchSchedules(req, res, next, db);
const deleteExerciseFromSchedule = (req, res, next) =>
  exercise.deleteExerciseFromSchedule(req, res, next, db);

const getFeedback = (req, res, next) =>
  feedback.getFeedback(req, res, next, db);
const postFeedback = (req, res, next) =>
  feedback.postFeedback(req, res, next, db);

const fetchExerciseList = (req, res, next) =>
  exercise.fetchExerciseList(req, res, next, db);
const fetchExerciseDescription = (req, res, next) =>
  exercise.fetchExerciseDescription(req, res, next, db);

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
  updateUser,
  fetchSchedules,
  deleteExerciseFromSchedule
};
