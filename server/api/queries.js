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

const getDate = () => {
  const date = new Date();
  return (
    date.toISOString().substring(0, 10) +
    ' ' +
    date.toString().substring(16, 24)
  );
};

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

const getWorkouts = (req, res, next) =>
  workouts.getWorkouts(req, res, next, db);

const getWorkoutsForUser = (req, res, next) => {
  db
    .any(
      'SELECT id, title, date FROM workouts WHERE userId = $1 ORDER BY date DESC',
      [req.body.id]
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getWorkoutWithId = (req, res, next) => {
  db
    .any(
      `
      SELECT
        workouts.id AS workout_id,
        workouts.title AS workout_title,
        date, exercises.id AS exercise_id,
        exercise_types.name AS exercise_title,
        exercise_types.id AS exercise_type_id
      FROM workouts, exercises, exercise_types
      WHERE workouts.id = $1
        AND workouts.id = exercises.workout
        AND exercises.exercise_type = exercise_types.id`,
      [req.params.id]
    )
    .then(function(data) {
      if (data.length) {
        res.status(200).json(data);
      } else {
        db
          .any(
            `
            SELECT
              workouts.id AS workout_id,
              workouts.title AS workout_title,
              date
            FROM workouts
            WHERE workouts.id = $1`,
            [req.params.id]
          )
          .then(function(data) {
            res.status(200).json(data);
          })
          .catch(function(err) {
            return next(err);
          });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const getSetsForExercise = (req, res, next) => {
  db
    .any(
      `
      SELECT
        sets.id, reps, weight
      FROM exercises, sets
      WHERE exercises.id = $1
        AND sets.exercise = exercises.id`,
      [req.params.id]
    )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const addWorkout = (req, res, next) => {
  const date = new Date();
  const readableDate =
    date.toISOString().substring(0, 10) +
    ' ' +
    date.toString().substring(16, 24);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const title = 'Workout ' + date.getDate() + ' ' + months[date.getMonth()];
  db
    .any('INSERT INTO workouts(title, date, userId) VALUES($1, $2, $3)', [
      title,
      readableDate,
      req.body.id
    ])
    .then(function() {
      db
        .any('SELECT id, title, date FROM workouts ORDER BY id DESC LIMIT 1')
        .then(function(data) {
          res.status(200).json(data);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const deleteWorkout = (req, res, next) => {
  db
    .any(
      'SELECT exercises.id AS id FROM workouts, users, exercises WHERE workouts.userId = $1 AND users.token = $2 AND workouts.id = $3 AND exercises.workout = $3',
      [req.body.id, req.body.token, req.params.id]
    )
    .then(function(data) {
      db
        .any('DELETE FROM workouts WHERE id = $1', [req.params.id])
        .then(function() {
          res.status(200).json({ success: true });
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const editWorkout = (req, res, next) => {
  db
    .any('UPDATE workouts SET title = $1 WHERE id = $2', [
      req.body.title,
      req.params.id
    ])
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

const addExerciseToWorkout = (req, res, next) => {
  const { workoutId, exerciseId } = req.body;
  db
    .any('INSERT INTO exercises(exercise_type, workout) VALUES($1, $2)', [
      exerciseId,
      workoutId
    ])
    .then(function() {
      db
        .any(
          `SELECT exercises.id AS id, exercise_types.name AS title
            FROM exercises, exercise_types
            WHERE exercise_types.id = exercises.exercise_type
            ORDER BY id DESC
            LIMIT 1
          `
        )
        .then(function(data) {
          res.status(200).json(data);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const addSetToExercise = (req, res, next) => {
  const { userId, token, reps, weight } = req.body;
  const { id } = req.params;

  db
    .any('INSERT INTO sets(exercise, reps, weight) VALUES($1, $2, $3)', [
      Number(id),
      Number(reps),
      Number(weight)
    ])
    .then(function(data) {
      db
        .any(
          `SELECT id
            FROM sets
            ORDER BY id DESC
            LIMIT 1
          `
        )
        .then(function(data) {
          res.status(200).json(data);
        });
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
