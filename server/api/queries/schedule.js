const fetchSchedules = (req, res, next, db) => {
  {
    db
      .any(
        `
        SELECT
            schedules.id AS schedule_id,
            schedele_exercises.id AS schedules_exercises_id,
            title,
            exercise_types.name AS exercise_name
          FROM schedules, schedules_exercises, exercise_types
          WHERE user_id = $1
            AND schedules.id = schedules_exercises.schedule_id
            AND schedules_exercises.exercise_id = exercise_types.id
          ORDER BY schedules.id DESC
          `,
        [req.params.id]
      )
      .then(function(data) {
        const { schedule_id, title, exercise_name } = data;
        const schedules = data.reduce((acc, next) => {
          if (acc[next.title]) {
            acc[next.title] = [
              ...acc[next.title],
              { id: next.schedules_exercises_id, name: next.exercise_name }
            ];
            return acc;
          } else {
            acc[next.title] = [
              { id: next.schedules_exercises_id, name: next.exercise_name }
            ];
            return acc;
          }
        }, {});

        res.status(200).json(schedules);
      })
      .catch(function(err) {
        return next(err);
      });
  }
};

module.exports = {
  fetchSchedules
};
