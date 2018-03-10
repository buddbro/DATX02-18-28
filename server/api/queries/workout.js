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
  db
    .any(
      'SELECT id, title, date, difficulty FROM workouts WHERE userId = $1 ORDER BY date DESC',
      [req.user.id]
    )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const setDifficulty = (req, res, next, db) => {
  db
    .any('UPDATE workouts SET difficulty = $1 WHERE id = $2', [
      req.body.level,
      req.params.id
    ])
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      return next(err);
    });
};

const saveNotes = (req, res, next, db) => {
  db
    .any('UPDATE workouts SET notes = $1 WHERE id = $2', [
      req.body.notes,
      req.params.id
    ])
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      return next(err);
    });
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
        exercise_types.id AS exercise_type_id,
        difficulty,
        notes
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
              date,
              difficulty,
              notes
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
    .any(
      "INSERT INTO workouts(title, date, userId, difficulty, notes) VALUES($1, $2, $3, 3, '') RETURNING id, title, date",
      [title, readableDate, req.user.id]
    )
    .then(function(data) {
      const { id, title, date } = data[0];
      if (req.body.schedule === 0) {
        res.json({ id, title, date });
      } else {
        db
          .any(
            'SELECT exercise_id FROM schedules_exercises WHERE schedule_id = $1',
            [req.body.schedule]
          )
          .then(function(data) {
            const exercises = data.reduce((acc, next) => {
              return [...acc, next.exercise_id, id];
            }, []);

            const workouts = data.reduce((acc, next) => {
              return [...acc, id];
            }, []);

            const values = workouts
              .reduce(
                (acc, next) => {
                  return { q: `${acc.q}, ($${acc.i++},$${acc.i++})`, i: acc.i };
                },
                { q: '', i: 1 }
              )
              .q.substring(2);

            db
              .any(
                `INSERT INTO exercises(exercise_type, workout) VALUES ${values}`,
                exercises
              )
              .then(function(data) {
                res.json({ id, title, date });
              });
          });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const deleteWorkout = (req, res, next, db) => {
  db
    .any('DELETE FROM workouts WHERE id = $1 AND userid = $2', [
      req.params.id,
      req.user.id
    ])
    .then(function() {
      res.status(200).json({ success: true });
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
  const { reps, weight } = req.body;
  const { id } = req.params;

  db
    .any(
      'INSERT INTO sets(exercise, reps, weight) VALUES($1, $2, $3) RETURNING id',
      [Number(id), Number(reps), Number(weight)]
    )
    .then(function(data) {
      res.status(200).json(data);
    });
};

module.exports = {
  getWorkouts,
  getWorkoutsForUser,
  getWorkoutWithId,
  setDifficulty,
  saveNotes,
  getSetsForExercise,
  addWorkout,
  deleteWorkout,
  editWorkout,
  addExerciseToWorkout,
  addSetToExercise
};
