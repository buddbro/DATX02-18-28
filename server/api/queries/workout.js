const { months, getDate } = require('../utilities');

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

const getWorkoutsForUser = (req, res, next, db) => {
  {
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
  }
};

const getWorkoutWithId = (req, res, next, db) => {
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

const getSetsForExercise = (req, res, next, db) => {
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

const addWorkout = (req, res, next, db) => {
  const date = new Date();
  const readableDate =
    date.toISOString().substring(0, 10) +
    ' ' +
    date.toString().substring(16, 24);
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

const deleteWorkout = (req, res, next, db) => {
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

const editWorkout = (req, res, next, db) => {
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

const addExerciseToWorkout = (req, res, next, db) => {
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

const addSetToExercise = (req, res, next, db) => {
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
  getWorkouts,
  getWorkoutsForUser,
  getWorkoutWithId,
  getSetsForExercise,
  addWorkout,
  deleteWorkout,
  editWorkout,
  addExerciseToWorkout,
  addSetToExercise
};
