const fetchSchedules = (req, res, next, db) => {
  db
    .any(
      `
        SELECT
            schedules.id AS schedule_id,
            schedules_exercises.id AS schedules_exercises_id,
            title,
            exercise_types.name AS exercise_name
          FROM schedules, schedules_exercises, exercise_types
          WHERE user_id = $1
            AND schedules.id = schedules_exercises.schedule_id
            AND schedules_exercises.exercise_id = exercise_types.id
          ORDER BY schedules.id
          `,
      [req.user.id]
    )
    .then(function(data) {
      db
        .any(
          `
              SELECT DISTINCT
                  schedules.id AS schedule_id,
                  title
                FROM schedules
                WHERE user_id = $1
                ORDER BY schedules.id
              `,
          [req.user.id]
        )
        .then(function(emptySchedules) {
          const { schedule_id, title, exercise_name } = data;
          const schedules = data.reduce((acc, next) => {
            if (acc[next.schedule_id]) {
              acc[next.schedule_id].exercises = [
                ...acc[next.schedule_id].exercises,
                { id: next.schedules_exercises_id, name: next.exercise_name }
              ];
              return acc;
            } else {
              acc[next.schedule_id] = {
                title: next.title,
                exercises: [
                  { id: next.schedules_exercises_id, name: next.exercise_name }
                ]
              };
              return acc;
            }
          }, {});

          emptySchedules.forEach(s => {
            if (!schedules[s.schedule_id]) {
              schedules[s.schedule_id] = { title: s.title, exercises: [] };
            }
          });

          res.json(schedules);
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const deleteExerciseFromSchedule = (req, res, next, db) => {
  const { exerciseId } = req.params;

  db
    .any(
      `
      DELETE FROM schedules_exercises WHERE id = $1
        `,
      [exerciseId]
    )
    .then(function(data) {
      res.status(200).json({ success: true });
    });
};

const addSchedule = (req, res, next, db) => {
  db
    .any(
      `
        SELECT COUNT(*) FROM schedules WHERE user_id = $1 AND title LIKE 'New Schedule%'
      `,
      [req.user.id]
    )
    .then(function(data) {
      const title = `New Schedule - ${Number(data[0].count) + 1}`;
      db
        .any(
          `
            INSERT INTO schedules(user_id, title) VALUES($1, $2) RETURNING id
          `,
          [req.user.id, title]
        )
        .then(function(data) {
          res.json({ id: data[0].id, title });
        });
    });
};

const deleteSchedule = (req, res, next, db) => {
  db
    .any(
      `
        DELETE FROM schedules WHERE id = $1 AND user_id = $2
      `,
      [req.params.id, req.user.id]
    )
    .then(function(data) {
      res.sendStatus(200);
    });
};

const editSchedule = (req, res, next, db) => {
  db
    .any(
      `
        UPDATE schedules SET title = $1 WHERE id = $2 AND user_id = $3
      `,
      [req.body.title, req.params.id, req.user.id]
    )
    .then(function(data) {
      res.sendStatus(200);
    });
};

const addExeciseToSchedule = (req, res, next, db) => {
  db
    .any(
      `
        INSERT INTO schedules_exercises(schedule_id, exercise_id) VALUES($1, $2);
      `,
      [req.body.schedule, req.body.exercise]
    )
    .then(function(data) {
      res.sendStatus(200);
    });
};

module.exports = {
  fetchSchedules,
  deleteExerciseFromSchedule,
  addSchedule,
  deleteSchedule,
  editSchedule,
  addExeciseToSchedule
};
