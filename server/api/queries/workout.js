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
      'SELECT id, title, date, difficulty, notes, start, stop, color FROM workouts WHERE user_id = $1 ORDER BY date DESC',
      [req.user.id]
    )
    .then(function(data) {
      data.map(d => {
        if (d.start) {
          const startTime = new Date(
            new Date(d.start).getTime() + 60 * 60 * 1000
          )
            .toString()
            .substring(16, 21);
          d.start = startTime;
        }
        if (d.stop) {
          const stopTime = new Date(new Date(d.stop).getTime() + 60 * 60 * 1000)
            .toString()
            .substring(16, 21);
          d.stop = stopTime;
        }
      });
      res.json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

const getCategoriesForWorkout = (req, res, next, db) => {
  db.any(`SELECT title FROM exercise_sections`).then(allSections => {
    db
      .any(
        `
          SELECT
            exercise_sections.title
          FROM workouts, exercises, exercise_types, exercise_sections
          WHERE workouts.id = $1
            AND workouts.id = exercises.workout
            AND exercises.exercise_type = exercise_types.id
            AND exercise_types.section = exercise_sections.id
          `,
        [req.params.id]
      )
      .then(function(data) {
        if (data.length) {
        }
        const sections = allSections.reduce((acc, next) => {
          acc[next.title] = 0;
          return acc;
        }, {});
        data.forEach(s => (sections[s.title] += 1));

        res.status(200).json(sections);
      })
      .catch(function(err) {
        return next(err);
      });
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

const setColor = (req, res, next, db) => {
  db
    .any('UPDATE workouts SET color = $1 WHERE id = $2', [
      req.body.color,
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
        notes,
        start,
        stop
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
              notes,
              start,
              stop
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

  const titleGenerator = () => {
    return new Promise((resolve, reject) => {
      if (req.body.schedule === 0) {
        resolve('Workout ' + date.getDate() + ' ' + months[date.getMonth()]);
      } else {
        db
          .any('SELECT title FROM schedules WHERE id = $1', [req.body.schedule])
          .then(data => {
            resolve(data[0].title);
          })
          .catch(error => reject(error));
      }
    });
  };

  titleGenerator().then(title => {
    db
      .any(
        "INSERT INTO workouts(title, date, user_id, difficulty, notes, start) VALUES($1, $2, $3, 3, '', NOW()) RETURNING id, title, date, difficulty, notes, start",
        [title, readableDate, req.user.id]
      )
      .then(function(data) {
        const { id, title, date, difficulty, notes, start } = data[0];
        if (req.body.schedule === 0) {
          res.json({ id, title, date, difficulty, notes, start });
        } else {
          db
            .any(
              'SELECT exercise_id FROM schedules_exercises WHERE schedule_id = $1',
              [req.body.schedule]
            )
            .then(data => {
              const exercises = data.reduce(
                (acc, next) => [...acc, next.exercise_id, id],
                []
              );

              if (exercises.length > 0) {
                const workouts = data.reduce((acc, next) => [...acc, id], []);

                const values = workouts
                  .reduce(
                    (acc, next) => {
                      return {
                        q: `${acc.q}, ($${acc.i++},$${acc.i++})`,
                        i: acc.i
                      };
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
                    res.json({ id, title, date, difficulty, notes, start });
                  });
              } else {
                res.json({ id, title, date, difficulty, notes, start });
              }
            });
        }
      })
      .catch(function(err) {
        return next(err);
      });
  });
};

const deleteWorkout = (req, res, next, db) => {
  db
    .any('DELETE FROM workouts WHERE id = $1 AND user_id = $2', [
      req.params.id,
      req.user.id
    ])
    .then(function() {
      res.status(200).json({ success: true });
    });
};

const deleteSet = (req, res, next, db) => {
  db
    .any(
      `SELECT sets.id AS set
      FROM sets, exercises, workouts
      WHERE sets.id = $1
        AND sets.exercise = exercises.id
        AND exercises.workout = workouts.id
        AND workouts.user_id = $2`,
      [req.params.id, req.user.id]
    )
    .then(data => {
      if (data.length === 1) {
        db.any('DELETE FROM sets WHERE id = $1', [req.params.id]).then(() => {
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(403);
      }
    });
};

const editWorkout = (req, res, next, db) => {
  db
    .any(
      'UPDATE workouts SET title = $1, start = $2::timestamptz, stop = $3::timestamptz WHERE id = $4',
      [req.body.title, req.body.start, req.body.stop, req.params.id]
    )
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

const deleteExerciseFromWorkout = (req, res, next, db) => {
  const { id } = req.params;
  db
    .any('DELETE FROM exercises WHERE id = $1', [id])
    .then(() => {
      res.sendStatus(200);
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
  addExerciseToWorkout,
  addSetToExercise,
  addWorkout,
  deleteExerciseFromWorkout,
  deleteSet,
  deleteWorkout,
  editWorkout,
  getCategoriesForWorkout,
  getSetsForExercise,
  getWorkouts,
  getWorkoutsForUser,
  getWorkoutWithId,
  saveNotes,
  setColor,
  setDifficulty
};
