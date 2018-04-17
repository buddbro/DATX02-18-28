const sha256 = require('sha256');
const promise = require('bluebird');

const config = require('./config');
const mailTemplates = require('./mailtemplates');
const mailgun = require('mailgun-js')(config.MAILGUN);

const user = require('./queries/user');
const workout = require('./queries/workout');
const schedule = require('./queries/schedule');
const feedback = require('./queries/feedback');
const exercise = require('./queries/exercise');
const achievement = require('./queries/achievement');
const quotes = require('./queries/quotes');

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
  database: 'pushapp_v2',
  user: 'postgres',
  password: 'postgres'
};
const db = pgp(connection);

const resetPasswordGet = (req, res, next) =>
  user.resetPasswordGet(req, res, next, db);
const resetPasswordPost = (req, res, next) =>
  user.resetPasswordPost(req, res, next, db);
const getAllUsers = (req, res, next) => user.getAllUsers(req, res, next, db);
const getUser = (req, res, next) => user.getUser(req, res, next, db);
const getUserByEmail = (req, res, next) =>
  user.getUserByEmail(req, res, next, db);
const updateUser = (req, res, next) => user.updateUser(req, res, next, db);
const registerUser = (req, res, next) =>
  user.registerUser(req, res, next, db, sendMail);
const login = (req, res, next) => user.login(req, res, next, db);
const verifyToken = (req, res, next) => user.verifyToken(req, res, next, db);
const logout = (req, res, next) => user.logout(req, res, next, db);
const sendResetPasswordEmail = (req, res, next) =>
  user.sendResetPasswordEmail(req, res, next, db);
const readInstruction = (req, res, next) =>
  user.readInstruction(req, res, next, db);

const getWorkouts = (req, res, next) => workout.getWorkouts(req, res, next, db);
const getWorkoutsForUser = (req, res, next) =>
  workout.getWorkoutsForUser(req, res, next, db);
const getCategoriesForWorkout = (req, res, next) =>
  workout.getCategoriesForWorkout(req, res, next, db);
const getWorkoutWithId = (req, res, next) =>
  workout.getWorkoutWithId(req, res, next, db);
const getSetsForExercise = (req, res, next) =>
  workout.getSetsForExercise(req, res, next, db);
const addWorkout = (req, res, next) => workout.addWorkout(req, res, next, db);
const deleteSet = (req, res, next) => workout.deleteSet(req, res, next, db);
const deleteWorkout = (req, res, next) =>
  workout.deleteWorkout(req, res, next, db);
const editWorkout = (req, res, next) => workout.editWorkout(req, res, next, db);
const setDifficulty = (req, res, next) =>
  workout.setDifficulty(req, res, next, db);
const saveNotes = (req, res, next) => workout.saveNotes(req, res, next, db);
const setColor = (req, res, next) => workout.setColor(req, res, next, db);
const addExerciseToWorkout = (req, res, next) =>
  workout.addExerciseToWorkout(req, res, next, db);
const deleteExerciseFromWorkout = (req, res, next) =>
  workout.deleteExerciseFromWorkout(req, res, next, db);
const addSetToExercise = (req, res, next) =>
  workout.addSetToExercise(req, res, next, db);

const fetchSchedules = (req, res, next) =>
  schedule.fetchSchedules(req, res, next, db);
const deleteExerciseFromSchedule = (req, res, next) =>
  schedule.deleteExerciseFromSchedule(req, res, next, db);
const addSchedule = (req, res, next) =>
  schedule.addSchedule(req, res, next, db);
const deleteSchedule = (req, res, next) =>
  schedule.deleteSchedule(req, res, next, db);
const editSchedule = (req, res, next) =>
  schedule.editSchedule(req, res, next, db);
const addExeciseToSchedule = (req, res, next) =>
  schedule.addExeciseToSchedule(req, res, next, db);

const getFeedback = (req, res, next) =>
  feedback.getFeedback(req, res, next, db);
const postFeedback = (req, res, next) =>
  feedback.postFeedback(req, res, next, db);

const fetchExerciseList = (req, res, next) =>
  exercise.fetchExerciseList(req, res, next, db);
const fetchExerciseTypes = (req, res, next) =>
  exercise.fetchExerciseTypes(req, res, next, db);
const fetchExerciseDescription = (req, res, next) =>
  exercise.fetchExerciseDescription(req, res, next, db);
const addExerciseType = (req, res, next) =>
  exercise.addExerciseType(req, res, next, db);
const countExercises = (req, res, next) =>
  exercise.countExercises(req, res, next, db);
const editExercise = (req, res, next) =>
  exercise.editExercise(req, res, next, db);
const deleteExerciseType = (req, res, next) =>
  exercise.deleteExerciseType(req, res, next, db);

const getAllAchievements = (req, res, next) =>
  achievement.getAllAchievements(req, res, next, db);
const getAchievementsForUser = (req, res, next) =>
  achievement.getAchievementsForUser(req, res, next, db);
const calculateAchievements = (req, res, next) =>
  achievement.calculateAchievements(req, res, next, db);

const getRandomQuote = (req, res, next) =>
  quotes.getRandomQuote(req, res, next, db);

module.exports = {
  addExeciseToSchedule,
  addExerciseToWorkout,
  addExerciseType,
  addSchedule,
  addSetToExercise,
  addWorkout,
  calculateAchievements,
  countExercises,
  deleteExerciseFromSchedule,
  deleteExerciseFromWorkout,
  deleteExerciseType,
  deleteSchedule,
  deleteWorkout,
  deleteSet,
  editExercise,
  editSchedule,
  editWorkout,
  fetchExerciseDescription,
  fetchExerciseList,
  fetchExerciseTypes,
  fetchSchedules,
  getAchievementsForUser,
  getAllAchievements,
  getAllUsers,
  getCategoriesForWorkout,
  getFeedback,
  getRandomQuote,
  getSetsForExercise,
  getUser,
  getUserByEmail,
  getWorkouts,
  getWorkoutsForUser,
  getWorkoutWithId,
  login,
  postFeedback,
  readInstruction,
  registerUser,
  resetPasswordGet,
  resetPasswordPost,
  saveNotes,
  sendResetPasswordEmail,
  setColor,
  setDifficulty,
  updateUser,
  verifyToken
};
