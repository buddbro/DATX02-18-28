const sha256 = require('sha256');

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
};
const db = pgp(connection);

const getAll = (req, res, next) => {
  db
    .any('SELECT * FROM users')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getUserByEmail = (req, res, next) => {
  db
    .any('SELECT * FROM users WHERE email = $1', [req.body.email])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const registerUser = (req, res, next) => {
  db
    .any('INSERT INTO users(email, password, name) VALUES($1, $2, $3)', [
      req.body.email,
      req.body.password,
      req.body.name
    ])
    .then(function(data) {
      const token = sha256(
        Math.round(
          new Date().getMilliseconds() * Math.random() * 10000000000000
        ).toString()
      );
      db
        .any('UPDATE users SET token = $2 WHERE email = $1', [
          req.body.email,
          token
        ])
        .then(function(data) {
          res.status(200).json({ token: token, success: true });
          return next();
        });
    })
    .catch(function(err) {
      return next(err);
    });
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
          .any('UPDATE users SET token = $2 WHERE email = $1', [
            req.body.email,
            token
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
const loginWithToken = (req, res, next) => {
  db
    .any(
      'SELECT id, password, name FROM users WHERE email = $1 AND token = $2',
      [req.body.email, req.body.token]
    )
    .then(function(data) {
      if (!data.length) {
        res.status(200).json({ error: 'User not found' });
        return next();
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

const logout = (req, res, next) => {
  console.log(req.body);
  db
    .any('UPDATE users SET token = 0 WHERE id = $1', [req.body.id])
    .then(function(data) {
      res.status(200).json({ success: true });
    });
};

const getWorkouts = (req, res, next) => {
  db
    .any('SELECT * FROM workouts')
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

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
        exercise_types.name AS exercise_title
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
          console.log(data);
          res.status(200).json(data);
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
      console.log(data);
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const resetQuery = `
  DROP TABLE IF EXISTS exercises CASCADE;
  DROP TABLE IF EXISTS workouts CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS exercise_sections CASCADE;
  DROP TABLE IF EXISTS exercise_types CASCADE;
  DROP TABLE IF EXISTS sets CASCADE;

  CREATE TABLE users(id serial primary key, email varchar(100) unique, password varchar(100), name varchar(100), token varchar(100));
  CREATE TABLE workouts(id serial primary key, title varchar(60), date varchar(60), userId int references users(id));
  CREATE TABLE exercise_sections(id serial primary key, title varchar(60));
  CREATE TABLE exercise_types(id serial primary key, section int references exercise_sections(id), name varchar(60));
  CREATE TABLE exercises(id serial primary key, exercise_type int references exercise_types(id), workout int references workouts(id));
  CREATE TABLE sets(id serial primary key, exercise int references exercises(id), reps int, weight int);

  INSERT INTO users(email, password, name) VALUES('test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test User');
  INSERT INTO users(email, password, name) VALUES('fest', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Fest User');

  INSERT INTO workouts(title, date, userId) VALUES('Upper body', '2018-02-03 11:05:04', 1);
  INSERT INTO workouts(title, date, userId) VALUES('Leg day', '2018-02-04 13:19:32', 1);

  INSERT INTO workouts(title, date, userId) VALUES('Cardio', '2018-02-03 09:53:42', 2);
  INSERT INTO workouts(title, date, userId) VALUES('Push', '2018-02-03 12:35:41', 2);
  INSERT INTO workouts(title, date, userId) VALUES('Pull', '2018-02-03 08:14:54', 2);
  INSERT INTO workouts(title, date, userId) VALUES('Legs', '2018-02-03 10:27:22', 2);

  INSERT INTO exercise_sections(id, title) VALUES(1, 'Arms');
  INSERT INTO exercise_sections(id, title) VALUES(2, 'Chest');
  INSERT INTO exercise_sections(id, title) VALUES(3, 'Shoulders');
  INSERT INTO exercise_sections(id, title) VALUES(4, 'Legs');
  INSERT INTO exercise_sections(id, title) VALUES(5, 'Back');

  INSERT INTO exercise_types(id, section, name) VALUES(1, 1, 'Biceps Curl');
  INSERT INTO exercise_types(id, section, name) VALUES(2, 1, 'Skullcrusher');
  INSERT INTO exercise_types(id, section, name) VALUES(3, 1, 'Triceps extension');
  INSERT INTO exercise_types(id, section, name) VALUES(4, 2, 'Benchpress');
  INSERT INTO exercise_types(id, section, name) VALUES(5, 2, 'Inclined benchpress');
  INSERT INTO exercise_types(id, section, name) VALUES(6, 2, 'Cable flyes');
  INSERT INTO exercise_types(id, section, name) VALUES(7, 3, 'Military press');
  INSERT INTO exercise_types(id, section, name) VALUES(8, 3, 'Traps lift');
  INSERT INTO exercise_types(id, section, name) VALUES(9, 3, 'Arm raise');
  INSERT INTO exercise_types(id, section, name) VALUES(10, 4, 'Squat');
  INSERT INTO exercise_types(id, section, name) VALUES(11, 4, 'Leg extension');
  INSERT INTO exercise_types(id, section, name) VALUES(12, 4, 'Lunges');
  INSERT INTO exercise_types(id, section, name) VALUES(13, 5, 'Chins');
  INSERT INTO exercise_types(id, section, name) VALUES(14, 5, 'Pullups');
  INSERT INTO exercise_types(id, section, name) VALUES(15, 5, 'Deadlift');

  INSERT INTO exercises(exercise_type, workout) VALUES(1, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(2, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(3, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(4, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(5, 1);
  INSERT INTO exercises(exercise_type, workout) VALUES(6, 2);
  INSERT INTO exercises(exercise_type, workout) VALUES(7, 2);
  INSERT INTO exercises(exercise_type, workout) VALUES(8, 2);
  INSERT INTO exercises(exercise_type, workout) VALUES(9, 2);

  INSERT INTO exercises(exercise_type, workout) VALUES(10, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(11, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(12, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(13, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(14, 3);
  INSERT INTO exercises(exercise_type, workout) VALUES(15, 4);
  INSERT INTO exercises(exercise_type, workout) VALUES(1, 4);
  INSERT INTO exercises(exercise_type, workout) VALUES(2, 4);
  INSERT INTO exercises(exercise_type, workout) VALUES(3, 4);

  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(1, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 40);
  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 40);
  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 35);
  INSERT INTO sets(exercise, reps, weight) VALUES(2, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(3, 12, 60);
  INSERT INTO sets(exercise, reps, weight) VALUES(3, 12, 55);
  INSERT INTO sets(exercise, reps, weight) VALUES(3, 12, 55);

  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(4, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(5, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(6, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(7, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(8, 5, 30);

  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
  INSERT INTO sets(exercise, reps, weight) VALUES(9, 5, 30);
`;

const reset = (req, res, next) => {
  db
    .any(resetQuery)
    .then(function(data) {
      console.log(data);
      res.status(200).json({ success: true });
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
      'SELECT exercise_types.id AS id, name, title AS exercise_type FROM exercise_types, exercise_sections WHERE exercise_types.section = exercise_sections.id ORDER BY section'
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
  console.log('Received', workoutId, exerciseId);

  res.status(200);

  // db
  //   .any(
  //     ''
  //   )
  //   .then(function(data) {
  //     res.status(200).json(data);
  //   })
  //   .catch(function(err) {
  //     return next(err);
  //   });
};

module.exports = {
  getAll,
  registerUser,
  getUserByEmail,
  login,
  loginWithToken,
  logout,
  getWorkouts,
  getWorkoutWithId,
  addWorkout,
  editWorkout,
  reset,
  postFeedback,
  getFeedback,
  getWorkoutsForUser,
  fetchExerciseList,
  addExerciseToWorkout
};
